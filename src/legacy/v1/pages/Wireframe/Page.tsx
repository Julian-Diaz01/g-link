import React from 'react'
import { Container, useMediaQuery, useTheme } from '@mui/material'
import Footer from './Footer.tsx'
import { Outlet } from 'react-router-dom'
import Header from './NavHeader.tsx'

const Layout: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        marginRight: '10vw',
        marginLeft: '10vw',
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
        <footer
          style={{
            paddingTop: '48px',
            paddingBottom: '48px',
            marginTop: '40px',
          }}
        >
          <Footer />
        </footer>
      ) : null}
    </div>
  )
}

export default Layout
