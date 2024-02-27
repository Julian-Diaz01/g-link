import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Link,
  Typography,
  useTheme,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import LinkIcon from '@mui/icons-material/Link'

interface ProjectCardProps {
  monthYearRange: string
  title: string
  subTitle: string
  description: string
  chips: string[]
  links?: { title: string; url: string }[]
  cardLink?: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  monthYearRange,
  title,
  subTitle,
  description,
  chips,
  links,
  cardLink,
}) => {
  const theme = useTheme()

  const styles = {
    card: {
      transition: '0.3s',
      backgroundColor: theme.palette.background.paper + '10',
      display: 'flex',
      padding: 2,
      '&:hover': { backgroundColor: '#ffffff15' },
    },
    gridLeft: {
      display: 'flex',
    },
    linkBox: { display: 'flex' },
    typographyDates: {
      color: theme.palette.text.primary + '80',
      fontSize: '0.8rem',
      fontFamily: 'monospace',
      textTransform: 'uppercase',
      ml: 2,
      mt: 2,
    },
    typographyTitle: {
      width: 'fit-content',
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
    typographyBody: { color: theme.palette.text.primary + '80', mb: 2 },
    typographyLink: {
      display: 'flex',
      alignItems: 'center',
      mr: 2,
      mb: 1,
      fontSize: '1rem',
      '&:hover': {
        color: theme.palette.secondary.main + '!important',
      },
    },
    titleIcon: { fontSize: '17px' },
    link: {
      width: 'fit-content',
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
    linkTypography: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 2,
      marginBottom: 1,
      fontSize: '1rem',
      '&:hover': {
        color: theme.palette.secondary.main + '!important',
      },
    },
    linkIcon: {
      transform: 'rotateZ(45deg)',
      fontSize: '1rem',
      color: 'inherit',
      mr: 1,
    },
    chip: {
      marginRight: 1,
      marginTop: 1,
      backgroundColor: theme.palette.secondary.main + '15',
      color: theme.palette.secondary.main,
    },
  }
  const handleCardClick = () => {
    if (cardLink) {
      window.open(cardLink, '_blank')
    }
  }

  const preventPropagation = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.stopPropagation()
  }

  return (
    <Card variant="outlined" sx={styles.card} onClick={handleCardClick}>
      <Grid container>
        <Grid item xs={12} md={3} sx={styles.gridLeft}>
          <Typography sx={styles.typographyDates}>{monthYearRange}</Typography>
        </Grid>
        <Grid item xs={12} md={9} component="div">
          <CardContent>
            <Link
              href={cardLink ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
            >
              <Typography
                gutterBottom
                variant="h6"
                color="text.primary"
                component="div"
                sx={styles.typographyTitle}
              >
                {title} · {subTitle}
                <OpenInNewIcon fontSize="small" sx={styles.titleIcon} />
              </Typography>
            </Link>
            <Typography variant="body2" sx={styles.typographyBody}>
              {description}
            </Typography>
            <Box sx={styles.linkBox}>
              {links?.map((link, index) => (
                <Typography
                  key={index}
                  color="text.primary"
                  sx={styles.typographyLink}
                >
                  <LinkIcon sx={styles.linkIcon} />
                  <Link
                    color="text.primary"
                    href={link.url}
                    onClick={preventPropagation}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="none"
                  >
                    {link.title}
                  </Link>
                </Typography>
              ))}
            </Box>
            {chips.map((chip, index) => (
              <Chip key={index} label={chip} sx={styles.chip} />
            ))}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ProjectCard
