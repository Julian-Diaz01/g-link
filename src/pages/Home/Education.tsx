import React from 'react'
import { Box, Typography } from '@mui/material'
import ProjectCard from '../../components/ProjectCard.tsx'
import theme from '../../theme.tsx'
import educationData from '../../data/education.json'

interface Education {
  monthYearRange: string
  title: string
  subTitle: string
  cardLink: string
  description: string
  chips: string[]
  links?: { title: string; url: string }[]
}

const education: Education[] = educationData

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
