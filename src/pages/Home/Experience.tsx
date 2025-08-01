import React from 'react'
import { Box, Typography } from '@mui/material'
import ProjectCard from '../../components/ProjectCard.tsx'
import theme from '../../theme.tsx'
import jobsData from '../../data/jobs.json'
interface Jobs {
  monthYearRange: string
  title: string
  subTitle: string
  cardLink: string
  description: string
  chips: string[]
  links?: { title: string; url: string }[]
}

const jobs: Jobs[] = jobsData

const Experience: React.FC = () => {
  const styles = {
    titleStyle: {
      width: 'fit-content',
      fontSize: '1.2rem',
      color: theme.palette.secondary.main,
      mb: 2,
    },
  }
  return (
    <Box sx={{ mt: 5, mb: 5 }} id="#experience">
      <Typography sx={styles.titleStyle}>Experience</Typography>
      {jobs.map((job, index) => (
        <Box key={index}>
          <ProjectCard
            monthYearRange={job.monthYearRange}
            title={job.title}
            subTitle={job.subTitle}
            cardLink={job.cardLink}
            description={job.description}
            chips={job.chips}
            links={job.links}
          />
          {index !== jobs.length - 1 && <div style={{ height: 20 }} />}
        </Box>
      ))}
    </Box>
  )
}
export default Experience
