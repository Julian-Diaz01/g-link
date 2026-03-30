import React, { useEffect, useState } from 'react'

const ExperimentBackground: React.FC = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShouldLoadVideo(true)
    }, 250)

    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (!shouldLoadVideo) return
    setIsVideoReady(false)
  }, [shouldLoadVideo])

  return (
    <div className="absolute inset-0">
      <video
        className={`h-[100vh] w-full object-cover transition-opacity duration-1000 ease-out ${
          isVideoReady ? 'opacity-100' : 'opacity-0'
        }`}
        src={shouldLoadVideo ? '/video1.mp4' : undefined}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        onLoadedData={() => setIsVideoReady(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/15 via-slate-950/35 to-slate-950/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(56,189,248,0.14),transparent_45%),radial-gradient(circle_at_30%_65%,rgba(217,70,239,0.12),transparent_40%)]" />
    </div>
  )
}

export default ExperimentBackground
