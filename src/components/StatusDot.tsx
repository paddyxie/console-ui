import { Box } from '@mui/material'

interface StatusDotProps {
  /** CSS color value — typically a `var(--ui-*)` token or a status color. */
  color: string
  /** Show a soft glow matching the dot color. */
  glow?: boolean
  /** Diameter in pixels. Defaults to 8. */
  size?: number
}

/** Small circular status indicator. */
export function StatusDot({ color, glow = false, size = 8 }: StatusDotProps) {
  return (
    <Box sx={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      flexShrink: 0,
      boxShadow: glow ? `0 0 6px ${color}80` : 'none',
    }} />
  )
}
