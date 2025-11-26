import React from 'react'
import { Typography } from '@mui/material'
import ProjectCard from '../../components/ProjectCard.tsx'
import theme from '../../theme.tsx'
import languagesData from '../../data/languages.json'

interface Language {
  name: string
  description: string
  chips: string[]
}

const languages: Language[] = languagesData

const Languages: React.FC = () => {
  const styles = {
    titleStyle: {
      width: 'fit-content',
      fontSize: '1.2rem',
      color: theme.palette.secondary.main,
      mb: 2,
    },
  }
  return (
    <div
      style={{
        marginTop: '40px',
        marginBottom: '40px',
        paddingBottom: '120px',
      }}
      id="#languages"
    >
      <Typography sx={styles.titleStyle}>Languages</Typography>
      {languages.map((lang, index) => (
        <div key={index}>
          <ProjectCard
            title={lang.name}
            subTitle={lang.description}
            chips={lang.chips}
          />
          {index !== languages.length - 1 && <div style={{ height: 20 }} />}
        </div>
      ))}
    </div>
  )
}

export default Languages
