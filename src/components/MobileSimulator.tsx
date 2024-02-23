import { useState } from 'react'
import { Box, Typography } from '@mui/material'

interface MobileSimulatorProps {
  src: string // URL of the Flutter web app
}

const MobileSimulator: React.FC<MobileSimulatorProps> = ({ src }) => {
  const [hasError, setHasError] = useState<boolean>(false)

  return (
    <Box
      sx={{
        width: 375,
        height: 812,
        border: '16px solid black',
        borderRadius: '36px',
        boxShadow: '0 0 10px #000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {hasError ? (
        <Typography
          variant="body1"
          sx={{
            color: 'error.main',
            textAlign: 'center',
            p: 2,
          }}
        >
          Unable to load the application. Please try again later.
        </Typography>
      ) : (
        <iframe
          src={src}
          title="Mobile Simulator"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '20px',
          }}
          loading="lazy"
          onError={() => setHasError(true)}
        />
      )}
    </Box>
  )
}

export default MobileSimulator
