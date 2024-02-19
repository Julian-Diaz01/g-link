import { createTheme } from '@mui/material'

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#0a1930',
    },
    secondary: {
      main: '#f5c422',
    },
    text: {
      primary: '#cbd5f4',
      secondary: '#0a1930',
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
