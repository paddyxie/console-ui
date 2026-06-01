import { createTheme, alpha } from '@mui/material/styles'
import type { PaletteMode } from '@mui/material/styles'

export const SIDEBAR_W = 216

/* ── mode tokens ──────────────────────────────────────────────────────────── */

export const modeTokens = {
  dark: {
    bg: '#080a12',
    surface: '#111827',
    surfaceMuted: '#0d0f1a',
    text: '#f1f5f9',
    textSoft: '#e2e8f0',
    textMuted: '#cbd5e1',
    textSecondary: '#a8b3c7',
    textTertiary: '#94a3b8',
    textDisabled: '#64748b',
    emptyIcon: '#475569',
    border: 'rgba(255,255,255,0.07)',
    borderSubtle: 'rgba(255,255,255,0.05)',
    borderStrong: 'rgba(255,255,255,0.1)',
    borderHover: 'rgba(255,255,255,0.2)',
    hover: 'rgba(255,255,255,0.04)',
    hoverSubtle: 'rgba(255,255,255,0.02)',
    field: 'rgba(255,255,255,0.05)',
    overlay: 'rgba(2,6,23,0.72)',
    tooltip: '#1e2333',
    neutralChipBg: 'rgba(100,116,139,0.1)',
    neutralChipBorder: 'rgba(100,116,139,0.2)',
    selectedText: '#e0e7ff',
    selectedTextSoft: '#a5b4fc',
  },
  light: {
    bg: '#f8fafc',
    surface: '#ffffff',
    surfaceMuted: '#f1f5f9',
    text: '#0f172a',
    textSoft: '#1e293b',
    textMuted: '#334155',
    textSecondary: '#475569',
    textTertiary: '#64748b',
    textDisabled: '#94a3b8',
    emptyIcon: '#94a3b8',
    border: 'rgba(15,23,42,0.1)',
    borderSubtle: 'rgba(15,23,42,0.07)',
    borderStrong: 'rgba(15,23,42,0.14)',
    borderHover: 'rgba(15,23,42,0.24)',
    hover: 'rgba(15,23,42,0.05)',
    hoverSubtle: 'rgba(15,23,42,0.035)',
    field: 'rgba(15,23,42,0.04)',
    overlay: 'rgba(255,255,255,0.82)',
    tooltip: '#111827',
    neutralChipBg: 'rgba(100,116,139,0.1)',
    neutralChipBorder: 'rgba(100,116,139,0.22)',
    selectedText: '#3730a3',
    selectedTextSoft: '#4f46e5',
  },
} as const

export type ModeTokens = (typeof modeTokens)[keyof typeof modeTokens]

/* ── accent tokens ────────────────────────────────────────────────────────── */

export const accentTokens = {
  primary: '#818cf8',
  primaryLight: '#a5b4fc',
  primaryDark: '#6366f1',
  primaryAlt: '#60a5fa',
  success: '#10b981',
  warning: '#f59e0b',
  warningAlt: '#eab308',
  error: '#ef4444',
  errorDark: '#dc2626',
  white: '#fff',
} as const

/* ── css variables ────────────────────────────────────────────────────────── */

