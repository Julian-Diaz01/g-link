interface CornerBracketsProps {
  children: React.ReactNode
  className?: string
}

const corners = [
  { position: '-top-2 -left-2', hLine: 'top-0 left-0', vLine: 'top-0 left-0' },
  {
    position: '-top-2 -right-2',
    hLine: 'top-0 right-0',
    vLine: 'top-0 right-0',
  },
  {
    position: '-bottom-2 -left-2',
    hLine: 'bottom-0 left-0',
    vLine: 'bottom-0 left-0',
  },
  {
    position: '-bottom-2 -right-2',
    hLine: 'bottom-0 right-0',
    vLine: 'bottom-0 right-0',
  },
]

export const CornerBrackets = ({
  children,
  className = 'w-44 h-52',
}: CornerBracketsProps) => (
  <div className={`relative ${className} mx-auto`}>
    {corners.map((corner, i) => (
      <div key={i} className={`absolute ${corner.position} w-8 h-8`}>
        <div className={`absolute ${corner.hLine} w-full h-px bg-gray-400`} />
        <div className={`absolute ${corner.vLine} w-px h-full bg-gray-400`} />
      </div>
    ))}
    {children}
  </div>
)
