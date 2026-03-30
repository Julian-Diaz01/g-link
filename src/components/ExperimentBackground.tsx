import React, { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Extend HTMLVideoElement with RVFC types (not yet in lib.dom.d.ts everywhere)
type VideoWithRVFC = HTMLVideoElement & {
  requestVideoFrameCallback: (cb: VideoFrameRequestCallback) => number
  cancelVideoFrameCallback: (id: number) => void
}

const supportsRVFC = (v: HTMLVideoElement): v is VideoWithRVFC =>
  'requestVideoFrameCallback' in v

gsap.registerPlugin(ScrollTrigger)

const ExperimentBackground: React.FC = () => {
  const introVideoRef = useRef<HTMLVideoElement>(null)
  const scrollVideoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const activeVideoRef = useRef<HTMLVideoElement | null>(null)
  const scrollDurationRef = useRef(0)
  const lastScrollTimeRef = useRef(0)
  const rvfcIdRef = useRef<number | null>(null)
  const [isReady, setIsReady] = useState(false)

  // Draw the video frame to canvas with object-fit: cover semantics.
  // Canvas does not support CSS object-fit, so we calculate the crop manually.
  const drawCover = useCallback((video?: HTMLVideoElement | null) => {
    const targetVideo = video ?? activeVideoRef.current
    const canvas = canvasRef.current
    if (!targetVideo || !canvas || !targetVideo.videoWidth) return
    const ctx = contextRef.current ?? canvas.getContext('2d')
    if (!ctx) return
    contextRef.current = ctx

    const vw = targetVideo.videoWidth
    const vh = targetVideo.videoHeight
    const cw = canvas.width
    const ch = canvas.height
    const scale = Math.max(cw / vw, ch / vh)
    const scaledW = vw * scale
    const scaledH = vh * scale

    // Keep horizontal center, but bias vertical positioning slightly downward
    // so tall crops do not feel pushed up.
    const verticalAnchor = 0.4
    const dx = (cw - scaledW) / 2
    const dy = (ch - scaledH) * verticalAnchor
    ctx.drawImage(targetVideo, dx, dy, scaledW, scaledH)
  }, [])

  // Keep canvas pixel dimensions in sync with the viewport.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawCover()
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [drawCover])

  const stopRVFC = useCallback(() => {
    const introVideo = introVideoRef.current
    if (!introVideo || !supportsRVFC(introVideo) || rvfcIdRef.current === null)
      return
    introVideo.cancelVideoFrameCallback(rvfcIdRef.current)
    rvfcIdRef.current = null
  }, [])

  const startRVFC = useCallback(() => {
    const introVideo = introVideoRef.current
    if (!introVideo || !supportsRVFC(introVideo) || rvfcIdRef.current !== null)
      return

    const onFrame = () => {
      if (activeVideoRef.current === introVideo) {
        drawCover(introVideo)
      }
      rvfcIdRef.current = introVideo.requestVideoFrameCallback(onFrame)
    }

    rvfcIdRef.current = introVideo.requestVideoFrameCallback(onFrame)
  }, [drawCover])

  const activateIntro = useCallback(() => {
    const introVideo = introVideoRef.current
    if (!introVideo || activeVideoRef.current === introVideo) return

    const scrollVideo = scrollVideoRef.current
    activeVideoRef.current = introVideo
    scrollVideo?.pause()
    introVideo.currentTime = 0
    drawCover(introVideo)
    startRVFC()
    void introVideo.play().catch(() => {
      // Ignore autoplay denials; video remains at first frame.
    })
  }, [drawCover, startRVFC])

  const activateScroll = useCallback(() => {
    const scrollVideo = scrollVideoRef.current
    if (!scrollVideo || activeVideoRef.current === scrollVideo) return

    const introVideo = introVideoRef.current
    activeVideoRef.current = scrollVideo
    introVideo?.pause()
    stopRVFC()
    drawCover(scrollVideo)
  }, [drawCover, stopRVFC])

  // Keep canvas in sync for the scroll-scrubbed video in browsers where RVFC
  // does not fire on paused seeks.
  useEffect(() => {
    const fallbackVideo = scrollVideoRef.current
    if (!fallbackVideo) return

    const onSeeked = () => drawCover()
    fallbackVideo.addEventListener('seeked', onSeeked)
    return () => fallbackVideo.removeEventListener('seeked', onSeeked)
  }, [drawCover])

  // Top of page => looping intro video. Any scroll down => scroll-driven video.
  useEffect(() => {
    const updateByScroll = (progress: number) => {
      const isAtTop = window.scrollY <= 0
      if (isAtTop) {
        activateIntro()
        return
      }

      activateScroll()
      const scrollVideo = scrollVideoRef.current
      if (!scrollVideo || scrollDurationRef.current <= 0) return
      const nextTime = progress * scrollDurationRef.current
      if (Math.abs(nextTime - lastScrollTimeRef.current) < 1 / 30) return
      lastScrollTimeRef.current = nextTime
      scrollVideo.currentTime = nextTime
    }

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.2,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        updateByScroll(self.progress)
      },
      onRefresh: (self) => {
        updateByScroll(self.progress)
      },
    })

    // Apply correct mode immediately on mount.
    updateByScroll(trigger.progress)

    return () => {
      trigger.kill()
      stopRVFC()
      const introVideo = introVideoRef.current
      if (introVideo) {
        introVideo.pause()
      }
    }
  }, [activateIntro, activateScroll, stopRVFC])

  const drawWhenActive = useCallback(
    (eventVideo: HTMLVideoElement, shouldUseVideo: boolean) => {
      if (!shouldUseVideo) return
      setIsReady(true)
      activeVideoRef.current = eventVideo
      drawCover(eventVideo)
    },
    [drawCover],
  )

  return (
    <div className="fixed inset-0 h-[99vh] w-screen overflow-hidden">
      <img
        src="/hero-bg2.png"
        alt=""
        aria-hidden="true"
        className={`absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-700 ${
          isReady ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <video
        ref={introVideoRef}
        className="hidden"
        muted
        playsInline
        loop
        preload="auto"
        onLoadedMetadata={(e) => {
          drawWhenActive(e.currentTarget, window.scrollY <= 0)
        }}
        onCanPlay={(e) => {
          drawWhenActive(e.currentTarget, window.scrollY <= 0)
        }}
      >
        <source src="/video1.mp4" type="video/mp4" />
      </video>

      <video
        ref={scrollVideoRef}
        className="hidden"
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={(e) => {
          scrollDurationRef.current = e.currentTarget.duration
          lastScrollTimeRef.current = 0
          e.currentTarget.pause()
          e.currentTarget.currentTime = 0
          drawWhenActive(e.currentTarget, window.scrollY > 0)
        }}
        onCanPlay={(e) => {
          drawWhenActive(e.currentTarget, window.scrollY > 0)
        }}
      >
        <source src="/video2.mp4" type="video/mp4" />
      </video>

      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-[99vh] w-screen transition-opacity duration-1000 ease-out ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(56,189,248,0.14),transparent_45%),radial-gradient(circle_at_30%_65%,rgba(217,70,239,0.12),transparent_40%),linear-gradient(to_bottom,rgba(2,6,23,0.15),rgba(2,6,23,0.35),rgba(2,6,23,0.5))]" />
    </div>
  )
}

export default ExperimentBackground
