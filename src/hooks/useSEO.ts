import { useEffect } from 'react'

interface UseSEOProps {
  title?: string
  description?: string
  keywords?: string
}

/**
 * Custom hook for updating SEO meta tags dynamically
 * This is useful when you need to update meta tags based on component state
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const [projectName, setProjectName] = useState('');
 *
 *   useSEO({
 *     title: `${projectName} - Julian Diaz Portfolio`,
 *     description: `Details about ${projectName}`,
 *   });
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export const useSEO = ({ title, description, keywords }: UseSEOProps) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title
    }

    // Update meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        document.head.appendChild(metaDescription)
      }
      metaDescription.setAttribute('content', description)
    }

    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', keywords)
    }
  }, [title, description, keywords])
}
