import React, { Suspense, useEffect, useRef, useState } from 'react'
import { ThemeProvider } from '../context/ThemeContext'
import SEO from '../components/SEO'
import { Profile } from '../types'
import profileData from '../data/profile.json'

const Navigation = React.lazy(() => import('../components/Navigation'))

const profile = profileData as Profile

const ExperimentPage: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
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
    <ThemeProvider>
      <SEO
        title={`Experiment - ${profile.firstName} ${profile.lastName}`}
        description="A frame-by-frame scroll animation experiment using the new two-part sequence."
        keywords="Scroll animation, experiment, frontend animation, Julian Diaz"
        author={`${profile.firstName} ${profile.lastName}`}
        ogUrl={`${profile.website}experiment`}
        canonicalUrl={`${profile.website}experiment`}
        breadcrumbs={[
          { name: 'Home', url: profile.website },
          { name: 'Experiment', url: `${profile.website}experiment` },
        ]}
      />
      <div className="h-[100vh] relative overflow-hidden bg-slate-950 text-slate-100">
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

        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-lg">Loading...</div>
            </div>
          }
        >
          <Navigation profile={profile} variant="experiment" />

          <main className="relative min-h-screen pt-20 sm:pt-24">
            <section className="min-h-[calc(100vh-5rem)] flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                  <p className="text-cyan-300/90 uppercase tracking-[0.35em] text-xs sm:text-sm mb-5 sm:mb-7 animate-fade-in-up">
                    Experimental
                  </p>

                  <h1 className="font-black text-4xl sm:text-6xl lg:text-7xl leading-[1.05] uppercase tracking-[0.08em]">
                    <span className="block text-slate-100 animate-fade-in-up [animation-delay:120ms]">
                      Front End
                    </span>
                    <span className="block text-cyan-300 drop-shadow-[0_0_18px_rgba(56,189,248,0.6)] animate-fade-in-up [animation-delay:260ms]">
                      Engineer
                    </span>
                  </h1>

                  <p className="mt-6 text-slate-200/80 text-base sm:text-lg max-w-2xl animate-fade-in-up [animation-delay:420ms]">
                    Building immersive interfaces where motion, atmosphere, and
                    performance work together.
                  </p>

                  <div className="mt-8 flex gap-2 sm:gap-3 animate-fade-in-up [animation-delay:560ms]">
                    <span className="h-1.5 w-10 rounded-full bg-cyan-300 animate-pulse-slow" />
                    <span className="h-1.5 w-6 rounded-full bg-fuchsia-400 animate-pulse-slow [animation-delay:220ms]" />
                    <span className="h-1.5 w-16 rounded-full bg-orange-300/80 animate-pulse-slow [animation-delay:420ms]" />
                  </div>
                </div>
              </div>
            </section>

            <section ref={scrollContainerRef} className="relative">
              <div className="h-24" />
            </section>
          </main>
        </Suspense>

        <style>
          {`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translate3d(0, 28px, 0);
              }
              to {
                opacity: 1;
                transform: translate3d(0, 0, 0);
              }
            }
            @keyframes pulseSlow {
              0%, 100% {
                opacity: 0.5;
                transform: scaleX(0.96);
              }
              50% {
                opacity: 1;
                transform: scaleX(1.04);
              }
            }
            .animate-fade-in-up {
              animation: fadeInUp 850ms cubic-bezier(0.2, 0.65, 0.2, 1) both;
            }
            .animate-pulse-slow {
              animation: pulseSlow 2.6s ease-in-out infinite;
            }
          `}
        </style>
      </div>
    </ThemeProvider>
  )
}

export default ExperimentPage
