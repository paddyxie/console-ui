'use client'

import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

export type Theme = 'light' | 'dark'

const ThemeContext = createContext<Theme>('light')

export function ThemeProvider({ children, theme = 'light' }: { children: ReactNode; theme?: Theme }) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return { theme: useContext(ThemeContext) }
}
