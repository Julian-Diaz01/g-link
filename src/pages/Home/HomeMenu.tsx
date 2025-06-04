import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

const HomeMenu: React.FC = () => {
  const [activeAnchor, setActiveAnchor] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const homeSection = document.getElementById('#home')
      const experienceSection = document.getElementById('#experience')
      const languagesSection = document.getElementById('#languages')

      if (homeSection && experienceSection && languagesSection) {
        //const homeOffset = homeSection.offsetTop
        const experienceOffset = experienceSection.offsetTop
        const languagesOffset = languagesSection.offsetTop

        if (scrollPosition < experienceOffset) {
          setActiveAnchor('#home')
        } else if (
          scrollPosition >= experienceOffset &&
          scrollPosition < languagesOffset
        ) {
          setActiveAnchor('#experience')
        } else {
          setActiveAnchor('#languages')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call initially to set the active anchor
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = (anchor: string) => () => {
    const anchorElement = document.getElementById(anchor)
    if (anchorElement) {
      window.scrollTo({ top: anchorElement.offsetTop, behavior: 'smooth' })
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
          mr: 2,
        }}
        onClick={handleScroll('#experience')}
      >
        Experience
      </Typography>
      <Typography
        variant="body1"
        color={activeAnchor === '#languages' ? 'secondary' : 'inherit'}
        sx={{
          cursor: 'pointer',
          fontSize: activeAnchor === '#languages' ? '1.2rem' : '1rem',
        }}
        onClick={handleScroll('#languages')}
      >
        Languages
      </Typography>
    </Box>
  )
}

export default HomeMenu
