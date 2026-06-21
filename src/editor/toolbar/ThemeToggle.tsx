'use client'

import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { useTheme } from '../ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      className="toolbar-btn"
      onMouseDown={e => e.preventDefault()}
      onClick={toggleTheme}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
    </button>
  )
}
