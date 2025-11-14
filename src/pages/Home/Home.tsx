import React, { Suspense } from 'react'
import { Box, Grid, useMediaQuery } from '@mui/material'
import theme from '../../theme.tsx'
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
  return (
    <>
      <Grid container sx={{ mt: 10 }}>
        <Grid item md={12} lg={5}>
          <Box
            sx={{
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
                <Box component="footer" sx={{ py: 6 }} marginTop={5}>
                  <Suspense fallback={<FooterSkeleton />}>
                    <Footer />
                  </Suspense>
                </Box>
              </>
            ) : null}
          </Box>
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
          <Box sx={{ mt: 10 }}>
            <div id="#experidence" />
          </Box>
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
