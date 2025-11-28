'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Particles } from './Particles'

interface ModelProps {
  modelPath: string
  particleColor?: string
  particleSize?: number
  sampleRate?: number
  animated?: boolean
  showMesh?: boolean
  meshOpacity?: number
  meshColor?: string
  rotation?: [number, number, number]
  autoRotate?: boolean
  rotationSpeed?: number
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
  playAnimation?: boolean
  animationIndex?: number
}

export function Model({
  modelPath,
  particleColor = '#00ffff',
  particleSize = 0.03,
  sampleRate = 1,
  animated = false,
  showMesh = true,
  meshOpacity = 0.3,
  meshColor = '#001a33',
  rotation,
  autoRotate = false,
  rotationSpeed = 0.3,
  interactive = false,
  disperseRadius = 2.0,
  disperseStrength = 1.5,
  returnSpeed = 3.0,
  use3DGradient = false,
  gradientColors = null,
  gradientBlendPower = 2.0,
  playAnimation = true,
  animationIndex = 0,
}: ModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)
  const gltf = useLoader(GLTFLoader, modelPath)

  // Apply material to mesh
  useEffect(() => {
    if (gltf && showMesh) {
      const meshMaterial = new THREE.MeshStandardMaterial({
        color: meshColor,
        transparent: meshOpacity < 1,
        opacity: meshOpacity,
        side: THREE.DoubleSide,
      })

      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = meshMaterial
          child.castShadow = true
          child.receiveShadow = true
        }
      })

      return () => {
        meshMaterial.dispose()
      }
    }
  }, [gltf, meshColor, meshOpacity, showMesh])

  // Setup animation
  useEffect(() => {
    if (!gltf || !playAnimation) return

    if (gltf.animations && gltf.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(gltf.scene)
      mixerRef.current = mixer

      const clipIndex = Math.min(animationIndex, gltf.animations.length - 1)
      const clip = gltf.animations[clipIndex]
      const action = mixer.clipAction(clip)

      action.play()

      return () => {
        mixer.stopAllAction()
        mixerRef.current = null
      }
    }
  }, [gltf, playAnimation, animationIndex])

  // Apply rotation
  useEffect(() => {
    if (groupRef.current && rotation) {
      groupRef.current.rotation.set(rotation[0], rotation[1], rotation[2])
    }
  }, [rotation])

  // Animation loop
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta)
    }

    if (groupRef.current && autoRotate && rotationSpeed > 0) {
      groupRef.current.rotation.y += delta * rotationSpeed
    }
  })

  return (
    <group ref={groupRef}>
      {showMesh && <primitive object={gltf.scene} />}
      <Particles
        object={gltf.scene}
        color={particleColor}
        size={particleSize}
        sampleRate={sampleRate}
        animated={animated}
        interactive={interactive}
        disperseRadius={disperseRadius}
        disperseStrength={disperseStrength}
        returnSpeed={returnSpeed}
        use3DGradient={use3DGradient}
        gradientColors={gradientColors}
        gradientBlendPower={gradientBlendPower}
      />
    </group>
  )
}
