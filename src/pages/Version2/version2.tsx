import React, { Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { Profile, Job, Education, Service } from './types'
import SEO from '../../components/SEO'

// Lazy load components for code splitting
const Navigation = React.lazy(() => import('./components/Navigation'))
const Hero = React.lazy(() => import('./components/Hero'))
const Services = React.lazy(() => import('./components/Services'))
const Experience = React.lazy(() => import('./components/Experience'))
const EducationSection = React.lazy(() => import('./components/Education'))
const Contact = React.lazy(() => import('./components/Contact'))
const ContactPopup = React.lazy(() => import('./components/ContactPopup'))

// Import JSON data
import profileData from './data/profile.json'
import servicesData from './data/services.json'
import jobsData from '../../data/jobs.json'
import educationData from '../../data/education.json'

const PortfolioDesign: React.FC = () => {
  // Type assertions for JSON imports
  const profile = profileData as Profile
  const services = servicesData as Service[]
  const jobs = jobsData as Job[]
  const education = educationData as Education[]

  return (
    <ThemeProvider>
      <SEO
        title={`${profile.firstName} ${profile.lastName} - ${profile.title}`}
        description={profile.bio}
        keywords="Software Developer, Web Developer, React, TypeScript, JavaScript, Berlin, Full Stack Developer, Frontend Developer, Julian Diaz"
        author={`${profile.firstName} ${profile.lastName}`}
        ogUrl={profile.website}
        canonicalUrl={profile.website}
      />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-lg">Loading components...</div>
            </div>
          }
        >
          <Navigation profile={profile} />
          <Hero profile={profile} />
          <Services services={services} />
          <Experience jobs={jobs} />
          <EducationSection education={education} />
          <Contact profile={profile} />
          <ContactPopup />
        </Suspense>
      </div>
    </ThemeProvider>
  )
}

export default PortfolioDesign
