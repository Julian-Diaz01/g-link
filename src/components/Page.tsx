import React from 'react'
import { Container, Box } from '@mui/material'
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
      }}
    >
      <Header />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
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
