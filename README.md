# console-ui

Shared theme, baseline styles, and layout shell for console-style dashboards.
Built on MUI + React. Used by `message-gateway`, `ai-agent-workspace`, `awc-bun`.

## Install

```bash
# Pin to a release tag (recommended)
bun add console-ui@git+https://github.com/paddyxie/console-ui.git#v0.1.0

# Or track latest main (dev only)
bun add console-ui@git+https://github.com/paddyxie/console-ui.git
```

## Usage

```tsx
import { ThemeProvider, CssBaseline } from '@mui/material'
import { createAppTheme, FontLoader, BaselineStyles, AppShell } from 'console-ui'
import type { NavItem } from 'console-ui'

const NAV: NavItem[] = [
  { id: 'home', label: 'Home', path: '/', icon: <HomeIcon /> },
]

function App() {
  const [mode, setMode] = useState<'dark' | 'light'>('dark')
  const theme = createAppTheme(mode)

  return (
    <ThemeProvider theme={theme}>
      <FontLoader />
      <BaselineStyles />
      <CssBaseline />
      <AppShell
        appId="my-app"
        appName="My Dashboard"
        nav={NAV}
        mode={mode}
        onToggleTheme={() => setMode(m => m === 'dark' ? 'light' : 'dark')}
      >
        <Routes>...</Routes>
      </AppShell>
    </ThemeProvider>
  )
}
```

## Project-specific theme extension

```ts
// your-project/src/theme.ts
import { createAppTheme as base } from 'console-ui'
import { alpha } from '@mui/material/styles'

export function createAppTheme(mode: 'dark' | 'light') {
  return base(mode, {
    extraCssVars: {
      '--ui-myproject-accent': '#ff6b35',
    }
  })
}
```

Accent colors can be customized at the theme layer. Pass static tokens for one
brand color, or mode-aware tokens when light mode needs a deeper color than dark
mode:

```ts
import { createAppTheme as base } from 'console-ui'

export function createAppTheme(mode: 'dark' | 'light') {
  return base(mode, {
    accentTokens: {
      dark: { primary: '#22d3ee', primaryLight: '#67e8f9', primaryDark: '#06b6d4' },
      light: { primary: '#0891b2', primaryLight: '#06b6d4', primaryDark: '#0e7490' },
    },
  })
}
```

For apps that should expose user-selectable theme colors, pass the shared
palette set to `AppShell`:

```tsx
import { AppShell, accentPalettes } from 'console-ui'

<AppShell
  appId="my-app"
  appName="My Dashboard"
  nav={NAV}
  accentPalettes={accentPalettes}
  defaultAccentId="cyan"
>
  <Routes>...</Routes>
</AppShell>
```

## CSS Variables

All theme values are on `:root` as `--ui-*`. Use these in `sx` props:

```tsx
<Box sx={{ color: 'var(--ui-primary)', background: 'var(--ui-surface-muted)' }} />
```

### Typography Scale

`console-ui` owns the shared console typography scale. The default base body size is
`0.8125rem` (13px at a 16px root), and related roles are derived from that base:

| Role | Variable |
|---|---|
| App title | `--ui-font-size-app-title` |
| Page title | `--ui-font-size-page-title` |
| Section/Dialog title | `--ui-font-size-section-title`, `--ui-font-size-dialog-title` |
| Body text | `--ui-font-size-body` |
| Secondary body | `--ui-font-size-body-small` |
| Table cell/head | `--ui-font-size-table-cell`, `--ui-font-size-table-head` |
| Metadata/chip/code | `--ui-font-size-meta`, `--ui-font-size-chip`, `--ui-font-size-code` |

Prefer MUI variants (`body1`, `body2`, `caption`, `subtitle2`, `h6`) and shared
components over page-local `fontSize` values. For app-wide resizing, pass
`fontScale` or `fontBaseRem` to `AppShell`, or to `createAppTheme()` when building
a custom theme.

## Exports

| Export | Description |
|---|---|
| `createAppTheme(mode, opts?)` | MUI theme with `--ui-*` CSS variables |
| `createTypographyScale(fontScale?, fontBaseRem?)` | Shared relative typography scale |
| `FontLoader` | Injects Google Fonts (Syne, Outfit, Fira Code) |
| `BaselineStyles` | Global reset + scrollbar styles |
| `AppShell` | Header + sidebar + content layout |
| `ThemeToggle` | Dark/light toggle button |
| `PaginationBar` | Shared numbered pagination with optional page-size select |
| `modeTokens` | Raw color tokens by mode |
| `accentTokens` | Brand/status color constants |
| `accentPalettes` | Built-in mode-aware accent palette options |
| `resolveAccentTokens(mode, input?)` | Resolves default, static, or mode-aware accent tokens |
| `SIDEBAR_W` | Default sidebar width (216px) |

## Releasing

```bash
# 1. Commit everything
git add -A && git commit -m "feat: ..."

# 2. Tag and push
git tag v0.X.Y
git push origin main --tags

# 3. Update consumers — change the tag in their package.json, then:
bun install
```

See `AGENTS.md` for full release checklist and architecture guide.
