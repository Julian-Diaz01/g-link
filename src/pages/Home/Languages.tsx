import React from 'react'
import { Box } from '@mui/material'
import ProjectCard from '../../components/ProjectCard.tsx'

interface Language {
  name: string
  description: string
  chips: string[]
}

const languages: Language[] = [
  {
    name: 'Spanish',
    description: 'Native',
    chips: ['Speaking', 'Writing', 'Reading', 'Culture'],
  },
  {
    name: 'English',
    description: 'Fluent',
    chips: ['Speaking', 'Writing', 'Reading', 'Technical Communication'],
  },
  {
    name: 'German',
    description: 'B1 certified',
    chips: ['Speaking', 'Reading', 'Writing'],
  },
]

const Languages: React.FC = () => {
  return (
    <Box sx={{ mt: 5, mb: 5 }} id="#languages">
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
