import React, { useEffect, useState } from 'react'
import { Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'

const HomeMenu: React.FC = () => {
  const [activeAnchor, setActiveAnchor] = useState<string>('')
  const theme = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200 // Add padding to scroll position for better detection
      const sections = [
        { id: '#home', element: document.getElementById('#home') },
        { id: '#experience', element: document.getElementById('#experience') },
        { id: '#education', element: document.getElementById('#education') },
        {
          id: '#languages',
          element: document.getElementById('#languages'),
          offset: 50,
        }, // Add offset for Languages detection
      ]

      for (let i = 0; i < sections.length; i++) {
        const current = sections[i]
        const next = sections[i + 1]

        if (current.element) {
          const currentTop = current.element.offsetTop - (current.offset || 0)
          const nextTop = next?.element?.offsetTop || Number.MAX_VALUE

          if (scrollPosition >= currentTop && scrollPosition < nextTop) {
            setActiveAnchor(current.id)
            return
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call to set the active anchor
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = (anchor: string) => () => {
    const anchorElement = document.getElementById(anchor)
    if (anchorElement) {
      window.scrollTo({
        top: anchorElement.offsetTop,
        behavior: 'smooth',
      })
    }
  }

  const linkStyles = (anchor: string) => ({
    cursor: 'pointer',
    fontSize: activeAnchor === anchor ? '1.2rem' : '1rem',
    color:
      activeAnchor === anchor
        ? theme.palette.secondary.main
        : theme.palette.text.primary,
    transition: 'color 0.3s',
    mr: 2,
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  })

  return (
    <div style={{ marginTop: '40px' }}>
      <Typography sx={linkStyles('#home')} onClick={handleScroll('#home')}>
        About
      </Typography>
      <Typography
        sx={linkStyles('#experience')}
        onClick={handleScroll('#experience')}
      >
        Experience
      </Typography>
      <Typography
        sx={linkStyles('#education')}
        onClick={handleScroll('#education')}
      >
        Education
      </Typography>
      <Typography
        sx={linkStyles('#languages')}
        onClick={handleScroll('#languages')}
      >
        Languages
      </Typography>
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          color: theme.palette.text.primary,
          display: 'block',
          marginTop: theme.spacing(2),
          fontSize: '1rem',
          transition: 'color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = theme.palette.secondary.main
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = theme.palette.text.primary
        }}
      >
        <Typography
          sx={{
            cursor: 'pointer',
            '&:hover': {
              color: theme.palette.secondary.main,
            },
          }}
        >
          v2
        </Typography>
      </Link>
    </div>
  )
}

export default HomeMenu
