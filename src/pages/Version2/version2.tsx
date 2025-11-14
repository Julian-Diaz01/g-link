import React from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Services from './components/Services'
import Experience from './components/Experience'
import EducationSection from './components/Education'
import Contact from './components/Contact'
import { ThemeProvider } from './context/ThemeContext'
import { Profile, Job, Education, Service } from './types'

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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Navigation profile={profile} />
        <Hero profile={profile} />
        <Services services={services} />
        <Experience jobs={jobs} />
        <EducationSection education={education} />
        <Contact profile={profile} />
      </div>
    </ThemeProvider>
  )
}

export default PortfolioDesign