function cssVars(
  t: ModeTokens,
  a: typeof accentTokens,
  extra?: Record<string, string>,
) {
  return {
    '--ui-bg': t.bg,
    '--ui-surface': t.surface,
    '--ui-surface-muted': t.surfaceMuted,
    '--ui-text': t.text,
    '--ui-text-soft': t.textSoft,
    '--ui-text-muted': t.textMuted,
    '--ui-text-secondary': t.textSecondary,
    '--ui-text-tertiary': t.textTertiary,
    '--ui-text-disabled': t.textDisabled,
    '--ui-empty-icon': t.emptyIcon,
    '--ui-border': t.border,
    '--ui-border-subtle': t.borderSubtle,
    '--ui-border-strong': t.borderStrong,
    '--ui-border-hover': t.borderHover,
    '--ui-hover': t.hover,
    '--ui-hover-subtle': t.hoverSubtle,
    '--ui-field': t.field,
    '--ui-overlay': t.overlay,
    '--ui-tooltip': t.tooltip,
    '--ui-neutral-chip-bg': t.neutralChipBg,
    '--ui-neutral-chip-border': t.neutralChipBorder,
    '--ui-selected-text': t.selectedText,
    '--ui-selected-text-soft': t.selectedTextSoft,
    '--ui-primary': a.primary,
    '--ui-primary-light': a.primaryLight,
    '--ui-primary-dark': a.primaryDark,
    '--ui-primary-alt': a.primaryAlt,
    '--ui-success': a.success,
    '--ui-warning': a.warning,
    '--ui-warning-alt': a.warningAlt,
    '--ui-error': a.error,
    '--ui-error-dark': a.errorDark,
    '--ui-on-accent': a.white,
    '--ui-primary-bg-subtle': alpha(a.primary, 0.05),
    '--ui-primary-bg': alpha(a.primary, 0.1),
    '--ui-primary-bg-mid': alpha(a.primary, 0.12),
    '--ui-primary-bg-strong': alpha(a.primary, 0.16),
    '--ui-primary-border': alpha(a.primary, 0.25),
    '--ui-primary-border-strong': alpha(a.primary, 0.3),
    '--ui-success-bg': alpha(a.success, 0.1),
    '--ui-success-bg-strong': alpha(a.success, 0.12),
    '--ui-success-border': alpha(a.success, 0.25),
    '--ui-warning-bg': alpha(a.warning, 0.1),
    '--ui-warning-bg-subtle': alpha(a.warning, 0.06),
    '--ui-warning-border': alpha(a.warning, 0.2),
    '--ui-warning-alt-bg': alpha(a.warningAlt, 0.12),
    '--ui-warning-alt-border': alpha(a.warningAlt, 0.25),
    '--ui-error-bg': alpha(a.error, 0.12),
    '--ui-error-border': alpha(a.error, 0.25),
    '--ui-primary-shadow': alpha(a.primary, 0.4),
    '--ui-primary-shadow-strong': alpha(a.primary, 0.6),
    '--ui-success-shadow': alpha(a.success, 0.8),
    ...extra,
  }
}

/* ── createAppTheme ───────────────────────────────────────────────────────── */

export interface ThemeOptions {
  extraCssVars?: Record<string, string>
}

