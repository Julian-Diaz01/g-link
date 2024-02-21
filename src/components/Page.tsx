import React from 'react'
import { Box, Container } from '@mui/material'
import Footer from './Footer.tsx'
import { Outlet } from 'react-router-dom'
import Header from './nav/NavHeader.tsx'

const Layout: React.FC = () => {
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
        }}
      >
        <Outlet />
      </Container>
      <Box component="footer" sx={{ py: 6 }} marginTop={5}>
        <Footer />
      </Box>
    </Box>
  )
}

export default Layout
