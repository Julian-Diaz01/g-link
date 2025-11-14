import React from 'react'
import { Code, Briefcase, User, LucideIcon } from 'lucide-react'
import { Service } from '../types'

interface ServicesProps {
  services: Service[]
}

const iconMap: Record<string, LucideIcon> = {
  Code,
  Briefcase,
  User,
}

const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <section
      id="services"
      className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white">
            <span className="text-orange-500 dark:text-orange-400">
              Services
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl">
            Crafting digital solutions with expertise in modern web
            technologies. From concept to deployment, I bring vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Code

            return (
              <div
                key={index}
                className="group relative bg-slate-50 dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-400 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-orange-500/10 dark:bg-orange-400/10 rounded-full blur-3xl transform translate-x-12 sm:translate-x-16 -translate-y-12 sm:-translate-y-16 group-hover:scale-150 transition-transform duration-500" />

                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400 to-orange-600 dark:from-orange-500 dark:to-orange-700 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-slate-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 text-sm sm:text-base">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.chips.map((chip, chipIndex) => (
                      <span
                        key={chipIndex}
                        className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
