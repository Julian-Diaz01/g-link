import React from 'react'
import { ExternalLink } from 'lucide-react'
import { Education } from '../types'

interface EducationProps {
  education: Education[]
}

const EducationSection: React.FC<EducationProps> = ({ education }) => {
  return (
    <section
      id="education"
      className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 dark:text-white">
            <span className="text-orange-500 dark:text-orange-400">
              Education
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Academic background and achievements
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="group relative bg-slate-50 dark:bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
            >
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-2">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1 dark:text-white">
                      {edu.title}
                    </h3>
                    <p className="text-base sm:text-lg text-orange-500 dark:text-orange-400 mb-1 sm:mb-2">
                      {edu.subTitle}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      {edu.monthYearRange}
                    </p>
                  </div>
                  {edu.cardLink && (
                    <a
                      href={edu.cardLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 transition flex-shrink-0"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                  {edu.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                  {edu.chips.map((chip, chipIndex) => (
                    <span
                      key={chipIndex}
                      className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs sm:text-sm"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                {edu.links && edu.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-700">
                    {edu.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 text-xs sm:text-sm font-medium flex items-center gap-1"
                      >
                        {link.title}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EducationSection
