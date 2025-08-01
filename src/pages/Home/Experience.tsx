import React from 'react'
import { Box, Typography } from '@mui/material'
import ProjectCard from '../../components/ProjectCard.tsx'
import theme from '../../theme.tsx'

interface Jobs {
  monthYearRange: string
  title: string
  subTitle: string
  cardLink: string
  description: string
  chips: string[]
  links?: { title: string; url: string }[]
}

const jobs: Jobs[] = [
  {
    monthYearRange: 'May 2025 – Present',
    title: 'Co-Founder',
    subTitle: 'Konnektaro',
    cardLink: 'https://konnektaro.com/',
    description:
      'Developed a mobile-first progressive web app for real-time learning, and networking sessions using React, Next.js, and TypeScript.',
    chips: [
      'React TS',
      'Next JS',
      'Express',
      'Node JS',
      'HTML',
      'Tailwind CSS',
      'CSS',
      'CI/DC',
      'Firebase',
      'MongoDB',
      'Figma',
    ],
  },
  {
    monthYearRange: 'Mar 2024 - Dec 2024',
    title: 'Founding Engineer / Technical Advisor',
    subTitle: 'EduEnvire',
    cardLink: 'https://eduenvire.com/',
    description:
      'Developed a check-in system that allowed students to register their attendance while giving teachers real-time insights into device usage without restricting access. This tool improved classroom management by promoting responsible device use. I led the design and development, working with the backend team to ensure seamless integration and a user-friendly interface, while creating a scalable solution for future needs.',
    chips: [
      'React TS',
      'React Native',
      'HTML',
      'CSS',
      'CI/DC',
      'Azure AD',
      'Figma',
    ],
  },
  {
    monthYearRange: 'Jun 2020 - Dec 2023',
    title: 'Frontend Engineer',
    subTitle: 'iomoto',
    cardLink: 'https://www.iomoto.io/',
    description:
      'Build, style, and ship high-quality a fleet management platform, ensuring secure access for over 5000 vehicles. From conception to beta, crafted a versatile white-label solution, facilitating diverse business needs. This project underscored my ability to navigate complex challenges, delivering robust digital solutions that cater to the intricate needs of large-scale fleet management.',
    chips: [
      'React',
      'HTML',
      'CSS',
      'Jest',
      'Cypress',
      'CI/DC',
      'Azure AD',
      'Jira',
      'Figma',
    ],
  },
  {
    monthYearRange: 'Jan 2023 - Dec 2023',
    title: 'Mobile Developer',
    subTitle: 'iomoto',
    cardLink: 'https://www.iomoto.io/',
    description:
      'Developed a B2C automotive sales app. Utilized user data to assess electric vehicle fit. Engineered virtual electric vehicle for direct comparison. Led garage feature development, ensuring user-centricity. Managed login flow for security. Contributed to main app and conducted unit testing.',
    chips: ['Flutter', 'Dart', 'CI/DC', 'Azure/DevOps'],
    links: [
      { title: 'Lity', url: 'https://lity.io/' },
      {
        title: 'Apple store',
        url: 'https://apps.apple.com/ch/app/lity/id6448170700',
      },
    ],
  },
  {
    monthYearRange: 'Nov 2019 - Jan 2020',
    title: 'Frontend Engineer, Intern',
    subTitle: 'The Key Technology',
    cardLink: 'https://www.thekey.technology/en/',
    description:
      'Contributed to diverse client assignments, including the development of an auction house app using React JavaScript. Gained backend expertise by creating REST endpoints in Scala, ensuring quality with endpoint-specific unit tests.',
    chips: ['React', 'Jest', 'Scala'],
  },
]

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
