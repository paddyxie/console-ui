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

export interface AccentTokens {
  primary: string
  primaryLight: string
  primaryDark: string
  primaryAlt: string
  success: string
  warning: string
  warningAlt: string
  error: string
  errorDark: string
  white: string
}

export type AccentTokenOverrides = Partial<AccentTokens>
export type ModeAccentTokenOverrides = Partial<Record<PaletteMode, AccentTokenOverrides>>
export type AccentTokenInput = AccentTokenOverrides | ModeAccentTokenOverrides

export interface AccentPaletteOption {
  id: string
  label: string
  tokens: AccentTokenInput
}

export const accentTokens: AccentTokens = {
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

const lightAccentTokens: AccentTokenOverrides = {
  primary: '#4f46e5',
  primaryLight: '#6366f1',
  primaryDark: '#4338ca',
  primaryAlt: '#2563eb',
}

export const accentPalettes = [
  {
    id: 'cyan',
    label: 'Cyan',
    tokens: {
      dark: { primary: '#22d3ee', primaryLight: '#67e8f9', primaryDark: '#06b6d4', primaryAlt: '#38bdf8' },
      light: { primary: '#0891b2', primaryLight: '#06b6d4', primaryDark: '#0e7490', primaryAlt: '#0284c7' },
    },
  },
  {
    id: 'violet',
    label: 'Violet',
    tokens: {
      dark: { primary: '#8b5cf6', primaryLight: '#a78bfa', primaryDark: '#7c3aed', primaryAlt: '#818cf8' },
      light: { primary: '#7c3aed', primaryLight: '#8b5cf6', primaryDark: '#6d28d9', primaryAlt: '#4f46e5' },
    },
  },
  {
    id: 'emerald',
    label: 'Emerald',
    tokens: {
      dark: { primary: '#10b981', primaryLight: '#34d399', primaryDark: '#059669', primaryAlt: '#14b8a6' },
      light: { primary: '#059669', primaryLight: '#10b981', primaryDark: '#047857', primaryAlt: '#0d9488' },
    },
  },
  {
    id: 'amber',
    label: 'Amber',
    tokens: {
      dark: { primary: '#f59e0b', primaryLight: '#fbbf24', primaryDark: '#d97706', primaryAlt: '#eab308' },
      light: { primary: '#d97706', primaryLight: '#f59e0b', primaryDark: '#b45309', primaryAlt: '#ca8a04' },
    },
  },
  {
    id: 'rose',
    label: 'Rose',
    tokens: {
      dark: { primary: '#f43f5e', primaryLight: '#fb7185', primaryDark: '#e11d48', primaryAlt: '#ec4899' },
      light: { primary: '#e11d48', primaryLight: '#f43f5e', primaryDark: '#be123c', primaryAlt: '#db2777' },
    },
  },
  {
    id: 'slate',
    label: 'Slate',
    tokens: {
      dark: { primary: '#94a3b8', primaryLight: '#cbd5e1', primaryDark: '#64748b', primaryAlt: '#38bdf8' },
      light: { primary: '#475569', primaryLight: '#64748b', primaryDark: '#334155', primaryAlt: '#0f766e' },
    },
  },
] as const satisfies readonly AccentPaletteOption[]

function isModeAccentTokenOverrides(input: AccentTokenInput): input is ModeAccentTokenOverrides {
  return 'dark' in input || 'light' in input
}

export function resolveAccentTokens(mode: PaletteMode, input?: AccentTokenInput): AccentTokens {
  const base = {
    ...accentTokens,
    ...(mode === 'light' ? lightAccentTokens : {}),
  }
  const overrides = input
    ? isModeAccentTokenOverrides(input)
      ? input[mode]
      : input
    : undefined
  return { ...base, ...overrides }
}

/* ── typography scale ─────────────────────────────────────────────────────── */

export interface TypographyScale {
  appTitle: string
  pageTitle: string
  sectionTitle: string
  dialogTitle: string
  body: string
  bodySmall: string
  labelShrink: string
  nav: string
  topNav: string
  meta: string
  micro: string
  control: string
  controlSmall: string
  tableCell: string
  tableHead: string
  chip: string
  tooltip: string
  code: string
  markdownH1: string
  markdownH2: string
  markdownH3: string
}

const DEFAULT_FONT_BASE_REM = 0.8125

function rem(value: number): string {
  return `${Number(value.toFixed(4))}rem`
}

export function createTypographyScale(fontScale = 1, fontBaseRem = DEFAULT_FONT_BASE_REM): TypographyScale {
  const base = fontBaseRem * fontScale
  return {
    appTitle: rem(base * 1.15),
    pageTitle: rem(base * 1.23),
    sectionTitle: rem(base * 1.08),
    dialogTitle: rem(base * 1.08),
    body: rem(base),
    bodySmall: rem(base * 0.92),
    labelShrink: rem(base * 1.08),
    nav: rem(base),
    topNav: rem(base * 0.92),
    meta: rem(base * 0.85),
    micro: rem(base * 0.77),
    control: rem(base),
    controlSmall: rem(base * 0.92),
    tableCell: rem(base),
    tableHead: rem(base * 0.85),
    chip: rem(base * 0.85),
    tooltip: rem(base * 0.92),
    code: rem(base * 0.92),
    markdownH1: rem(base * 1.23),
    markdownH2: rem(base * 1.15),
    markdownH3: rem(base * 1.08),
  }
}

/* ── css variables ────────────────────────────────────────────────────────── */

function cssVars(
  t: ModeTokens,
  a: AccentTokens,
  type: TypographyScale,
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
    '--ui-font-size-app-title': type.appTitle,
    '--ui-font-size-page-title': type.pageTitle,
    '--ui-font-size-section-title': type.sectionTitle,
    '--ui-font-size-dialog-title': type.dialogTitle,
    '--ui-font-size-body': type.body,
    '--ui-font-size-body-small': type.bodySmall,
    '--ui-font-size-label-shrink': type.labelShrink,
    '--ui-font-size-nav': type.nav,
    '--ui-font-size-top-nav': type.topNav,
    '--ui-font-size-meta': type.meta,
    '--ui-font-size-micro': type.micro,
    '--ui-font-size-control': type.control,
    '--ui-font-size-control-small': type.controlSmall,
    '--ui-font-size-table-cell': type.tableCell,
    '--ui-font-size-table-head': type.tableHead,
    '--ui-font-size-chip': type.chip,
    '--ui-font-size-tooltip': type.tooltip,
    '--ui-font-size-code': type.code,
    '--ui-font-size-markdown-h1': type.markdownH1,
    '--ui-font-size-markdown-h2': type.markdownH2,
    '--ui-font-size-markdown-h3': type.markdownH3,
    ...extra,
  }
}

