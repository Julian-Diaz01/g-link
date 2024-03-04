import React from 'react'
import { Box, Container, useMediaQuery } from '@mui/material'
import Footer from './Footer.tsx'
import { Outlet } from 'react-router-dom'
import Header from './NavHeader.tsx'
import theme from '../../theme.tsx'

const Layout: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        mr: '10vw',
        ml: '10vw',
      }}
    >
      <Header />
      <Container
        component="main"
        sx={{
          maxWidth: 'none !important',
          flexGrow: 1,
          overflow: 'auto',
          padding: 0,
          overflowX: 'hidden',
        }}
      >
        <Outlet />
      </Container>
      {isMobile ? (
        <Box component="footer" sx={{ py: 6 }} marginTop={5}>
          <Footer />
        </Box>
      ) : null}
    </Box>
  )
}

export default Layout
