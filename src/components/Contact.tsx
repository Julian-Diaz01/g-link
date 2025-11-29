import React, { useState, useCallback } from 'react'
import { Github, Linkedin, Mail, LucideIcon } from 'lucide-react'
import { Profile } from '../types'
import { trackMetric } from '../utils/sentry'

interface ContactProps {
  profile: Profile
}

// Email obfuscation utilities
const encodeEmail = (email: string): string => {
  return btoa(email).split('').reverse().join('')
}

const decodeEmail = (encoded: string): string => {
  return atob(encoded.split('').reverse().join(''))
}

const obfuscateEmailDisplay = (email: string): string => {
  const [localPart, domain] = email.split('@')
  if (!domain) return email
  const maskedLocal =
    localPart.length > 2
      ? `${localPart[0]}${'*'.repeat(localPart.length - 2)}${localPart[localPart.length - 1]}`
      : localPart
  return `${maskedLocal}@${domain}`
}

const iconMap: Record<string, LucideIcon> = {
  Github,
  Linkedin,
}

const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [showFullEmail, setShowFullEmail] = useState(false)

  // Encode email for storage (not directly in HTML)
  const encodedEmail = encodeEmail(profile.email)

  const handleEmailClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      trackMetric('contact_button_click', { type: 'email' })
      const decodedEmail = decodeEmail(encodedEmail)
      window.location.href = `mailto:${decodedEmail}`
    },
    [encodedEmail],
  )

  const handleEmailDisplayClick = useCallback(() => {
    setShowFullEmail(true)
  }, [])

  const displayedEmail = showFullEmail
    ? profile.email
    : obfuscateEmailDisplay(profile.email)

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-800 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white dark:text-slate-100">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Let's Work Together
        </h2>
        <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-orange-100 dark:text-orange-200">
          Have a project in mind? Let's create something amazing together.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
          <a
            href="#"
            onClick={handleEmailClick}
            className="bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            Get In Touch
          </a>
          <a
            href="/julian_diaz_cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white dark:border-slate-200 text-white dark:text-slate-100 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white/10 dark:hover:bg-slate-800/30 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            onClick={() =>
              trackMetric('cv_button_click', { location: 'contact_section' })
            }
          >
            View Resume
          </a>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 text-xs sm:text-sm">
          <a
            href="#"
            onClick={handleEmailClick}
            className="flex items-center justify-center gap-2 hover:text-orange-100 dark:hover:text-orange-300 transition break-all cursor-pointer"
            onMouseEnter={handleEmailDisplayClick}
          >
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span className="break-all">{displayedEmail}</span>
          </a>
        </div>

        <div className="flex gap-4 sm:gap-6 justify-center mt-8 sm:mt-12">
          {profile.socialLinks.map((social, index) => {
            const IconComponent = iconMap[social.icon] || Github

            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 dark:bg-slate-800/50 rounded-full flex items-center justify-center hover:bg-white/30 dark:hover:bg-slate-700/60 transition"
                aria-label={social.name}
              >
                <IconComponent className="w-5 h-5" />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Contact
