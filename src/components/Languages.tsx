import React from 'react'
import { Language } from '../types'

interface LanguagesProps {
  languages: Language[]
}

const Languages: React.FC<LanguagesProps> = ({ languages }) => {
  return (
    <section
      id="languages"
      className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 dark:text-white">
            Language{' '}
            <span className="text-orange-500 dark:text-orange-400">Skills</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Communication levels across international environments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {languages.map((language) => (
            <div
              key={language.name}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 p-5 sm:p-6"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-2 dark:text-white">
                {language.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm sm:text-base">
                {language.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {language.chips.map((chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs sm:text-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Languages
