import React, { useState } from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'

interface TextHighlighterProps extends TypographyProps {
  children: string
  highlightText: string[]
  highlightTextColor?: string
}

const TextHighlighter: React.FC<TextHighlighterProps> = ({
  children,
  highlightText,
  highlightTextColor = 'yellow',
  sx,
  ...typographyProps
}) => {
  const [, setSelection] = useState<{ start: number; end: number } | null>(null)

  const handleSelection = () => {
    const selectedText = window.getSelection()
    if (selectedText) {
      setSelection({
        start: selectedText.anchorOffset,
        end: selectedText.focusOffset,
      })
    }
  }

  const highlightedText = highlightText.reduce((text, highlight) => {
    return text.replace(
      new RegExp(`(${highlight})`, 'gi'),
      (_match, p1) => `<span style="color: ${highlightTextColor}">${p1}</span>`,
    )
  }, children)

  return (
    <Typography
      onMouseUp={handleSelection}
      sx={sx}
      {...typographyProps}
      dangerouslySetInnerHTML={{ __html: highlightedText }}
    />
  )
}

export default TextHighlighter
