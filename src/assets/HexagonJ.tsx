import React from 'react'

interface HexagonJProps {
  borderColor?: string
  textColor?: string
  borderThickness?: number
}

const HexagonJ: React.FC<HexagonJProps> = ({
  borderColor = 'black',
  textColor = 'black',
  borderThickness = 2,
}) => {
  return (
    <svg
      width="50"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        .hexagon { stroke: ${borderColor}; stroke-width: ${borderThickness}px; fill: none; }
        .letter { fill: ${textColor}; font-size: 40px; font-family: Arial; }
      `}</style>
      <polygon
        points="50,10 90,25 90,75 50,90 10,75 10,25"
        stroke="#f5c422"
        className="hexagon"
        fill="none"
        stroke-width="3"
      />
      <text
        x="49%"
        y="55%"
        dominant-baseline="middle"
        text-anchor="middle"
        className="letter"
        fill="#f5c422"
        font-size="50"
        font-family="Arial"
      >
        J
      </text>
    </svg>
  )
}

export default HexagonJ
