import React from 'react'
import { Box, Typography } from '@mui/material'
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
    <Box sx={{ mt: 5, mb: 5, pb: 15 }} id="#languages">
      <Typography sx={styles.titleStyle}>Languages</Typography>
      {languages.map((lang, index) => (
        <Box key={index}>
          <ProjectCard
            title={lang.name}
            subTitle={lang.description}
            chips={lang.chips}
          />
          {index !== languages.length - 1 && <div style={{ height: 20 }} />}
        </Box>
      ))}
    </Box>
  )
}

export default Languages
