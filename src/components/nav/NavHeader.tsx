import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Box } from '@mui/material'
import theme from '../../theme.tsx'

const Header: React.FC = () => {
  const [value, setValue] = useState('h')
  const navigate = useNavigate()

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    // Navigate based on tab value
    switch (newValue) {
      case 'h':
        navigate('/')
        break
      case 'r':
        navigate('/register')
        break
      case 'l':
        navigate('/login')
        break
      default:
        break
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Navigation Tabs"
            sx={tabStyles.tab}
          >
            {' '}
            <Tab value="h" label="Home" component={Link} to="/" />
            <Tab value="r" label="Register" component={Link} to="/register" />
            <Tab
              value="l"
              label="Login"
              component={Link}
              to="/login"
              style={{ color: 'secondary' }}
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

const tabStyles = {
  tab: {
    '& .MuiTab-root': {
      color: theme.palette.secondary.main,
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