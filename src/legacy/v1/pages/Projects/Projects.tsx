import React, { Suspense } from 'react'
import SEO from '../../components/SEO'
import { generatePortfolioSchema } from '../../utils/seoStructuredData'

// Lazy load component for code splitting
const LocalJobChat = React.lazy(() => import('../../components/LocalJobChat'))

const Projects: React.FC = () => {
  // Sample project data for structured data
  const projects = [
    {
      name: 'LocalJobChat',
      description:
        'An innovative local job search and chat application built with React and TypeScript, featuring real-time messaging and job discovery.',
      url: 'https://juliandiaz.web.app/home/projects',
      image: 'https://juliandiaz.web.app/og-image.jpg',
      technologies: ['React', 'TypeScript', 'Real-time Chat', 'Job Search'],
      dateCreated: '2024-01-01',
    },
  ]

  const structuredData = generatePortfolioSchema(projects)

  const breadcrumbs = [
    { name: 'Home', url: 'https://juliandiaz.web.app/' },
    { name: 'Projects', url: 'https://juliandiaz.web.app/home/projects' },
  ]

  return (
    <div>
      <SEO
        title="Julian Diaz - Projects & Portfolio"
        description="Explore Julian Diaz's software development projects including LocalJobChat and other innovative web applications built with React, TypeScript, and modern web technologies."
        keywords="Projects, Portfolio, Software Development, Web Applications, React Projects, TypeScript Projects, LocalJobChat, Full Stack Projects"
        ogUrl="https://juliandiaz.web.app/home/projects"
        canonicalUrl="https://juliandiaz.web.app/home/projects"
        structuredData={structuredData}
        breadcrumbs={breadcrumbs}
      />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-lg">Loading Projects...</div>
          </div>
        }
      >
        <LocalJobChat />
      </Suspense>
    </div>
  )
}

export default Projects
