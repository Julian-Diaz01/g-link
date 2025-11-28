import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Card, CardContent, Grid } from '@mui/material'
import theme from '../../theme.tsx'

// Skeleton theme configuration matching the app theme
// Using colors that match the background (#0a1930) to prevent flash
// Making skeletons slightly visible but very subtle
const skeletonBaseColor = '#0d1d35' // Slightly lighter than background for visibility
const skeletonHighlightColor = '#122040' // Subtle shimmer effect

// Introduction Skeleton - matches the text structure
export const IntroductionSkeleton: React.FC = () => {
  return (
    <SkeletonTheme
      baseColor={skeletonBaseColor}
      highlightColor={skeletonHighlightColor}
    >
      <Skeleton height={20} width="60%" style={{ marginBottom: 8 }} />
      <Skeleton height={48} width="80%" style={{ marginBottom: 8 }} />
      <Skeleton height={28} width="70%" style={{ marginBottom: 4 }} />
      <Skeleton height={28} width="50%" />
    </SkeletonTheme>
  )
}

// Description Skeleton - matches paragraph structure
export const DescriptionSkeleton: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'flex-start',
      }}
    >
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <SkeletonTheme
          baseColor={skeletonBaseColor}
          highlightColor={skeletonHighlightColor}
        >
          <Skeleton height={20} width="100%" style={{ marginBottom: 8 }} />
          <Skeleton height={20} width="95%" style={{ marginBottom: 8 }} />
          <Skeleton height={20} width="100%" style={{ marginBottom: 8 }} />
          <Skeleton height={20} width="90%" style={{ marginBottom: 8 }} />
          <Skeleton height={20} width="85%" style={{ marginBottom: 8 }} />
          <div style={{ height: '30px' }} />
          <Skeleton height={20} width="100%" style={{ marginBottom: 8 }} />
          <Skeleton height={20} width="70%" />
        </SkeletonTheme>
      </div>
    </div>
  )
}

// ProjectCard Skeleton - matches the card structure
const ProjectCardSkeleton: React.FC = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: theme.palette.background.paper + '10',
        display: 'flex',
        padding: 2,
      }}
    >
      <Grid container>
        <Grid item xs={12} md={3}>
          <SkeletonTheme
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
          >
            <Skeleton
              height={16}
              width="60%"
              style={{ marginLeft: 16, marginTop: 16 }}
            />
          </SkeletonTheme>
        </Grid>
        <Grid item xs={12} md={9} component="div">
          <CardContent>
            <SkeletonTheme
              baseColor={skeletonBaseColor}
              highlightColor={skeletonHighlightColor}
            >
              <Skeleton height={28} width="70%" style={{ marginBottom: 8 }} />
              <Skeleton height={16} width="100%" style={{ marginBottom: 4 }} />
              <Skeleton height={16} width="95%" style={{ marginBottom: 4 }} />
              <Skeleton height={16} width="80%" style={{ marginBottom: 16 }} />
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  marginTop: '8px',
                }}
              >
                <Skeleton height={24} width={60} borderRadius={4} />
                <Skeleton height={24} width={80} borderRadius={4} />
                <Skeleton height={24} width={70} borderRadius={4} />
              </div>
            </SkeletonTheme>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

// Experience Skeleton - title + multiple cards
export const ExperienceSkeleton: React.FC = () => {
  return (
    <div style={{ marginTop: '40px', marginBottom: '40px' }}>
      <SkeletonTheme
        baseColor={skeletonBaseColor}
        highlightColor={skeletonHighlightColor}
      >
        <Skeleton height={24} width={120} style={{ marginBottom: 16 }} />
      </SkeletonTheme>
      {[1, 2, 3].map((index) => (
        <div key={index}>
          <ProjectCardSkeleton />
          {index !== 3 && <div style={{ height: '20px' }} />}
        </div>
      ))}
    </div>
  )
}

// Education Skeleton - title + multiple cards
export const EducationSkeleton: React.FC = () => {
  return (
    <div style={{ marginTop: '40px', marginBottom: '40px' }}>
      <SkeletonTheme
        baseColor={skeletonBaseColor}
        highlightColor={skeletonHighlightColor}
      >
        <Skeleton height={24} width={120} style={{ marginBottom: 16 }} />
      </SkeletonTheme>
      {[1, 2].map((index) => (
        <div key={index}>
          <ProjectCardSkeleton />
          {index !== 2 && <div style={{ height: '20px' }} />}
        </div>
      ))}
    </div>
  )
}

// Languages Skeleton - title + multiple cards
export const LanguagesSkeleton: React.FC = () => {
  return (
    <div
      style={{
        marginTop: '40px',
        marginBottom: '40px',
        paddingBottom: '120px',
      }}
    >
      <SkeletonTheme
        baseColor={skeletonBaseColor}
        highlightColor={skeletonHighlightColor}
      >
        <Skeleton height={24} width={120} style={{ marginBottom: 16 }} />
      </SkeletonTheme>
      {[1, 2, 3].map((index) => (
        <div key={index}>
          <ProjectCardSkeleton />
          {index !== 3 && <div style={{ height: '20px' }} />}
        </div>
      ))}
    </div>
  )
}

// HomeMenu Skeleton - navigation links
export const HomeMenuSkeleton: React.FC = () => {
  return (
    <div style={{ marginTop: '40px' }}>
      <SkeletonTheme
        baseColor={skeletonBaseColor}
        highlightColor={skeletonHighlightColor}
      >
        {['About', 'Experience', 'Education', 'Languages'].map((_, index) => (
          <Skeleton
            key={index}
            height={20}
            width={80 + index * 20}
            style={{
              marginBottom: index !== 3 ? 8 : 0,
              display: 'inline-block',
              marginRight: 16,
            }}
          />
        ))}
      </SkeletonTheme>
    </div>
  )
}

// Footer Skeleton - icons + text
export const FooterSkeleton: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: 'auto',
        paddingTop: '16px',
        paddingBottom: '16px',
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <SkeletonTheme
        baseColor={skeletonBaseColor}
        highlightColor={skeletonHighlightColor}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <Skeleton circle height={32} width={32} />
          <Skeleton circle height={32} width={32} />
          <Skeleton circle height={32} width={32} />
        </div>
        <Skeleton height={14} width={150} />
      </SkeletonTheme>
    </div>
  )
}
