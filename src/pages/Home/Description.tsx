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
        I am an accomplished Frontend Engineer with a robust background in web
        and mobile application development, having spearheaded significant
        projects in both B2B and B2C domains. My journey in technology spans
        from conceptualization to deployment, with a steadfast commitment to
        crafting user-centric, streamlined solutions. Holding a Master's in
        Creative Technologies and a Bachelor's in Multimedia Engineering, I
        wield a diverse arsenal of technical and design tools, showcasing a
        versatile skill set that resonates across the tech industry.
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
