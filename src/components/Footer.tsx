import React from 'react'
import { Box, Link } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import theme from '../theme.tsx'

const Footer: React.FC = () => {
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
        justifyContent: 'flex-end',
        mr: 10,
        ml: 10,
      }}
    >
      <Box>
        <FooterLink href="https://github.com/Julian-Diaz01">
          <GitHubIcon />
        </FooterLink>
        <FooterLink href="https://www.linkedin.com/in/julian-ddiaz/">
          <LinkedInIcon />
        </FooterLink>
        <FooterLink href="mailto:judadi1994@gmail.com">
          <EmailIcon />
        </FooterLink>
      </Box>
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
