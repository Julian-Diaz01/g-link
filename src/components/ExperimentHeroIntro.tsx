import React from 'react'

const ExperimentHeroIntro: React.FC = () => {
  return (
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
  )
}

export default ExperimentHeroIntro
