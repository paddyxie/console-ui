import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Box, useTheme } from '@mui/material'

interface MdProps {
  children: string
  /** sx color token or CSS color; defaults to text.primary */
  color?: string
}

/**
 * Themed markdown renderer. Respects the active MUI theme mode (dark/light).
 * Supports GFM (tables, strikethrough, task lists, etc.).
 */
export default function Md({ children, color }: MdProps) {
  const { palette } = useTheme()
  const dark = palette.mode === 'dark'

  const codeBg      = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
  const blockBg     = dark ? palette.background.default : 'rgba(0,0,0,0.04)'
  const blockBorder = palette.divider
  const thBg        = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'

  return (
    <Box
      sx={{
        color: color ?? 'text.primary',
        fontSize: 'var(--ui-font-size-body)',
        lineHeight: 1.7,
        '& p':                 { m: 0, mb: 1, '&:last-child': { mb: 0 } },
        '& h1,& h2,& h3,& h4': { color: 'text.primary', mt: 1.5, mb: 0.5, fontWeight: 600 },
        '& h1':                { fontSize: 'var(--ui-font-size-markdown-h1)' },
        '& h2':                { fontSize: 'var(--ui-font-size-markdown-h2)' },
        '& h3,& h4':           { fontSize: 'var(--ui-font-size-markdown-h3)' },
        '& ul,& ol':           { pl: 2.5, mb: 1, mt: 0 },
        '& li':                { mb: 0.25 },
        '& code': {
          fontFamily: '"Fira Code", monospace',
          fontSize:   'var(--ui-font-size-code)',
          bgcolor:    codeBg,
          px: 0.6, py: 0.1,
          borderRadius: 0.5,
          color: 'primary.light',
        },
        '& pre': {
          bgcolor:   blockBg,
          border:    `1px solid ${blockBorder}`,
          borderRadius: 1,
          p: 1.5,
          overflow:  'auto',
          mb: 1,
          '& code': { bgcolor: 'transparent', px: 0, color: 'text.primary', fontSize: 'var(--ui-font-size-code)' },
        },
        '& table':   { borderCollapse: 'collapse', width: '100%', mb: 1 },
        '& th,& td': { border: `1px solid ${blockBorder}`, px: 1.5, py: 0.5, textAlign: 'left' },
        '& th':      { bgcolor: thBg, color: 'text.primary', fontWeight: 600 },
        '& hr':      { border: 'none', borderTop: `1px solid ${blockBorder}`, my: 1.5 },
        '& a':       { color: 'primary.main', textDecoration: 'underline' },
        '& blockquote': {
          borderLeft: `3px solid ${palette.primary.main}66`,
          pl: 1.5, ml: 0,
          color: 'text.secondary',
        },
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </Box>
  )
}
