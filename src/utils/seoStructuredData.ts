/**
 * Utility functions for generating structured data (JSON-LD) for AI search engines
 * These schemas help AI crawlers better understand the content and context of your pages
 */

interface WorkExperience {
  monthYearRange: string
  title: string
  subTitle: string
  cardLink: string
  description: string
  chips: string[]
}

interface Education {
  monthYearRange: string
  title: string
  subTitle: string
  cardLink: string
  description: string
  chips: string[]
}

/**
 * Generate CreativeWork schema for portfolio projects
 */
export const generateProjectSchema = (project: {
  name: string
  description: string
  url?: string
  image?: string
  technologies: string[]
  dateCreated?: string
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description,
    url: project.url,
    image: project.image,
    creator: {
      '@type': 'Person',
      name: 'Julian Diaz',
      url: 'https://juliandiaz.web.app/',
    },
    keywords: project.technologies.join(', '),
    dateCreated: project.dateCreated,
    inLanguage: 'en-US',
  }
}

/**
 * Generate WorkExperience schema from job data
 */
export const generateWorkExperienceSchema = (jobs: WorkExperience[]) => {
  return jobs.map((job) => ({
    '@context': 'https://schema.org',
    '@type': 'WorkExperience',
    name: job.title,
    description: job.description,
    occupationalCategory: job.title,
    skills: job.chips.join(', '),
    workLocation: {
      '@type': 'Organization',
      name: job.subTitle,
      url: job.cardLink,
    },
    startDate: parseDate(job.monthYearRange).startDate,
    endDate: parseDate(job.monthYearRange).endDate,
  }))
}

/**
 * Generate EducationalOccupationalCredential schema
 */
export const generateEducationSchema = (education: Education[]) => {
  return education.map((edu) => ({
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    name: edu.title,
    description: edu.description,
    educationalLevel: edu.title.includes('M.Sc')
      ? 'Master of Science'
      : edu.title.includes('B.Eng')
        ? 'Bachelor of Engineering'
        : 'Academic Degree',
    credentialCategory: edu.chips.join(', '),
    recognizedBy: {
      '@type': 'EducationalOrganization',
      name: edu.subTitle,
      url: edu.cardLink,
    },
    validFrom: parseDate(edu.monthYearRange).startDate,
    validThrough: parseDate(edu.monthYearRange).endDate,
  }))
}

/**
 * Generate FAQ schema for common questions
 */
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>,
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate Article schema for blog posts or detailed content
 */
export const generateArticleSchema = (article: {
  headline: string
  description: string
  image?: string
  datePublished?: string
  dateModified?: string
  url?: string
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: 'Julian Diaz',
      url: 'https://juliandiaz.web.app/',
    },
    publisher: {
      '@type': 'Person',
      name: 'Julian Diaz',
      url: 'https://juliandiaz.web.app/',
    },
    url: article.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  }
}

/**
 * Generate Portfolio schema combining multiple projects
 */
export const generatePortfolioSchema = (
  projects: Array<{
    name: string
    description: string
    url?: string
    image?: string
    technologies: string[]
    dateCreated?: string
  }>,
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Collection',
    name: 'Julian Diaz Software Development Portfolio',
    description:
      'A collection of web development projects showcasing expertise in React, TypeScript, Next.js, and modern web technologies',
    creator: {
      '@type': 'Person',
      name: 'Julian Diaz',
    },
    url: 'https://juliandiaz.web.app/',
    hasPart: projects.map((project) => generateProjectSchema(project)),
  }
}

/**
 * Generate ContactPage schema
 */
export const generateContactPageSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Julian Diaz',
    description:
      'Get in touch with Julian Diaz for software development opportunities',
    url: 'https://juliandiaz.web.app/#contact',
    mainEntity: {
      '@type': 'Person',
      name: 'Julian Diaz',
      url: 'https://juliandiaz.web.app/',
    },
  }
}

/**
 * Helper function to parse date ranges from strings like "May 2025 – Present"
 */
function parseDate(dateRange: string): {
  startDate: string
  endDate: string | null
} {
  const parts = dateRange.split('–').map((s) => s.trim())
  const startDate = convertToISO(parts[0])
  const endDate = parts[1]?.toLowerCase().includes('present')
    ? null
    : convertToISO(parts[1])

  return { startDate, endDate }
}

/**
 * Convert "Month Year" to ISO date format
 */
function convertToISO(dateStr: string): string {
  if (!dateStr) return new Date().toISOString().split('T')[0]

  const months: { [key: string]: string } = {
    jan: '01',
    feb: '02',
    mar: '03',
    apr: '04',
    may: '05',
    jun: '06',
    jul: '07',
    aug: '08',
    sep: '09',
    oct: '10',
    nov: '11',
    dec: '12',
    january: '01',
    february: '02',
    march: '03',
    april: '04',
    june: '06',
    july: '07',
    august: '08',
    september: '09',
    october: '10',
    november: '11',
    december: '12',
  }

  const parts = dateStr.trim().split(' ')
  if (parts.length >= 2) {
    const month = months[parts[0].toLowerCase()] || '01'
    const year = parts[1]
    return `${year}-${month}-01`
  }

  return new Date().toISOString().split('T')[0]
}

/**
 * Generate comprehensive profile schema with all experience and education
 */
export const generateComprehensiveProfileSchema = (
  jobs: WorkExperience[],
  education: Education[],
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Julian Diaz',
      jobTitle: 'Software Developer',
      url: 'https://juliandiaz.web.app/',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Berlin',
        addressCountry: 'Germany',
      },
      hasOccupation: jobs.map((job) => ({
        '@type': 'Occupation',
        name: job.title,
        occupationLocation: {
          '@type': 'Organization',
          name: job.subTitle,
          url: job.cardLink,
        },
        skills: job.chips.join(', '),
        description: job.description,
      })),
      alumniOf: education.map((edu) => ({
        '@type': 'EducationalOrganization',
        name: edu.subTitle,
        url: edu.cardLink,
      })),
      knowsAbout: Array.from(
        new Set([
          ...jobs.flatMap((job) => job.chips),
          ...education.flatMap((edu) => edu.chips),
        ]),
      ),
      sameAs: [
        'https://github.com/Julian-Diaz01',
        'https://www.linkedin.com/in/julian-diaz-01/',
      ],
    },
  }
}
