import React from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import Tooltip from '@mui/material/Tooltip'

interface PlasticProgressProps {
  recoveredQuantity?: number
  unassignedQuantityTotal?: number
}

const PlasticProgress: React.FC<PlasticProgressProps> = ({
  recoveredQuantity = 0,
  unassignedQuantityTotal = 0,
}) => {
  const totalPlastic = recoveredQuantity + unassignedQuantityTotal
  const progress =
    totalPlastic === 0 ? 0 : (recoveredQuantity / totalPlastic) * 100
  const formattedTooltip = `Recovered: ${recoveredQuantity || 0}, Unassigned: ${unassignedQuantityTotal || 0}`

  return (
    <>
      <Tooltip title={formattedTooltip} arrow>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            width: '100%',
            marginTop: 2,
            backgroundColor: totalPlastic >= 0 ? '#c74a4a' : undefined,
          }}
          color={progress === 100 ? 'success' : 'primary'}
        />
      </Tooltip>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 4,
        }}
      >
        <span>{recoveredQuantity.toFixed(0)}</span>
        <span>{unassignedQuantityTotal.toFixed(0)}</span>
      </div>
    </>
  )
}

export default PlasticProgress
