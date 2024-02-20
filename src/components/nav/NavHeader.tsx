import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HexagonJ from '../../assets/HexagonJ'
import OpenPdfButton from '../OpenPdfButton'
import theme from '../../theme.tsx'

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
        navigate('/')
        break
      case 'projects':
        navigate('/projects')
        break
      default:
        break
    }
  }

  const toggleMobileDrawer = (open: boolean) => () => {
    setIsMobileDrawerOpen(open)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
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
    </Box>
  )
}

const HexagonJLink: React.FC = () => (
  <Box sx={{ mr: 2, ml: 10 }}>
    <Link to="/">
      <HexagonJ borderColor="secondary" borderThickness={3} />
    </Link>
  </Box>
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
    <MenuIcon />
  </IconButton>
)

const MobileDrawer: React.FC<{
  isMobileDrawerOpen: boolean
  toggleMobileDrawer: (open: boolean) => () => void
}> = ({ isMobileDrawerOpen, toggleMobileDrawer }) => (
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

const MobileDrawerList: React.FC<{
  toggleMobileDrawer: (open: boolean) => () => void
}> = ({ toggleMobileDrawer }) => {
  const navigate = useNavigate()
  const navigateAndCloseDrawer = (route: string) => () => {
    navigate(route)
    toggleMobileDrawer(false)()
  }

  const openResumeInNewTab = () => {
    window.open('public/CV.pdf', '_blank')
    toggleMobileDrawer(false)()
  }

  return (
    <List>
      <ListItemButton onClick={navigateAndCloseDrawer('/')}>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton onClick={navigateAndCloseDrawer('/projects')}>
        <ListItemText primary="Projects" />
      </ListItemButton>
      <ListItemButton onClick={openResumeInNewTab}>
        <ListItemText primary="Resume" />
      </ListItemButton>
    </List>
  )
}

const DesktopTabs: React.FC<{
  value: string
  handleChange: (event: React.SyntheticEvent, newValue: string) => void
}> = ({ value, handleChange }) => {
  const theme = useTheme()
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="Navigation Tabs"
      sx={{
        mr: 10,
        ...tabStyles.tab,
        color: theme.palette.secondary.main,
      }}
    >
      <Tab disableRipple value="home" label="Home" component={Link} to="/" />
      <Tab
        disableRipple
        value="projects"
        label="Projects"
        component={Link}
        to="/projects"
      />
      <OpenPdfButton pdfUrl="src/assets/CV.pdf" />
    </Tabs>
  )
}

const tabStyles = {
  tab: {
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: theme.palette.secondary.main + '00',
      color: theme.palette.secondary.main + '!important',
    },
    '& .MuiTab-root': {
      fontFamily: 'monospace',
      color: theme.palette.secondary.main + '!important',
    },
    '& .Mui-selected': {
      fontWeight: 'bold',
      color: theme.palette.secondary.main,
    },
    '& .MuiTab-textColorInherit.Mui-selected': {
      color: theme.palette.secondary.main,
    },
  },
}

export default Header
