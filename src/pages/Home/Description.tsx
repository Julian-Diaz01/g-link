import React from 'react'
import { Box, Typography } from '@mui/material'
import TextHighlighter from '../../components/TextHighlighter.tsx'
import ShowCat from '../../components/ShowCat.tsx'

const Description: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'flex-start',
      }}
    >
      <TextHighlighter
        hoverHighlightColor="#f5c422"
        highlightTextColor="#cbd5f4"
        sx={{
          fontSize: '1rem',
          color: '#cbd5f470',
        }}
        highlightText={[
          'user-centric solutions',
          'Creative Technologies',
          'Multimedia Engineering',
        ]}
      >
        I’m a Software Developer with a strong background in building web and
        mobile applications, experienced in both B2B and B2C projects. My work
        spans the full development cycle — from concept to deployment — with a
        focus on creating simple, user-centered solutions that are technically
        sound and visually clear. I hold a Master’s in Creative Technologies and
        a Bachelor’s in Multimedia Engineering, which gives me a unique mix of
        technical depth and design thinking. This combination allows me to
        bridge the gap between functionality and user experience, and to adapt
        quickly across different stages of a product’s development.
      </TextHighlighter>
      <Box sx={{ height: 30 }} />
      <Typography
        component="span"
        sx={{
          mt: 2,
          fontSize: '1rem',
          color: '#cbd5f470',
        }}
      >
        Outside of coding, you'll often find me exploring the vibrant streets of
        Berlin on my bike or enjoying downtime with my cat, <ShowCat />.
      </Typography>
    </Box>
  )
}
export default Description
