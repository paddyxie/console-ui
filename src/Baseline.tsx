import React, { useEffect } from 'react'
import { GlobalStyles } from '@mui/material'

const FONTS_LINK_ID = 'console-ui-fonts'
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&family=Fira+Code:wght@400;500&display=swap'

/** Injects Google Fonts <link> into <head> exactly once. */
export function FontLoader() {
  useEffect(() => {
    if (document.getElementById(FONTS_LINK_ID)) return
    const pre1 = document.createElement('link')
    pre1.rel = 'preconnect'
    pre1.href = 'https://fonts.googleapis.com'
    document.head.appendChild(pre1)
    const pre2 = document.createElement('link')
    pre2.rel = 'preconnect'
    pre2.href = 'https://fonts.gstatic.com'
    pre2.crossOrigin = ''
    document.head.appendChild(pre2)
    const link = document.createElement('link')
    link.id = FONTS_LINK_ID
    link.rel = 'stylesheet'
    link.href = FONTS_URL
    document.head.appendChild(link)
  }, [])
  return null
}

/** Global reset + scrollbar styles (uses --ui-* css vars for light/dark). */
export function BaselineStyles() {
  return (
    <GlobalStyles
      styles={{
        '*, *::before, *::after': { boxSizing: 'border-box', margin: 0, padding: 0 },
        '::-webkit-scrollbar': { width: 6, height: 6 },
        '::-webkit-scrollbar-track': { background: 'transparent' },
        '::-webkit-scrollbar-thumb': {
          background: 'var(--ui-border-strong)',
          borderRadius: 3,
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: 'var(--ui-border-hover)',
        },
      }}
    />
  )
}
