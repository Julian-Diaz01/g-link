import React, { useState } from 'react'
import Theme from '../theme.tsx'
import { motion } from 'framer-motion'

interface HexagonJProps {
  borderColor?: string
  textColor?: string
  borderThickness?: number
  hoverColor?: string
}

const IconJ: React.FC<HexagonJProps> = ({
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

  const jIcon = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
    },
  }

  const circle = {
    hidden: {
      opacity: 1,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      stroke: textColor,
    },
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
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="item"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          strokeWidth="3"
          initial="hidden"
          animate="visible"
          stroke={textColor}
          fill={isHovered ? textColor : 'none'}
          variants={circle}
          transition={{
            default: { duration: 2.5, ease: 'easeInOut' },
            fill: { duration: 2.5, ease: [1, 0, 0.8, 1] },
          }}
        />
        <motion.path
          scale={1.5}
          cx="50"
          cy="50"
          d="M 52 31 C 52 30.44772 52.4477 30 53 30 H 59 C 59.5523 30 60 30.44772 60 31 V 58 C 60 59.9022 59.3046 62.389 57.5726 64.4154 C 55.8118 66.4756 53.0292 68 49 68 C 44.9406 68 42.1489 66.2522 40.4116 64.1152 C 38.7109 62.0234 38 59.5528 38 58 C 38 57.4477 38.4477 57 39 57 C 39.5523 57 40 57.4477 40 58 C 40 59.0722 40.5391 61.1016 41.9634 62.8536 C 43.3511 64.5604 45.5742 66 49 66 C 52.4708 66 54.6882 64.7118 56.0524 63.116 C 57.4454 61.486 58 59.4728 58 58 V 32 H 53 C 52.4477 32 52 31.55228 52 31 Z"
          fill="none"
          strokeWidth={borderThickness}
          stroke={isHovered ? hoverColor : textColor}
          initial="hidden"
          animate="visible"
          variants={jIcon}
          transition={{
            default: { duration: 2, ease: 'easeInOut' },
          }}
        />
      </motion.svg>
      <style>{`
        .hexagon { stroke: ${borderColor}; stroke-width: ${borderThickness}px; fill: ${isHovered ? textColor : 'none'}; }
        .letter { fill: ${isHovered ? hoverColor : textColor}; font-size: 40px; font-family: Arial; }
      `}</style>
    </svg>
  )
}

export default IconJ
