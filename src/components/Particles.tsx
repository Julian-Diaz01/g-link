'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticlesProps {
  object: THREE.Object3D
  color?: string
  size?: number
  sampleRate?: number
  animated?: boolean
  interactive?: boolean
  disperseRadius?: number
  disperseStrength?: number
  returnSpeed?: number
  use3DGradient?: boolean
  gradientColors?: Array<{
    color: string
    position: [number, number, number]
  }> | null
  gradientBlendPower?: number
}

export function Particles({
  object,
  color = '#00ffff',
  size = 0.02,
  animated = false,
  sampleRate = 1,
  interactive = false,
  disperseRadius = 2.0,
  disperseStrength = 1.5,
  returnSpeed = 3.0,
  use3DGradient = false,
  gradientColors = null,
  gradientBlendPower = 2.0,
}: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null)
  const { camera, gl } = useThree()
  const mouseRef = useRef(new THREE.Vector2(9999, 9999))
  const mouse3DRef = useRef(new THREE.Vector3(9999, 9999, 9999))
  const velocitiesRef = useRef<Float32Array | null>(null)
  const skinnedMeshesRef = useRef<
    Array<{ mesh: THREE.SkinnedMesh; indices: number[] }>
  >([])

  // Track mouse for interaction
  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (event: MouseEvent) => {
      // Get the canvas element's position and size
      const canvas = gl.domElement
      const rect = canvas.getBoundingClientRect()

      // Calculate mouse position relative to the canvas
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Convert to normalized device coordinates (-1 to +1)
      mouseRef.current.x = (x / rect.width) * 2 - 1
      mouseRef.current.y = -(y / rect.height) * 2 + 1

      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouseRef.current, camera)

      const distance = 7
      const direction = raycaster.ray.direction.clone().multiplyScalar(distance)
      mouse3DRef.current.copy(camera.position).add(direction)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [interactive, camera, gl])

  // Extract vertices from object
  useEffect(() => {
    if (!object) return

    const positions: number[] = []
    const originalPositions: number[] = []
    const skinnedMeshData: Array<{
      mesh: THREE.SkinnedMesh
      indices: number[]
    }> = []
    let particleIndex = 0

    object.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        const positionAttribute = child.geometry.attributes.position

        if (positionAttribute) {
          const posArray = positionAttribute.array
          const meshIndices: number[] = []

          for (let i = 0; i < posArray.length; i += 3 * sampleRate) {
            positions.push(posArray[i], posArray[i + 1], posArray[i + 2])
            originalPositions.push(
              posArray[i],
              posArray[i + 1],
              posArray[i + 2],
            )

            if (child instanceof THREE.SkinnedMesh) {
              meshIndices.push(particleIndex)
            }
            particleIndex++
          }

          if (child instanceof THREE.SkinnedMesh && meshIndices.length > 0) {
            skinnedMeshData.push({ mesh: child, indices: meshIndices })
          }
        }
      }
    })

    skinnedMeshesRef.current = skinnedMeshData

    // Calculate bounds for gradient
    let minX = Infinity,
      minY = Infinity,
      minZ = Infinity
    let maxX = -Infinity,
      maxY = -Infinity,
      maxZ = -Infinity

    for (let i = 0; i < originalPositions.length; i += 3) {
      minX = Math.min(minX, originalPositions[i])
      maxX = Math.max(maxX, originalPositions[i])
      minY = Math.min(minY, originalPositions[i + 1])
      maxY = Math.max(maxY, originalPositions[i + 1])
      minZ = Math.min(minZ, originalPositions[i + 2])
      maxZ = Math.max(maxZ, originalPositions[i + 2])
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    )
    particleGeometry.setAttribute(
      'originalPosition',
      new THREE.Float32BufferAttribute(originalPositions, 3),
    )
    particleGeometry.userData.bounds = {
      min: new THREE.Vector3(minX, minY, minZ),
      max: new THREE.Vector3(maxX, maxY, maxZ),
    }

    const displacements = new Float32Array(positions.length)
    particleGeometry.setAttribute(
      'currentDisplacement',
      new THREE.BufferAttribute(displacements, 3),
    )

    velocitiesRef.current = new Float32Array(positions.length)
    setGeometry(particleGeometry)

    return () => {
      particleGeometry.dispose()
      velocitiesRef.current = null
    }
  }, [object, sampleRate])

  // Create shader material
  const particleMaterial = useMemo(() => {
    const bounds = geometry?.userData.bounds || {
      min: new THREE.Vector3(-1, -1, -1),
      max: new THREE.Vector3(1, 1, 1),
    }

    const useMultiColor =
      gradientColors !== null && gradientColors && gradientColors.length > 0
    const maxColors = 8
    const colorArray: number[] = []
    const positionArray: number[] = []
    let colorCount = 0

    if (useMultiColor && gradientColors) {
      colorCount = Math.min(gradientColors.length, maxColors)
      for (let i = 0; i < colorCount; i++) {
        const col = new THREE.Color(gradientColors[i].color)
        colorArray.push(col.r, col.g, col.b)
        positionArray.push(...gradientColors[i].position)
      }
      while (colorArray.length < maxColors * 3) colorArray.push(1, 1, 1)
      while (positionArray.length < maxColors * 3) positionArray.push(0, 0, 0)
    } else {
      for (let i = 0; i < maxColors * 3; i++) {
        colorArray.push(1)
        positionArray.push(0)
      }
    }

    return new THREE.ShaderMaterial({
      vertexShader: `
        uniform float time;
        uniform float size;
        uniform bool animated;
        uniform bool interactive;
        uniform vec3 mousePos;
        uniform float disperseRadius;
        uniform float disperseStrength;
        
        attribute vec3 originalPosition;
        attribute vec3 currentDisplacement;
        varying vec3 vOriginalPosition;
        varying float vDistanceFromMouse;
        
        float easeOutCubic(float t) {
          float f = t - 1.0;
          return f * f * f + 1.0;
        }
        
        void main() {
          vOriginalPosition = originalPosition;
          vec3 pos = originalPosition + currentDisplacement;
          float distanceInfluence = 0.0;
          
          if (interactive) {
            vec4 worldPos = modelMatrix * vec4(originalPosition, 1.0);
            float dist = distance(worldPos.xyz, mousePos);
            vDistanceFromMouse = dist;
            
            if (dist < disperseRadius) {
              float influence = 1.0 - (dist / disperseRadius);
              distanceInfluence = easeOutCubic(influence);
            }
          }
          
          float pulse = animated 
            ? sin(time * 2.0 + originalPosition.x * 10.0 + originalPosition.y * 10.0) * 0.5 + 1.0
            : 1.0;
          
          float sizeMultiplier = 1.0 + distanceInfluence * 0.5;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * pulse * sizeMultiplier * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        #define MAX_GRADIENT_COLORS 8
        
        uniform vec3 color;
        uniform bool use3DGradient;
        uniform vec3 boundsMin;
        uniform vec3 boundsMax;
        uniform bool useMultiColorGradient;
        uniform int gradientColorCount;
        uniform vec3 gradientColorArray[MAX_GRADIENT_COLORS];
        uniform vec3 gradientPositionArray[MAX_GRADIENT_COLORS];
        uniform float gradientBlendPower;
        
        varying vec3 vOriginalPosition;
        varying float vDistanceFromMouse;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          float intensity = 1.0 - (dist * 2.0);
          intensity = pow(intensity, 2.0);
          
          vec3 finalColor = color;
          
          if (use3DGradient && useMultiColorGradient && gradientColorCount > 0) {
            vec3 normalizedPos = (vOriginalPosition - boundsMin) / (boundsMax - boundsMin);
            normalizedPos = clamp(normalizedPos, 0.0, 1.0);
            
            vec3 accumulatedColor = vec3(0.0);
            float totalWeight = 0.0;
            
            for (int i = 0; i < MAX_GRADIENT_COLORS; i++) {
              if (i >= gradientColorCount) break;
              
              vec3 colorPos = gradientPositionArray[i];
              float dist = length(normalizedPos - colorPos);
              float weight = 1.0 / (pow(dist + 0.1, gradientBlendPower));
              
              accumulatedColor += gradientColorArray[i] * weight;
              totalWeight += weight;
            }
            
            if (totalWeight > 0.0) {
              finalColor = accumulatedColor / totalWeight;
            }
          }
          
          finalColor *= intensity;
          gl_FragColor = vec4(finalColor, intensity);
        }
      `,
      uniforms: {
        time: { value: 0 },
        size: { value: size },
        color: { value: new THREE.Color(color) },
        animated: { value: animated },
        interactive: { value: interactive },
        mousePos: { value: new THREE.Vector3(9999, 9999, 9999) },
        disperseRadius: { value: disperseRadius },
        disperseStrength: { value: disperseStrength },
        use3DGradient: { value: use3DGradient },
        boundsMin: { value: bounds.min },
        boundsMax: { value: bounds.max },
        useMultiColorGradient: { value: useMultiColor },
        gradientColorCount: { value: colorCount },
        gradientColorArray: { value: colorArray },
        gradientPositionArray: { value: positionArray },
        gradientBlendPower: { value: gradientBlendPower },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  }, [
    color,
    size,
    animated,
    interactive,
    disperseRadius,
    disperseStrength,
    use3DGradient,
    gradientColors,
    gradientBlendPower,
    geometry,
  ])

  // Animation loop
  useFrame((state, delta) => {
    if (animated && particleMaterial.uniforms.time) {
      particleMaterial.uniforms.time.value += delta
    }

    if (interactive && particleMaterial.uniforms.mousePos) {
      particleMaterial.uniforms.mousePos.value.copy(mouse3DRef.current)
    }

    // Update particle positions from skinned mesh animation
    if (geometry && skinnedMeshesRef.current.length > 0 && pointsRef.current) {
      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute
      const originalPosAttr = geometry.getAttribute(
        'originalPosition',
      ) as THREE.BufferAttribute

      if (posAttr && originalPosAttr) {
        const vertex = new THREE.Vector3()
        const temp = new THREE.Vector3()
        const skinned = new THREE.Vector3()
        const inverseMatrix = new THREE.Matrix4()
        inverseMatrix.copy(pointsRef.current.matrixWorld).invert()

        for (const { mesh, indices } of skinnedMeshesRef.current) {
          const meshPosAttr = mesh.geometry.attributes.position
          const skinIndexAttr = mesh.geometry.attributes.skinIndex
          const skinWeightAttr = mesh.geometry.attributes.skinWeight

          if (mesh.skeleton) {
            mesh.skeleton.update()
          }

          for (let i = 0; i < indices.length; i++) {
            const particleIdx = indices[i]
            const vertexIdx = i * sampleRate

            if (vertexIdx * 3 + 2 < meshPosAttr.array.length) {
              vertex.fromBufferAttribute(meshPosAttr, vertexIdx)

              if (skinIndexAttr && skinWeightAttr && mesh.skeleton) {
                skinned.set(0, 0, 0)

                const boneIndices = [
                  Math.floor(skinIndexAttr.getX(vertexIdx)),
                  Math.floor(skinIndexAttr.getY(vertexIdx)),
                  Math.floor(skinIndexAttr.getZ(vertexIdx)),
                  Math.floor(skinIndexAttr.getW(vertexIdx)),
                ]
                const weights = [
                  skinWeightAttr.getX(vertexIdx),
                  skinWeightAttr.getY(vertexIdx),
                  skinWeightAttr.getZ(vertexIdx),
                  skinWeightAttr.getW(vertexIdx),
                ]

                for (let j = 0; j < 4; j++) {
                  if (
                    weights[j] > 0 &&
                    boneIndices[j] < mesh.skeleton.bones.length
                  ) {
                    const bone = mesh.skeleton.bones[boneIndices[j]]
                    temp.copy(vertex)
                    temp.applyMatrix4(
                      mesh.skeleton.boneInverses[boneIndices[j]],
                    )
                    temp.applyMatrix4(bone.matrixWorld)
                    temp.multiplyScalar(weights[j])
                    skinned.add(temp)
                  }
                }

                vertex.copy(skinned)
              } else {
                vertex.applyMatrix4(mesh.matrixWorld)
              }

              vertex.applyMatrix4(inverseMatrix)

              const idx = particleIdx * 3
              posAttr.array[idx] = vertex.x
              posAttr.array[idx + 1] = vertex.y
              posAttr.array[idx + 2] = vertex.z

              originalPosAttr.array[idx] = vertex.x
              originalPosAttr.array[idx + 1] = vertex.y
              originalPosAttr.array[idx + 2] = vertex.z
            }
          }
        }

        posAttr.needsUpdate = true
        originalPosAttr.needsUpdate = true
      }
    }

    // Smooth particle displacement with physics
    if (interactive && geometry && velocitiesRef.current && pointsRef.current) {
      const displacementAttr = geometry.getAttribute(
        'currentDisplacement',
      ) as THREE.BufferAttribute
      const originalPosAttr = geometry.getAttribute(
        'originalPosition',
      ) as THREE.BufferAttribute
      const velocities = velocitiesRef.current

      if (displacementAttr && originalPosAttr) {
        const mousePos = mouse3DRef.current
        const springStrength = returnSpeed
        const damping = 0.8

        for (let i = 0; i < displacementAttr.count; i++) {
          const idx = i * 3

          const ox = originalPosAttr.array[idx]
          const oy = originalPosAttr.array[idx + 1]
          const oz = originalPosAttr.array[idx + 2]

          const worldPos = new THREE.Vector3(ox, oy, oz)
          worldPos.applyMatrix4(pointsRef.current.matrixWorld)

          const dist = worldPos.distanceTo(mousePos)

          let targetX = 0,
            targetY = 0,
            targetZ = 0

          if (dist < disperseRadius) {
            const direction = new THREE.Vector3()
              .subVectors(worldPos, mousePos)
              .normalize()
            const influence = Math.pow(1.0 - dist / disperseRadius, 2)
            const time = state.clock.elapsedTime
            const noise = Math.sin(ox * 0.1 + time) * 0.3

            targetX = direction.x * influence * disperseStrength * (1 + noise)
            targetY = direction.y * influence * disperseStrength * (1 + noise)
            targetZ = direction.z * influence * disperseStrength * (1 + noise)
          }

          const currentX = displacementAttr.array[idx]
          const currentY = displacementAttr.array[idx + 1]
          const currentZ = displacementAttr.array[idx + 2]

          velocities[idx] += (targetX - currentX) * springStrength * delta
          velocities[idx + 1] += (targetY - currentY) * springStrength * delta
          velocities[idx + 2] += (targetZ - currentZ) * springStrength * delta

          velocities[idx] *= damping
          velocities[idx + 1] *= damping
          velocities[idx + 2] *= damping

          displacementAttr.array[idx] += velocities[idx] * delta * 60
          displacementAttr.array[idx + 1] += velocities[idx + 1] * delta * 60
          displacementAttr.array[idx + 2] += velocities[idx + 2] * delta * 60
        }

        displacementAttr.needsUpdate = true
      }
    }
  })

  useEffect(() => {
    return () => {
      particleMaterial.dispose()
    }
  }, [particleMaterial])

  if (!geometry) return null

  return (
    <points ref={pointsRef} geometry={geometry} material={particleMaterial} />
  )
}
