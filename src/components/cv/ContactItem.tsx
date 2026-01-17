import type { LucideIcon } from 'lucide-react'

interface ContactItemProps {
  icon: LucideIcon
  value: string
  href?: string
  displayValue?: string
}

export const ContactItem = ({
  icon: Icon,
  value,
  href,
  displayValue,
}: ContactItemProps) => {
  const display = displayValue || value

  return (
    <div className="flex items-center gap-3 text-gray-600">
      <div className="w-6 h-6 flex items-center justify-center">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs hover:underline break-all"
        >
          {display}
        </a>
      ) : (
        <span className="text-xs">{display}</span>
      )}
    </div>
  )
}
