import React from 'react'
import { Box, Link, useMediaQuery, useTheme } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'

const Footer: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      component="footer"
      sx={{
        maxWidth: '1200px',
        margin: 'auto',
        color: `${theme.palette.secondary.main}`,
        py: 2,
        mt: 'auto',
        display: 'flex',
        justifyContent: isMobile ? 'space-around' : 'flex-start',
      }}
    >
      <FooterLink href="https://github.com/Julian-Diaz01">
        <GitHubIcon sx={{ fontSize: isMobile ? '2rem' : undefined }} />
      </FooterLink>
      <FooterLink href="https://www.linkedin.com/in/julian-ddiaz/">
        <LinkedInIcon sx={{ fontSize: isMobile ? '2rem' : undefined }} />
      </FooterLink>
      <FooterLink href="mailto:judadi1994@gmail.com">
        <EmailIcon sx={{ fontSize: isMobile ? '2rem' : undefined }} />
      </FooterLink>
    </Box>
  )
}

interface FooterLinkProps {
  href: string
  children: React.ReactNode
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      color="inherit"
      sx={{ m: 1 }}
    >
      {children}
    </Link>
  )
}

export default Footer
