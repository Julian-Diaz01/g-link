import React, { useState, useEffect } from 'react'
import { Star, ArrowRight } from 'lucide-react'
import { Profile } from '../types'
import julian1 from '../img/julian1.webp'
import julian2 from '../img/julian2.webp'
import julian3 from '../img/julian3.webp'
import julian4 from '../img/julian4.webp'

interface HeroProps {
  profile: Profile
}

const Hero: React.FC<HeroProps> = ({ profile }) => {
  const images = [julian1, julian2, julian3, julian4]
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.floor(Math.random() * 4),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 4)
    }, 4000) // Rotate every 20 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-20 sm:pt-24 md:pt-28 bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column - Text */}
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            <div className="inline-block">
              <div className="relative">
                <div className="bg-white dark:bg-slate-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm border border-orange-200 dark:border-orange-800 inline-block">
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    {profile.greeting}
                  </span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8">
                  <svg
                    viewBox="0 0 100 100"
                    className="animate-pulse w-full h-full"
                  >
                    <path
                      d="M50,10 L60,40 L90,50 L60,60 L50,90 L40,60 L10,50 L40,40 Z"
                      fill="#fb923c"
                      opacity="0.3"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-slate-900 dark:text-white">
                I'm{' '}
                <span className="text-orange-500 dark:text-orange-400">
                  {profile.firstName}
                </span>
                ,
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200">
                {profile.title}
              </h2>
            </div>

            <div className="relative">
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
                {profile.bio}
              </p>
              <div className="absolute -left-4 sm:-left-8 top-0 text-orange-400 text-2xl sm:text-4xl font-bold opacity-20">
                "
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8 pt-2 sm:pt-4">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(profile.yearsOfExperience)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 sm:w-4 sm:h-4 fill-orange-400 text-orange-400"
                    />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {profile.yearsOfExperience}+ Years Experience
                </p>
              </div>
              <div className="w-px h-8 sm:h-12 bg-slate-200 dark:bg-slate-700" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-orange-500 dark:text-orange-400">
                  {profile.projectsCompleted}+
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Projects Completed
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <a
                href="#experience"
                className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Portfolio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="border-2 border-orange-500 dark:border-orange-400 text-orange-500 dark:text-orange-400 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium hover:bg-orange-50 dark:hover:bg-orange-900/30 transition text-sm sm:text-base text-center"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative w-full aspect-square max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
              {/* Orange Circle Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full transform scale-90" />

              {/* Decorative Elements */}
              <div className="hidden sm:block absolute top-10 -left-10 w-16 h-16 sm:w-20 sm:h-20 bg-orange-200 rounded-3xl transform rotate-12 opacity-60" />
              <div className="hidden sm:block absolute bottom-20 -right-8 w-12 h-12 sm:w-16 sm:h-16 bg-orange-300 rounded-2xl transform -rotate-12 opacity-60" />

              {/* Image */}
              <div className="absolute inset-0 flex items-end justify-center">
                <img
                  src={images[currentImageIndex]}
                  alt="hero"
                  className="w-4/5 h-4/5 object-cover rounded-t-full transition-opacity duration-500"
                  key={currentImageIndex}
                />
              </div>

              {/* Floating Info Card */}
              <div className="absolute top-8 sm:top-16 -right-2 sm:-right-4 bg-white dark:bg-slate-800 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
                <p className="text-xs text-orange-500 dark:text-orange-400 font-medium">
                  ★ Recommended
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
