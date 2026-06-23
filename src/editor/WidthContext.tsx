"use client"
import { createContext, useContext, useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'

export type WidthPreset = '50%' | '75%' | '90%' | '100%' | '120%' | '150%' | '175%' | '200%' | 'fit'

const BASE = 900

const PRESET_STYLE: Record<WidthPreset, CSSProperties> = {
  'fit':  { width: '100%', maxWidth: 'none' },
  '50%':  { width: 'auto', maxWidth: BASE * 0.50 },
  '75%':  { width: 'auto', maxWidth: BASE * 0.75 },
  '90%':  { width: 'auto', maxWidth: BASE * 0.90 },
  '100%': { width: 'auto', maxWidth: BASE * 1.00 },
  '120%': { width: 'auto', maxWidth: BASE * 1.20 },
  '150%': { width: 'auto', maxWidth: BASE * 1.50 },
  '175%': { width: 'auto', maxWidth: BASE * 1.75 },
  '200%': { width: 'auto', maxWidth: BASE * 2.00 },
}

interface WidthContextValue {
  preset: WidthPreset
  setPreset: (p: WidthPreset) => void
  widthStyle: CSSProperties
}

const WidthContext = createContext<WidthContextValue>({
  preset: 'fit',
  setPreset: () => {},
  widthStyle: PRESET_STYLE.fit,
})

export function WidthProvider({ children }: { children: ReactNode }) {
  const [preset, setPreset] = useState<WidthPreset>('fit')
  return (
    <WidthContext.Provider value={{ preset, setPreset, widthStyle: PRESET_STYLE[preset] }}>
      {children}
    </WidthContext.Provider>
  )
}

export function useWidth() {
  return useContext(WidthContext)
}
