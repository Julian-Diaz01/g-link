import { createTheme } from '@mui/material'

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#75b0f7',
    },
    secondary: {
      main: '#080a21',
    },
    error: {
      main: '#c74a4a',
    },
    success: {
      main: '#52c74a',
    },
  },
})

export default theme
