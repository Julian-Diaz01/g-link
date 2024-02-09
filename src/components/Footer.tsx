import React from 'react'
import { Box, Link } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        maxWidth: '1200px',
        margin: 'auto',
        color: 'white',
        py: 2,
        mt: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Link
          href="https://github.com/Julian-Diaz01"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          sx={{ ml: 2, display: 'flex', alignItems: 'center' }}
        >
          <GitHubIcon sx={{ mr: 1 }} />
          https://github.com/Julian-Diaz01
        </Link>
        <Link
          href="https://www.linkedin.com/in/julian-ddiaz/"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          sx={{ ml: 2, display: 'flex', alignItems: 'center' }}
        >
          <LinkedInIcon sx={{ mr: 1 }} />
          https://www.linkedin.com/in/julian-ddiaz/
        </Link>
      </Box>
    </Box>
  )
}

export default Footer
