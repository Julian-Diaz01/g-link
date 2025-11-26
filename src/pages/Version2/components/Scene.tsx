'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Model } from './Model'
import { useTheme } from '../context/ThemeContext.tsx'

export default function Scene() {
  const [scrollY, setScrollY] = useState(0)
  const { isDark } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const modelRotation: [number, number, number] = [0, scrollY * 0.001, 0]

  return (
    <div ref={containerRef} className="w-full h-screen relative">
      {/* Dialogue Box */}
      <div className="absolute top-8 right-8 z-10 bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-2xl shadow-2xl border-2 border-orange-500 max-w-xs">
        <div className="relative">
          <p
            className="font-bold text-lg tracking-wide text-orange-500"
            style={{ textShadow: '0 0 10px rgba(249, 115, 22, 0.5)' }}
          >
            btw i like cats! 😺
          </p>
        </div>
        {/* Speech bubble tail with border */}
        {/* Outer triangle (border) */}
        <div className="absolute -bottom-[15px] right-[100px] w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[16px] border-t-orange-500"></div>
        {/* Inner triangle (fill) */}
        <div className="absolute -bottom-[13px] right-[101px] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-slate-50 dark:border-t-slate-900"></div>
      </div>
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        eventSource={containerRef.current || undefined}
        eventPrefix="client"
        camera={{ position: [5, 7, 10], fov: 50 }}
      >
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          target={[0, 0, 2]}
          makeDefault
        />

        <ambientLight intensity={0} />
        <directionalLight position={[10, 10, 5]} intensity={0} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        <group position={[0, 1, 0]} scale={0.1}>
          <Suspense fallback={null}>
            <Model
              modelPath="/cat_idle.glb"
              particleColor="#00ffff"
              meshColor="#F3F3F3"
              meshOpacity={0.05}
              particleSize={0.2}
              sampleRate={1}
              animated={true}
              showMesh={true}
              rotation={modelRotation}
              autoRotate={false}
              interactive={true}
              disperseRadius={6}
              disperseStrength={100}
              returnSpeed={1.0}
              use3DGradient={true}
              gradientColors={
                isDark
                  ? [
                      { color: '#ff00ff', position: [0, 0, 1] },
                      { color: '#00ffff', position: [1, 0, 1] },
                    ]
                  : [
                      { color: '#FF4800', position: [1, 0, 0] },
                      { color: '#003BDD', position: [0, 0, 1] },
                    ]
              }
              gradientBlendPower={2.0}
              playAnimation={true}
              animationIndex={0}
            />
          </Suspense>
        </group>
      </Canvas>
    </div>
  )
}
