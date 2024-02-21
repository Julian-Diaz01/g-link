import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'

const InteractiveBackground: React.FC = () => {
  const theme = useTheme()
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event: MouseEvent) => {
    setPosition({
      x: event.clientX,
      y: event.clientY,
    })
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.palette.primary.main,
        backgroundImage: `radial-gradient(circle at ${position.x}px ${position.y}px, #65593120 0%, ${theme.palette.primary.main} 30vh)`,
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
      }}
    />
  )
}

export default InteractiveBackground
