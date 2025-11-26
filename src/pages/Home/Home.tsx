import React, { Suspense } from 'react'
import { Grid, useMediaQuery } from '@mui/material'
import theme from '../../theme.tsx'
import SEO from '../../components/SEO'
import {
  IntroductionSkeleton,
  DescriptionSkeleton,
  ExperienceSkeleton,
  EducationSkeleton,
  LanguagesSkeleton,
  FooterSkeleton,
} from './skeletons'
import HomeMenu from './HomeMenu.tsx'

// Lazy load components for code splitting
const Introduction = React.lazy(() => import('./Introduction.tsx'))
const Description = React.lazy(() => import('./Description.tsx'))
const Experience = React.lazy(() => import('./Experience.tsx'))
const Education = React.lazy(() => import('./Education.tsx'))
const Languages = React.lazy(() => import('./Languages.tsx'))
const Footer = React.lazy(() => import('../Wireframe/Footer.tsx'))

const Home: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  const breadcrumbs = [
    { name: 'Home', url: 'https://juliandiaz.web.app/' },
    { name: 'About', url: 'https://juliandiaz.web.app/home' },
  ]

  return (
    <>
      <SEO
        title="Julian Diaz - Software Developer | Home"
        description="Explore Julian Diaz's professional journey as a Software Developer. View experience, education, and technical skills in React, TypeScript, Next.js, and modern web development."
        ogUrl="https://juliandiaz.web.app/home"
        canonicalUrl="https://juliandiaz.web.app/home"
        breadcrumbs={breadcrumbs}
      />
      <Grid container sx={{ mt: 10 }}>
        <Grid item md={12} lg={5}>
          <div
            style={{
              width: isMobile ? '100%' : '30.666%',
              position: isMobile ? 'inherit' : 'fixed',
            }}
          >
            <Suspense fallback={<IntroductionSkeleton />}>
              <Introduction />
            </Suspense>
            {!isMobile ? (
              <>
                <HomeMenu />
                <footer
                  style={{
                    paddingTop: '48px',
                    paddingBottom: '48px',
                    marginTop: '40px',
                  }}
                >
                  <Suspense fallback={<FooterSkeleton />}>
                    <Footer />
                  </Suspense>
                </footer>
              </>
            ) : null}
          </div>
        </Grid>
        <Grid
          item
          md={12}
          lg={7}
          sx={{ mt: isMobile ? 1 : 0, pl: isMobile ? 0 : 4 }}
        >
          <Suspense fallback={<DescriptionSkeleton />}>
            <Description />
          </Suspense>
          <div style={{ marginTop: '80px' }}>
            <div id="#experidence" />
          </div>
          <Suspense fallback={<ExperienceSkeleton />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<EducationSkeleton />}>
            <Education />
          </Suspense>
          <Suspense fallback={<LanguagesSkeleton />}>
            <Languages />
          </Suspense>
        </Grid>
      </Grid>
    </>
  )
}

export default Home
