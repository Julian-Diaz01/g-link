import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

const HomeMenu: React.FC = () => {
  const [activeAnchor, setActiveAnchor] = useState<string>('')
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const aboutSection = document.getElementById('#home')
      const experienceSection = document.getElementById('#experience')

      if (aboutSection && experienceSection) {
        const experienceOffset = experienceSection.offsetTop

        if (scrollPosition < experienceOffset) {
          setActiveAnchor('#home')
        } else {
          setActiveAnchor('#experience')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call initially to set the active anchor
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = (anchor: string) => () => {
    const anchorElement = document.getElementById(anchor)
    console.log(anchorElement)
    if (anchorElement) {
      const scrollPosition =
        anchor === 'experience'
          ? anchorElement.offsetTop - 10
          : anchorElement.offsetTop
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
    }
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Typography
        variant="body1"
        color={activeAnchor === '#home' ? 'secondary' : 'inherit'}
        sx={{
          cursor: 'pointer',
          fontSize: activeAnchor === '#home' ? '1.2rem' : '1rem',
          mr: 2,
        }}
        onClick={handleScroll('#home')}
      >
        About
      </Typography>
      <Typography
        variant="body1"
        color={activeAnchor === '#experience' ? 'secondary' : 'inherit'}
        sx={{
          cursor: 'pointer',
          fontSize: activeAnchor === '#experience' ? '1.2rem' : '1rem',
        }}
        onClick={handleScroll('#experience')}
      >
        Experience
      </Typography>
    </Box>
  )
}
export default HomeMenu
