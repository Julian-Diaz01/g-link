import React from 'react'
import { Typography } from '@mui/material'
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
    <div style={{ marginTop: '40px', marginBottom: '40px' }} id="#experience">
      <Typography sx={styles.titleStyle}>Experience</Typography>
      {jobs.map((job, index) => (
        <div key={index}>
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
        </div>
      ))}
    </div>
  )
}
export default Experience
