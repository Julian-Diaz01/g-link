interface SectionHeaderProps {
  title: string
  variant?: 'sidebar' | 'main'
}

export const SectionHeader = ({
  title,
  variant = 'sidebar',
}: SectionHeaderProps) => {
  const styles =
    variant === 'sidebar'
      ? 'text-xs tracking-[0.2em] text-gray-600 mb-4 pb-2 border-b border-gray-300 font-medium'
      : 'text-lg tracking-[0.15em] text-gray-700 mb-4 pb-2 border-b border-gray-300 font-normal'

  return <h2 className={styles}>{title}</h2>
}
