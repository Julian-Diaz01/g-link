import React, { Suspense, useEffect } from 'react'
import { ThemeProvider } from '../context/ThemeContext'
import { Profile, Artifact } from '../types'
import SEO from '../components/SEO'
import { trackMetric } from '../utils/sentry'

import profileData from '../data/profile.json'
import artifactsData from '../data/projectArtifacts.json'

const Navigation = React.lazy(() => import('../components/Navigation'))
const ProjectArtifacts = React.lazy(
  () => import('../components/ProjectArtifacts'),
)

const profile = profileData as Profile
const artifacts = artifactsData as Artifact[]

const ProjectsPage: React.FC = () => {
  useEffect(() => {
    trackMetric('page_load', {
      page: 'projects',
      timestamp: Date.now(),
    })
  }, [])

  return (
    <ThemeProvider>
      <SEO
        title={`Projects & Experiments - ${profile.firstName} ${profile.lastName}`}
        description="Projects, experiments, and build artifacts: diagrams, flows, and live products."
        keywords="Projects, Experiments, Build Artifacts, Web Development, Julian Diaz"
        author={`${profile.firstName} ${profile.lastName}`}
        ogUrl={`${profile.website}projects`}
        canonicalUrl={`${profile.website}projects`}
        breadcrumbs={[
          { name: 'Home', url: profile.website },
          { name: 'Projects & Experiments', url: `${profile.website}projects` },
        ]}
      />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-lg">Loading...</div>
            </div>
          }
        >
          <Navigation profile={profile} />
          <main className="pt-20 sm:pt-24">
            <ProjectArtifacts
              artifacts={artifacts}
              title="Projects & Experiments"
              description="Snapshots of the work: diagrams, flows, and the live product when it is available."
            />
          </main>
        </Suspense>
      </div>
    </ThemeProvider>
  )
}

export default ProjectsPage
