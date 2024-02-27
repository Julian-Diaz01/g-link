import React, { useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'

const ShowCat: React.FC = () => {
  const [showGif, setShowGif] = useState(false)
  const theme = useTheme()

  const handleMouseEnter = () => {
    setShowGif(true)
  }

  const handleMouseLeave = () => {
    setShowGif(false)
  }

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'relative',
        display: 'inline-block',
        transition: 'color 0.3s',
      }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
          color: showGif
            ? theme.palette.secondary.main
            : theme.palette.text.primary,
          '&:hover': {
            color: theme.palette.secondary.main,
          },
        }}
      >
        Mango 🥭
      </Typography>
      {showGif && (
        <Box
          sx={{
            position: 'absolute',
            top: '-7em',
            zIndex: 9999,
          }}
        >
          <img
            src="/cat.gif"
            alt="Mango Gif"
            style={{ width: '10wv', height: '100px' }}
          />
        </Box>
      )}
    </Box>
  )
}

export default ShowCat
