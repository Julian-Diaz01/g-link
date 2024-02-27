import React from 'react'
import { Grid, Typography } from '@mui/material'
import TextHighlighter from '../../components/TextHighlighter.tsx'
import ProjectCard from '../../components/ProjectCard.tsx'
import ShowCat from '../../components/ShowCat.tsx'

const Home: React.FC = () => {
  return (
    <>
      <Introduction />
      <Experience />
    </>
  )
}

const Introduction: React.FC = () => {
  return (
    <Grid container sx={{ mt: 10 }} spacing={3}>
      <Grid item md={12} lg={6} component="div">
        <Typography color="secondary" sx={{ fontFamily: 'monospace' }}>
          Hi, my name is
        </Typography>
        <Typography
          color="text.primary"
          sx={{ fontWeight: 'bold', fontSize: '3rem', opacity: '80%' }}
        >
          Julian D. Diaz.
        </Typography>
        <Typography
          color="text.primary"
          sx={{ fontWeight: 'bold', fontSize: '2rem', opacity: '60%' }}
        >
          Frontend Software Engineer & Creative Designer
        </Typography>
      </Grid>
      <Grid item md={12} lg={6} component="div" sx={{ mt: 10 }}>
        <TextHighlighter
          hoverHighlightColor="#f5c422"
          highlightTextColor="#cbd5f4"
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            color: '#cbd5f470',
          }}
          highlightText={[
            'user-centric solutions',
            'Creative Technologies',
            'Multimedia Engineering',
          ]}
        >
          I am an accomplished Frontend Engineer with a robust background in web
          and mobile application development, having spearheaded significant
          projects in both B2B and B2C domains. My journey in technology spans
          from conceptualization to deployment, with a steadfast commitment to
          crafting user-centric, streamlined solutions. Holding a Master's in
          Creative Technologies and a Bachelor's in Multimedia Engineering, I
          wield a diverse arsenal of technical and design tools, showcasing a
          versatile skill set that resonates across the tech industry.
        </TextHighlighter>
        <Typography
          sx={{
            mt: 2,
            fontWeight: 'bold',
            fontSize: '1rem',
            color: '#cbd5f470',
          }}
        >
          Outside of coding, you'll often find me exploring the vibrant streets
          of Berlin on my bike or enjoying downtime with my cat, <ShowCat />.
        </Typography>
      </Grid>
    </Grid>
  )
}

interface Project {
  monthYearRange: string
  title: string
  subTitle: string
  cardLink: string
  description: string
  chips: string[]
  links?: { title: string; url: string }[]
}

const projects: Project[] = [
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
  {
    monthYearRange: 'Jan 2018 - Jul 2019',
    title: 'M.Sc. Creative Technologies',
    subTitle: 'Leeds Beckett University',
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
]

const Experience: React.FC = () => {
  return (
    <>
      <div style={{ height: 50 }} />
      {projects.map((project, index) => (
        <div key={index}>
          <ProjectCard
            monthYearRange={project.monthYearRange}
            title={project.title}
            subTitle={project.subTitle}
            cardLink={project.cardLink}
            description={project.description}
            chips={project.chips}
            links={project.links}
          />
          {index !== projects.length - 1 && <div style={{ height: 20 }} />}
        </div>
      ))}
    </>
  )
}
export default Home
