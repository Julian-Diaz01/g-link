// components/NotFoundPage.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import theme from '../theme.tsx'

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Oops! You're lost in space.</h1>
      <p>
        The page you're looking for is not here. Maybe it was swallowed by a
        black hole.
      </p>
      <p>
        Don't panic, you can always{' '}
        <Link
          to="/"
          style={{
            color: theme.palette.secondary.main,
            textDecoration: 'none',
          }}
        >
          return to Earth
        </Link>{' '}
        or{' '}
        <Link
          to="/search"
          style={{
            color: theme.palette.secondary.main,
            textDecoration: 'none',
          }}
        >
          search for another galaxy
        </Link>
        .
      </p>
      <div
        style={{
          position: 'relative',
          width: '66vw',
          height: '30vh',
          overflow: 'hidden',
          margin: 'auto',
        }}
      >
        <img
          src="public/not_found.jpeg"
          alt=" "
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            mixBlendMode: 'lighten',
          }}
        />
      </div>
    </div>
  )
}

export default NotFoundPage