export function createAppTheme(mode: PaletteMode, opts?: ThemeOptions) {
  const t = modeTokens[mode]
  const a = accentTokens
  const vars = cssVars(t, a, opts?.extraCssVars)

  return createTheme({
    palette: {
      mode,
      background: { default: t.bg, paper: t.surface },
      primary: { main: a.primary, light: a.primaryLight, dark: a.primaryDark },
      divider: t.border,
      text: { primary: t.text, secondary: t.textSecondary },
      error: { main: a.error },
      warning: { main: a.warning },
      success: { main: a.success },
    },
    typography: {
      fontFamily: '"Outfit", sans-serif',
      h1: { fontFamily: '"Syne", sans-serif' },
      h2: { fontFamily: '"Syne", sans-serif' },
      h3: { fontFamily: '"Syne", sans-serif' },
      h4: { fontFamily: '"Syne", sans-serif' },
      h5: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
      h6: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
      subtitle1: { fontFamily: '"Outfit", sans-serif', fontWeight: 500 },
      subtitle2: { fontFamily: '"Outfit", sans-serif', fontWeight: 500, color: t.textSecondary },
      body1: { fontFamily: '"Outfit", sans-serif' },
      body2: { fontFamily: '"Outfit", sans-serif', color: t.textSecondary },
      caption: { fontFamily: '"Fira Code", monospace', fontSize: '0.72rem' },
    },
    shape: { borderRadius: 8 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': { colorScheme: mode, ...vars } as Record<string, string>,
          body: { background: t.bg },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none', border: `1px solid ${t.border}` },
        },
      },
      MuiDivider: {
        styleOverrides: { root: { borderColor: t.border } },
      },
      MuiSwitch: {
        styleOverrides: {
          root: { padding: 8 },
          track: { borderRadius: 11 },
          thumb: { boxShadow: 'none' },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            color: t.text,
            fontSize: '0.84rem',
            fontFamily: '"Outfit", sans-serif',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: t.borderStrong },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: t.textTertiary,
            fontFamily: '"Outfit", sans-serif',
            fontSize: '0.82rem',
            fontWeight: 400,
            lineHeight: 1.25,
            '&.Mui-focused': { color: a.primary },
            '&.MuiInputLabel-shrink': { color: t.textSecondary, fontSize: '0.76rem', fontWeight: 500 },
            '&.Mui-disabled': { color: t.textDisabled },
            '&.Mui-error': { color: a.error },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: t.text,
            fontFamily: '"Outfit", sans-serif',
            fontSize: '0.84rem',
            lineHeight: 1.4,
          },
          input: {
            color: t.text,
            font: 'inherit',
            '&::placeholder': { color: t.textDisabled, opacity: 1, fontSize: '0.8rem' },
          },
          inputSizeSmall: { fontSize: '0.82rem' },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: { borderColor: t.borderStrong },
          root: {
            background: t.field,
            borderRadius: 6,
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: t.borderHover },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: a.primary },
            '&.MuiOutlinedInput-sizeSmall': { minHeight: 30 },
          },
          input: {
            padding: '10px 12px',
            '&::placeholder': { color: t.textDisabled, opacity: 1, fontSize: '0.8rem' },
          },
          inputSizeSmall: { padding: '6px 10px' },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontFamily: '"Fira Code", monospace', fontSize: '0.7rem', height: 22, borderRadius: 4 },
        },
      },
      MuiButton: {
        defaultProps: { size: 'small', variant: 'outlined' },
        styleOverrides: {
          root: {
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 500,
            textTransform: 'none',
            letterSpacing: 0,
          },
          contained: {
            background: a.primary,
            color: a.white,
            boxShadow: `0 0 20px ${alpha(a.primary, 0.3)}`,
            '&:hover': { background: a.primaryDark, boxShadow: `0 0 28px ${alpha(a.primary, 0.45)}` },
            '&.Mui-disabled': { background: t.hover, color: t.textDisabled, boxShadow: 'none' },
          },
          outlined: {
            borderColor: t.borderStrong,
            color: t.textSecondary,
            '&:hover': {
              borderColor: t.borderHover,
              background: t.hover,
            },
            '&.Mui-disabled': { borderColor: t.border, color: t.textDisabled },
          },
        },
        variants: [
          {
            props: { variant: 'contained', color: 'error' },
            style: {
              background: a.error,
              boxShadow: `0 0 20px ${alpha(a.error, 0.3)}`,
              '&:hover': { background: a.errorDark, boxShadow: `0 0 28px ${alpha(a.error, 0.45)}` },
            },
          },
        ],
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontFamily: '"Outfit", sans-serif',
            fontSize: '0.75rem',
            background: t.tooltip,
            border: `1px solid ${t.borderStrong}`,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: { borderColor: t.borderSubtle },
          head: {
            fontFamily: '"Fira Code", monospace',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: t.textMuted,
            background: t.surfaceMuted,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundImage: 'none',
            background: t.surface,
            border: `1px solid ${t.borderStrong}`,
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontFamily: '"Syne", sans-serif',
            fontSize: '0.9rem',
            color: t.text,
            paddingTop: 10,
            paddingBottom: 10,
            borderBottom: `1px solid ${t.border}`,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: t.text,
            fontFamily: '"Outfit", sans-serif',
            '&.Mui-selected': { color: a.primary, backgroundColor: alpha(a.primary, 0.12) },
            '&.Mui-selected:hover': { backgroundColor: alpha(a.primary, 0.16) },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:hover': { background: t.hoverSubtle },
            '&:last-child td': { border: 0 },
          },
        },
      },
    },
  })
}
