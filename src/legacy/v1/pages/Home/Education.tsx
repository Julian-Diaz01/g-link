import React from 'react'
import { Typography } from '@mui/material'
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
    <div style={{ marginTop: '40px', marginBottom: '40px' }} id="#education">
      <Typography sx={styles.titleStyle}>Education</Typography>
      {education.map((diploma, index) => (
        <div key={index}>
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
        </div>
      ))}
    </div>
  )
}

export default Education
