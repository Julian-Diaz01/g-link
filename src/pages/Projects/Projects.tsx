import React, { Suspense } from 'react'
import SEO from '../../components/SEO'

// Lazy load component for code splitting
const LocalJobChat = React.lazy(() => import('../../components/LocalJobChat'))

const Projects: React.FC = () => {
  return (
    <div>
      <SEO
        title="Julian Diaz - Projects & Portfolio"
        description="Explore Julian Diaz's software development projects including LocalJobChat and other innovative web applications."
        keywords="Projects, Portfolio, Software Development, Web Applications, React Projects, TypeScript Projects, LocalJobChat"
        ogUrl="https://juliandiaz.web.app/home/projects"
        canonicalUrl="https://juliandiaz.web.app/home/projects"
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
