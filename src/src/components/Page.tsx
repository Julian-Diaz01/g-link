import React, { ReactNode } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  Paper,
} from '@mui/material'
import Footer from './Footer.tsx'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" position="static">
        <Toolbar>
          <Typography
            variant="h5"
            sx={{ flexGrow: 1, textAlign: 'left', color: 'white' }}
          >
            Ground Plastic Recovery
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              {children}
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Box
        component="footer"
        sx={{ bgcolor: 'secondary.main', py: 6 }}
        marginTop={5}
      >
        <Footer />
      </Box>
    </Box>
  )
}

export default Layout
