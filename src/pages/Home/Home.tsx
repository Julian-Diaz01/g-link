import React from 'react'
import { Box, Typography } from '@mui/material'
import TextHighlighter from '../../components/TextHighlighter.tsx'

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        mr: 10,
        ml: 10,
      }}
    >
      <Typography color="secondary" sx={{ fontFamily: 'monospace' }}>
        Hi, my name is
      </Typography>
      <Typography
        color="text.primary"
        sx={{ fontWeight: 'bold', fontSize: '3rem', opacity: '80%' }}
      >
        Julian D. Diaz.
      </Typography>
      <Typography
        color="text.primary"
        sx={{ fontWeight: 'bold', fontSize: '2rem', opacity: '60%' }}
      >
        Frontend Software Engineer & Creative Designer
      </Typography>
      <TextHighlighter
        highlightTextColor="#f5c422"
        sx={{
          fontWeight: 'bold',
          fontSize: '1rem',
          color: '#cbd5f470',
          maxWidth: '700px',
        }}
        highlightText={[
          'user-centric solutions',
          'Creative Technologies',
          'Multimedia Engineering',
        ]}
      >
        I'm an experienced Frontend Engineer skilled in web and mobile app
        development. I've led impactful projects for both B2B and B2C
        applications, focusing on user-centric solutions. With a Master's in
        Creative Technologies and a Bachelor's in Multimedia Engineering, I
        bring a versatile skill set to the tech industry, adept in various
        technical and design tools.
      </TextHighlighter>
    </Box>
  )
}

export default Home
