import React from 'react'
import Button from '@mui/material/Button'

interface OpenPdfButtonProps {
  pdfUrl: string
}

const OpenPdfButton: React.FC<OpenPdfButtonProps> = ({ pdfUrl }) => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      sx={{ fontFamily: 'monospace', ml: 3 }}
      onClick={() => window.open(pdfUrl, '_blank')}
    >
      Resume
    </Button>
  )
}

export default OpenPdfButton
