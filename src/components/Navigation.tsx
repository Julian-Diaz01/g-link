import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Profile } from '../types'
import DarkModeToggle from './DarkModeToggle'
import { trackMetric } from '../utils/sentry'

interface NavigationProps {
  profile: Profile
  variant?: 'default' | 'experiment'
}

const Navigation: React.FC<NavigationProps> = ({
  profile,
  variant = 'default',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const initials = `${profile.firstName[0]}${profile.lastName[0]}`

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false)
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/experiment', label: 'Experiment' },
  ]

  const linkClass =
    'text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition text-sm xl:text-base'
  const activeLinkClass = 'text-orange-500 dark:text-orange-400 font-medium'
  const isExperiment = variant === 'experiment'

  const navClass = isExperiment
    ? 'fixed top-0 left-0 right-0 z-50 bg-slate-950/45 backdrop-blur-xl border-b border-cyan-400/20 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
    : 'fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700'

  const themedLinkClass = isExperiment
    ? 'text-slate-200/90 hover:text-cyan-300 transition text-sm xl:text-base'
    : linkClass
  const themedActiveLinkClass = isExperiment
    ? 'text-cyan-300 font-medium'
    : activeLinkClass
  const logoBadgeClass = isExperiment
    ? 'w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center text-slate-950 font-bold text-sm sm:text-base shadow-[0_0_20px_rgba(34,211,238,0.5)]'
    : 'w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm sm:text-base'
  const logoTextClass = isExperiment
    ? 'font-bold text-lg sm:text-xl text-slate-100 tracking-wide'
    : 'font-bold text-lg sm:text-xl text-slate-900 dark:text-white'
  const mobileButtonClass = isExperiment
    ? 'p-2 text-slate-200 hover:text-cyan-300 transition'
    : 'p-2 text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition'
  const mobileMenuClass = isExperiment
    ? 'lg:hidden mt-4 pb-4 border-t border-cyan-400/20'
    : 'lg:hidden mt-4 pb-4 border-t border-slate-200 dark:border-slate-700'

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={closeMobileMenu}
          >
            <div className={logoBadgeClass}>{initials}</div>
            <span className={logoTextClass}>
              {profile.firstName.toUpperCase()}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? `${themedLinkClass} ${themedActiveLinkClass}`
                    : themedLinkClass
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              className={themedLinkClass}
              href="/julian_diaz_cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackMetric('cv_button_click', {
                  location: 'navigation_desktop',
                })
              }
            >
              CV
            </a>
            <DarkModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <DarkModeToggle />
            <button
              onClick={toggleMobileMenu}
              className={mobileButtonClass}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={mobileMenuClass}>
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? `${themedLinkClass} ${themedActiveLinkClass} py-2`
                      : `${themedLinkClass} py-2`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <a
                className={`${themedLinkClass} py-2`}
                href="/julian_diaz_cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackMetric('cv_button_click', {
                    location: 'navigation_mobile',
                  })
                  closeMobileMenu()
                }}
              >
                CV
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
