import React from 'react'
import { Box, Typography } from '@mui/material'
import ProjectCard from '../../components/ProjectCard.tsx'
import theme from '../../theme.tsx'

interface Education {
  monthYearRange: string
  title: string
  subTitle: string
  cardLink: string
  description: string
  chips: string[]
  links?: { title: string; url: string }[]
}

const education: Education[] = [
  {
    monthYearRange: 'Jan 2018 - Jul 2019',
    title: 'M.Sc. Creative Technologies',
    subTitle: 'Leeds Beckett University (Leeds, UK)',
    cardLink: 'https://www.leedsbeckett.ac.uk/courses/creative-technology-msc/',
    description:
      'Developed an AR and AI-based navigation system for indoor environments, using snatural markers for location tracking. The system guides users through structures with real-time instructions.',
    chips: ['C#', 'JavaScript', 'Unity', 'AI'],
    links: [
      {
        title: 'Git',
        url: 'https://github.com/Julian-Diaz01/AR-navigation-App',
      },
      {
        title: 'YouTube',
        url: 'https://www.youtube.com/watch?v=1hH-E6ymdm0',
      },
    ],
  },
  {
    monthYearRange: 'Jul 2011 - Jun 2017',
    title: 'Ing. Multimedia Engineering',
    subTitle: 'Universidad Militar Nueva Granada (Bogota, Col)',
    cardLink:
      'https://www.umng.edu.co/programas/pregrados/ingenieria-multimedia',
    description:
      'Multimedia Engineering graduate with training in design, interactivity, 3D, VR/AR, and software development. Skilled in creating innovative tech solutions and managing multidisciplinary projects.',
    chips: ['Interactive Design', '3D Graphics', 'Interactive Design', 'AR/VR'],
  },
]

const Education: React.FC = () => {
  const styles = {
    titleStyle: {
      width: 'fit-content',
      fontSize: '1.2rem',
      color: theme.palette.secondary.main,
      mb: 2,
    },
  }
  return (
    <Box sx={{ mt: 5, mb: 5 }} id="#education">
      <Typography sx={styles.titleStyle}>Education</Typography>
      {education.map((diploma, index) => (
        <Box key={index}>
          <ProjectCard
            monthYearRange={diploma.monthYearRange}
            title={diploma.title}
            subTitle={diploma.subTitle}
            cardLink={diploma.cardLink}
            description={diploma.description}
            chips={diploma.chips}
            links={diploma.links}
          />
          {index !== education.length - 1 && <div style={{ height: 20 }} />}
        </Box>
      ))}
    </Box>
  )
}

export default Education
