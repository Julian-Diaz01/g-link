import React, { Suspense } from 'react'

// Lazy load component for code splitting
const LocalJobChat = React.lazy(() => import('../../components/LocalJobChat'))

const Projects: React.FC = () => {
  return (
    <div>
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
