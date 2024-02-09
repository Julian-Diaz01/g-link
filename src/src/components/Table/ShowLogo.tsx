// ShowLogo.tsx
import React from 'react'
import { Avatar } from '@mui/material'

interface ShowLogoProps {
  logo?: {
    directLink?: string
  }
  name?: string
}

const ShowLogo: React.FC<ShowLogoProps> = ({ logo, name }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50px',
        width: '50px',
      }}
    >
      {logo && logo.directLink ? (
        <img
          src={logo.directLink}
          alt="Logo"
          style={{ height: '100%', width: 'auto', mixBlendMode: 'multiply' }}
        />
      ) : (
        <Avatar
          alt={name}
          sx={{
            height: '50px',
            width: '50px',
            color: 'black',
            backgroundColor: '#6caeff40',
          }}
        >
          {name != null ? name[0] : ''}
        </Avatar>
      )}
    </div>
  )
}

export default ShowLogo
