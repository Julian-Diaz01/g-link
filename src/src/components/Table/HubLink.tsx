// HubLink.tsx
import React from 'react'
import { Link } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface HubLinkProps {
  displayName: string
}

const HubLink: React.FC<HubLinkProps> = ({ displayName }) => (
  <Link
    href={`https://test.cleanhub.com/hub/${encodeURIComponent(displayName.replace(/ /g, '_').toLowerCase())}`}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      display: 'flex',
      alignItems: 'center',
      borderRadius: 16,
      padding: '8px 16px',
    }}
  >
    <ArrowForwardIosIcon />
  </Link>
)

export default HubLink
