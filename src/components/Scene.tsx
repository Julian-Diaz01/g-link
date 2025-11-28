'use client'

import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Model } from './Model.tsx'
import { useTheme } from '../context/ThemeContext.tsx'

export default function Scene() {
  const { isDark } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="w-full h-screen relative cursor-grab active:cursor-grabbing"
    >
      {/* Dialogue Box */}
      <div className="absolute top-8 right-8 z-10 bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-2xl shadow-2xl border-2 border-orange-500 max-w-xs">
        <div className="relative">
          <p
            className="font-bold text-lg tracking-wide text-orange-500"
            style={{ textShadow: '0 0 10px rgba(249, 115, 22, 0.5)' }}
          >
            😺
          </p>
        </div>
        {/* Speech bubble tail with border */}
        {/* Outer triangle (border) */}
        <div className="absolute -bottom-[15px] right-[25px] w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[16px] border-t-orange-500"></div>
        {/* Inner triangle (fill) */}
        <div className="absolute -bottom-[13px] right-[27px] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-slate-50 dark:border-t-slate-900"></div>
      </div>
      <Canvas
        key="hero-idle-cat-scene"
        gl={{ preserveDrawingBuffer: true }}
        eventSource={containerRef.current || undefined}
        eventPrefix="client"
        camera={{ position: [8, 2, 7], fov: 50 }}
        dpr={[1, 2]}
        frameloop="always"
      >
        <OrbitControls
          enabled={true}
          enableDamping
          dampingFactor={0.05}
          target={[-3, 0, 0]}
          makeDefault={false}
        />

        <ambientLight intensity={0} />
        <directionalLight position={[10, 10, 5]} intensity={0} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        <group position={[0, 0, 0]} scale={0.1} key="hero-cat-group">
          <Suspense fallback={null}>
            <Model
              key="hero-idle-cat-model"
              modelPath="/cat_idle2.glb"
              particleColor="#00ffff"
              meshColor="#F3F3F3"
              meshOpacity={0.05}
              particleSize={0.2}
              sampleRate={1}
              animated={isDark ? true : false}
              showMesh={true}
              autoRotate={false}
              interactive={true}
              disperseRadius={2}
              disperseStrength={100}
              returnSpeed={1.0}
              use3DGradient={true}
              gradientColors={
                isDark
                  ? [
                      { color: '#FF9101', position: [1, 1, 1] },
                      { color: '#00F7FF', position: [0, 0, 1] },
                    ]
                  : [
                      { color: '#FF9101', position: [0, 0, 1] },
                      { color: '#00F7FF', position: [1, 1, 1] },
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
