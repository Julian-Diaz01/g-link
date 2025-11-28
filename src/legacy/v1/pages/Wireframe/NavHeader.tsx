import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Tabs from '@mui/material/Tabs'
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import IconJ from '../../../../assets/IconJ.tsx'
import OpenPdfButton from '../../components/OpenPdfButton.tsx'

const Header: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [value, setValue] = useState('home')
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const navigate = useNavigate()

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    switch (newValue) {
      case 'home':
        navigate('/home')
        break
      case 'projects':
        navigate('/home/projects')
        break
      default:
        break
    }
  }

  const toggleMobileDrawer = (open: boolean) => () => {
    setIsMobileDrawerOpen(open)
  }

  return (
    <div style={{ flexGrow: 1 }} id="#home">
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <HexagonJLink />
          {isMobile ? (
            <MobileMenuIcon toggleMobileDrawer={toggleMobileDrawer} />
          ) : (
            <DesktopTabs value={value} handleChange={handleChange} />
          )}
          <MobileDrawer
            isMobileDrawerOpen={isMobileDrawerOpen}
            toggleMobileDrawer={toggleMobileDrawer}
          />
        </Toolbar>
      </AppBar>
    </div>
  )
}

const HexagonJLink: React.FC = () => (
  <div>
    <Link to="/home">
      <IconJ borderColor="secondary" borderThickness={3} />
    </Link>
  </div>
)

const MobileMenuIcon: React.FC<{
  toggleMobileDrawer: (open: boolean) => () => void
}> = ({ toggleMobileDrawer }) => (
  <IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={toggleMobileDrawer(true)}
    sx={{ display: { lg: 'none' } }}
  >
    <MenuIcon sx={{ fontSize: '2rem' }} />
  </IconButton>
)

const MobileDrawer: React.FC<{
  isMobileDrawerOpen: boolean
  toggleMobileDrawer: (open: boolean) => () => void
}> = ({ isMobileDrawerOpen, toggleMobileDrawer }) => {
  const theme = useTheme()
  return (
    <Drawer
      anchor="right"
      open={isMobileDrawerOpen}
      onClose={toggleMobileDrawer(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: '250px',
          backgroundColor: theme.palette.primary.main,
        },
      }}
    >
      <MobileDrawerList toggleMobileDrawer={toggleMobileDrawer} />
    </Drawer>
  )
}

const MobileDrawerList: React.FC<{
  toggleMobileDrawer: (open: boolean) => () => void
}> = ({ toggleMobileDrawer }) => {
  const navigate = useNavigate()
  const navigateAndCloseDrawer = (route: string) => () => {
    navigate(route)
    toggleMobileDrawer(false)()
  }

  const openResumeInNewTab = () => {
    window.open('julian_diaz_cv.pdf', '_blank')
    toggleMobileDrawer(false)()
  }

  return (
    <List sx={{ width: '100%', padding: '16px' }}>
      <ListItemButton onClick={navigateAndCloseDrawer('/home')}>
        <ListItemText>
          <Typography variant="h5">About</Typography>
        </ListItemText>
      </ListItemButton>
      <ListItemButton onClick={navigateAndCloseDrawer('/home/projects')}>
        <ListItemText>
          <Typography variant="h5">Projects</Typography>
        </ListItemText>
      </ListItemButton>
      <ListItemButton onClick={openResumeInNewTab}>
        <ListItemText>
          <Typography variant="h5">Resume</Typography>
        </ListItemText>
      </ListItemButton>
      <ListItemButton onClick={navigateAndCloseDrawer('/')}>
        <ListItemText>
          <Typography variant="h5">v2</Typography>
        </ListItemText>
      </ListItemButton>
    </List>
  )
}

const DesktopTabs: React.FC<{
  value: string
  handleChange: (event: React.SyntheticEvent, newValue: string) => void
}> = ({ value, handleChange }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="Navigation Tabs"
      sx={{
        color: theme.palette.secondary.main,
        minHeight: 30,
        '& .MuiButtonBase-root': {
          minHeight: 30,
          minWidth: 0,
        },
        '& .MuiTabs-indicator': {
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: theme.palette.text.primary,
          color: theme.palette.text.primary + '!important',
        },
        '& .MuiTab-root': {
          color: theme.palette.text.primary + '!important',
        },
        '& .Mui-selected': {
          fontWeight: 'bold',
          color: theme.palette.text.primary,
        },
        '& .MuiTab-textColorInherit.Mui-selected': {
          color: theme.palette.text.primary,
        },
      }}
    >
      {/*  <Tab disableRipple value="home" label="About" component={Link} to="/home" />
      <Tab
        disableRipple
        value="projects"
        label="Projects"
        component={Link}
        to="/home/projects"
      />*/}
      <OpenPdfButton pdfUrl="julian_diaz_cv.pdf" />
      <Box
        component="a"
        onClick={() => navigate('/')}
        sx={{
          cursor: 'pointer',
          color: theme.palette.text.primary,
          padding: '6px 16px',
          fontSize: '0.875rem',
          fontWeight: 500,
          textTransform: 'uppercase',
          '&:hover': {
            color: theme.palette.secondary.main,
          },
        }}
      >
        v2
      </Box>
    </Tabs>
  )
}

export default Header
