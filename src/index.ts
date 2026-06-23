export {
  createAppTheme,
  createTypographyScale,
  modeTokens,
  accentTokens,
  accentPalettes,
  resolveAccentTokens,
  SIDEBAR_W,
} from './theme'
export type {
  ThemeOptions,
  ModeTokens,
  TypographyScale,
  AccentTokens,
  AccentTokenOverrides,
  ModeAccentTokenOverrides,
  AccentTokenInput,
  AccentPaletteOption,
} from './theme'

export { FontLoader, BaselineStyles } from './Baseline'

export { AppShell, ThemeToggle, usePreference } from './layout/AppShell'
export type { NavItem, AppShellProps } from './layout/AppShell'

export { PageHeader } from './components/PageHeader'
export { PaginationBar } from './components/PaginationBar'
export type { PaginationBarProps } from './components/PaginationBar'
export { StatusDot } from './components/StatusDot'

// Md (react-markdown) lives at 'console-ui/md' and the rich-text Editor (tiptap, mermaid,
// lowlight) at 'console-ui/editor'. They are separate entry points so apps that only use
// the shell/theme don't bundle those heavy trees. See tsup.config.ts / package.json exports.
