import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import HandshakeIcon from '@mui/icons-material/Handshake'
enum HubStageEnum {
  PILOT = 'PILOT',
  FULLY_ONBOARDED = 'FULLY_ONBOARDED',
}

interface HubStageProps {
  stage: HubStageEnum | undefined
}

const HubStage: React.FC<HubStageProps> = ({ stage }) => {
  const getIconAndTooltip = () => {
    switch (stage) {
      case HubStageEnum.PILOT:
        return {
          icon: <RocketLaunchIcon color="primary" />,
          tooltip: 'Pilot Stage',
        }
      case HubStageEnum.FULLY_ONBOARDED:
        return {
          icon: <HandshakeIcon color="primary" />,
          tooltip: 'Fully Onboarded',
        }
      default:
        return {
          icon: <QuestionMarkIcon color="primary" />,
          tooltip: 'Unknown Stage',
        }
    }
  }

  const { icon, tooltip } = getIconAndTooltip()

  return (
    <Tooltip title={tooltip}>
      <div style={{ display: 'flex', alignItems: 'center' }}>{icon}</div>
    </Tooltip>
  )
}

export { HubStage, HubStageEnum }
