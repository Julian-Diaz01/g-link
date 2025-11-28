import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Profile } from '../types'
import DarkModeToggle from './DarkModeToggle'

interface NavigationProps {
  profile: Profile
}

const Navigation: React.FC<NavigationProps> = ({ profile }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const initials = `${profile.firstName[0]}${profile.lastName[0]}`

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false)
  }

  const navLinks = [
    { href: '#home', label: 'Home', isActive: true },
    { href: '#services', label: 'Services' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={closeMobileMenu}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm sm:text-base">
              {initials}
            </div>
            <span className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
              {profile.firstName.toUpperCase()}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`${
                  link.isActive
                    ? 'text-orange-500 dark:text-orange-400 font-medium'
                    : 'text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400'
                } transition text-sm xl:text-base`}
              >
                {link.label}
              </a>
            ))}
            <a
              className="text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition text-sm xl:text-base"
              href="/julian_diaz_cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
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
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition"
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
          <div className="lg:hidden mt-4 pb-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`${
                    link.isActive
                      ? 'text-orange-500 dark:text-orange-400 font-medium'
                      : 'text-slate-600 dark:text-slate-300'
                  } transition py-2`}
                >
                  {link.label}
                </a>
              ))}
              <a
                className="text-slate-600 dark:text-slate-300 py-2"
                href="/julian_diaz_cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
              >
                CV
              </a>
              <Link
                to="/home"
                className="text-slate-600 dark:text-slate-300 py-2"
                onClick={closeMobileMenu}
              >
                v1
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
