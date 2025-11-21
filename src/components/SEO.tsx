import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  author?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogImageAlt?: string
  ogUrl?: string
  ogType?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  canonicalUrl?: string
}

const SEO: React.FC<SEOProps> = ({
  title = 'Julian Diaz - Software Developer Portfolio',
  description = 'Building exceptional web experiences with modern technologies. Transforming ideas into elegant, performant applications.',
  keywords = 'Software Developer, Web Developer, React, TypeScript, JavaScript, Berlin, Full Stack Developer, Frontend Developer',
  author = 'Julian Diaz',
  ogTitle,
  ogDescription,
  ogImage = 'https://juliandiaz.web.app/og-image.jpg',
  ogImageAlt = 'Julian Diaz - Software Developer Portfolio',
  ogUrl = 'https://juliandiaz.web.app/',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
}) => {
  const finalOgTitle = ogTitle || title
  const finalOgDescription = ogDescription || description
  const finalCanonicalUrl = canonicalUrl || ogUrl

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Julian Diaz Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    </Helmet>
  )
}

export default SEO
