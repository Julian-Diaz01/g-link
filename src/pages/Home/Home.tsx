import React from 'react'
import { Box, Grid, useMediaQuery } from '@mui/material'
import theme from '../../theme.tsx'
import Introduction from './Introduction.tsx'
import Description from './Description.tsx'
import Experience from './Experience.tsx'
import HomeMenu from './HomeMenu.tsx'
import Footer from '../Wireframe/Footer.tsx'

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
            <Introduction />
            {!isMobile ? (
              <>
                <HomeMenu />
                <Box component="footer" sx={{ py: 6 }} marginTop={5}>
                  <Footer />
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
          <Description />
          <Box sx={{ mt: 10 }}>
            <div id="#experidence" />
          </Box>
          <Experience />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
