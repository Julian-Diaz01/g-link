import React from 'react'
import { Typography } from '@mui/material'

const Introduction: React.FC = () => {
  return (
    <>
      <Typography color="secondary" sx={{ fontFamily: 'monospace' }}>
        Hi, my name is
      </Typography>
      <Typography
        color="text.primary"
        sx={{ fontWeight: 'bold', fontSize: '3rem', opacity: '80%' }}
      >
        Julian D. Diaz
      </Typography>
      <Typography
        color="text.primary"
        sx={{ fontSize: '1.5rem', opacity: '60%' }}
      >
        Frontend Software Engineer
      </Typography>
      <Typography
        color="text.primary"
        sx={{ fontSize: '1.5rem', opacity: '60%' }}
      >
        & Creative Designer
      </Typography>
    </>
  )
}
export default Introduction