/* ── createAppTheme ───────────────────────────────────────────────────────── */

export interface ThemeOptions {
  extraCssVars?: Record<string, string>
  accentTokens?: AccentTokenInput
  fontScale?: number
  fontBaseRem?: number
}

export function createAppTheme(mode: PaletteMode, opts?: ThemeOptions) {
  const t = modeTokens[mode]
  const a = resolveAccentTokens(mode, opts?.accentTokens)
  const type = createTypographyScale(opts?.fontScale, opts?.fontBaseRem)
  const vars = cssVars(t, a, type, opts?.extraCssVars)

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
      h1: { fontFamily: '"Syne", sans-serif', fontSize: type.pageTitle, fontWeight: 700 },
      h2: { fontFamily: '"Syne", sans-serif', fontSize: type.pageTitle, fontWeight: 700 },
      h3: { fontFamily: '"Syne", sans-serif', fontSize: type.sectionTitle, fontWeight: 650 },
      h4: { fontFamily: '"Syne", sans-serif', fontSize: type.sectionTitle, fontWeight: 650 },
      h5: { fontFamily: '"Syne", sans-serif', fontSize: type.sectionTitle, fontWeight: 600 },
      h6: { fontFamily: '"Syne", sans-serif', fontSize: type.sectionTitle, fontWeight: 600 },
      subtitle1: { fontFamily: '"Outfit", sans-serif', fontSize: type.body, fontWeight: 500 },
      subtitle2: { fontFamily: '"Outfit", sans-serif', fontSize: type.bodySmall, fontWeight: 500, color: t.textSecondary },
      body1: { fontFamily: '"Outfit", sans-serif', fontSize: type.body },
      body2: { fontFamily: '"Outfit", sans-serif', fontSize: type.bodySmall, color: t.textSecondary },
      caption: { fontFamily: '"Fira Code", monospace', fontSize: type.meta },
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
            fontSize: type.controlSmall,
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
            fontSize: type.control,
            fontWeight: 400,
            lineHeight: 1.25,
            '&.Mui-focused': { color: a.primary },
            '&.MuiInputLabel-shrink': { color: t.textSecondary, fontSize: type.labelShrink, fontWeight: 500 },
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
            fontSize: type.control,
            lineHeight: 1.4,
          },
          input: {
            color: t.text,
            font: 'inherit',
            '&::placeholder': { color: t.textDisabled, opacity: 1, fontSize: type.bodySmall },
          },
          inputSizeSmall: { fontSize: type.controlSmall },
          inputMultiline: {
            padding: 0,
          },
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
            '&.MuiInputBase-multiline': {
              padding: '6px 10px',
            },
          },
          input: {
            padding: '10px 12px',
            '&::placeholder': { color: t.textDisabled, opacity: 1, fontSize: type.bodySmall },
            '&.MuiInputBase-inputMultiline': {
              padding: 0,
            },
          },
          inputSizeSmall: { padding: '6px 10px' },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontFamily: '"Fira Code", monospace', fontSize: type.chip, height: 22, borderRadius: 4 },
        },
      },
      MuiButton: {
        defaultProps: { size: 'small', variant: 'outlined' },
        styleOverrides: {
          root: {
            fontFamily: '"Outfit", sans-serif',
            fontSize: type.controlSmall,
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
      MuiTab: {
        styleOverrides: {
          root: {
            fontFamily: '"Outfit", sans-serif',
            fontSize: type.controlSmall,
            fontWeight: 600,
            letterSpacing: 0,
            textTransform: 'none',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontFamily: '"Outfit", sans-serif',
            fontSize: type.tooltip,
            background: t.tooltip,
            border: `1px solid ${t.borderStrong}`,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: t.borderSubtle,
            fontFamily: '"Outfit", sans-serif',
            fontSize: type.tableCell,
          },
          head: {
            fontFamily: '"Fira Code", monospace',
            fontSize: type.tableHead,
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
            fontSize: type.dialogTitle,
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
            fontSize: type.controlSmall,
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
