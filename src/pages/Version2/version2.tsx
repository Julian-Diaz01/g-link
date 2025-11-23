import React, { Suspense, useMemo } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { Profile, Job, Education, Service } from './types'
import SEO from '../../components/SEO'
import {
  generateComprehensiveProfileSchema,
  generateWorkExperienceSchema,
  generateEducationSchema,
  generateFAQSchema,
} from '../../utils/seoStructuredData'

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

  // Generate structured data for AI search engines
  const structuredData = useMemo(() => {
    // FAQ data for better AI understanding
    const faqs = [
      {
        question: 'Who is Julian Diaz?',
        answer: `Julian Diaz is a Software Developer based in Berlin, Germany with ${profile.yearsOfExperience}+ years of experience in web development, specializing in React, TypeScript, Next.js, and modern web technologies.`,
      },
      {
        question: 'What technologies does Julian Diaz work with?',
        answer:
          'Julian has expertise in React, TypeScript, JavaScript, Next.js, Node.js, Express, Flutter, React Native, Firebase, MongoDB, Tailwind CSS, and various modern web development tools and frameworks.',
      },
      {
        question: 'Where is Julian Diaz located?',
        answer: `Julian is based in ${profile.location} and is available for remote work opportunities globally.`,
      },
      {
        question: 'What kind of projects has Julian worked on?',
        answer:
          'Julian has worked on diverse projects including fleet management platforms for 5000+ vehicles at ZF Group, mobile-first progressive web apps for real-time learning, educational technology solutions, and B2C automotive sales applications.',
      },
      {
        question: 'How can I contact Julian Diaz?',
        answer: `You can reach Julian via on LinkedIn or GitHub.`,
      },
    ]

    return {
      '@context': 'https://schema.org',
      '@graph': [
        // Main Profile Schema
        generateComprehensiveProfileSchema(jobs, education),

        // Work Experience Schema
        ...generateWorkExperienceSchema(jobs),

        // Education Schema
        ...generateEducationSchema(education),

        // FAQ Schema
        generateFAQSchema(faqs),

        // Portfolio Schema
        {
          '@type': 'ItemList',
          name: 'Professional Experience',
          itemListElement: jobs.map((job, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Organization',
              name: job.subTitle,
              url: job.cardLink,
            },
          })),
        },
      ],
    }
  }, [profile, jobs, education])

  const breadcrumbs = [
    { name: 'Home', url: 'https://juliandiaz.web.app/' },
    { name: 'Portfolio', url: 'https://juliandiaz.web.app/' },
  ]

  return (
    <ThemeProvider>
      <SEO
        title={`${profile.firstName} ${profile.lastName} - ${profile.title}`}
        description={profile.bio}
        keywords="Software Developer, Web Developer, React, TypeScript, JavaScript, Berlin, Full Stack Developer, Frontend Developer, Julian Diaz, Next.js, Node.js, Mobile Development"
        author={`${profile.firstName} ${profile.lastName}`}
        ogUrl={profile.website}
        canonicalUrl={profile.website}
        structuredData={structuredData}
        breadcrumbs={breadcrumbs}
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
