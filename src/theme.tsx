import { createTheme } from '@mui/material'

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#0a1930',
    },
    secondary: {
      main: '#e5e7eb',
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
