import React, { useState } from 'react'
import Theme from '../theme.tsx'

interface HexagonJProps {
  borderColor?: string
  textColor?: string
  borderThickness?: number
  hoverColor?: string // New prop for hover color
}

const HexagonJ: React.FC<HexagonJProps> = ({
  borderColor = Theme.palette.secondary.main,
  textColor = Theme.palette.secondary.main,
  borderThickness = 2,
  hoverColor = Theme.palette.primary.main,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <svg
      width="50"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`
        .hexagon { stroke: ${borderColor}; stroke-width: ${borderThickness}px; fill: ${isHovered ? textColor : 'none'}; }
        .letter { fill: ${isHovered ? hoverColor : textColor}; font-size: 40px; font-family: Arial; }
      `}</style>
      <polygon
        points="50,10 90,25 90,75 50,90 10,75 10,25"
        stroke="#f5c422"
        className="hexagon"
        fill="none"
        strokeWidth="3"
      />
      <text
        x="49%"
        y="55%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="letter"
        fontSize="50"
        fontFamily="Arial"
      >
        J
      </text>
    </svg>
  )
}

export default HexagonJ
