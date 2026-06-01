import { Box, Typography } from '@mui/material'
import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  /** Optional content (e.g. a Button) placed on the right side. */
  action?: ReactNode
}

/**
 * Standard page-level header bar used at the top of content areas.
 * Renders a title, optional subtitle, and optional action slot.
 */
export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <Box sx={{
      px: 3, py: 2,
      borderBottom: '1px solid var(--ui-border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <Box>
        <Typography sx={{
          fontSize: '1rem', fontWeight: 600, fontFamily: '"Syne", sans-serif',
        }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ fontSize: '0.77rem', color: 'var(--ui-text-secondary)' }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {action}
    </Box>
  )
}
