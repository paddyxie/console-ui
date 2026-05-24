# console-ui

Shared theme, baseline styles, and layout shell for console-style dashboards built with MUI + React.

## Install

```bash
# via git
bun add console-ui@git+https://github.com/<org>/console-ui.git#v0.1.0

# or via local path during development
bun add console-ui@file:../console-ui
```

## Usage

```tsx
import { ThemeProvider, CssBaseline } from '@mui/material'
import { createAppTheme, FontLoader, BaselineStyles, AppShell } from 'console-ui'
import type { NavItem } from 'console-ui'

const NAV: NavItem[] = [
  { id: 'home',   label: 'Home',   path: '/',         icon: <HomeIcon /> },
  { id: 'users',  label: 'Users',  path: '/users',    icon: <UsersIcon /> },
]

function App() {
  const [mode, setMode] = useState<'dark' | 'light'>('dark')
  const theme = createAppTheme(mode, {
    extraCssVars: {
      // project-specific CSS variables
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <FontLoader />
      <BaselineStyles />
      <CssBaseline />
      <AppShell
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

## Exports

| Export | Description |
|---|---|
| `createAppTheme(mode, opts?)` | Returns a MUI theme with CSS variables (`--ui-*`) |
| `FontLoader` | Component that injects Google Fonts (Syne, Outfit, Fira Code) |
| `BaselineStyles` | Global reset + scrollbar styles |
| `AppShell` | Header + sidebar + content layout (with mobile support) |
| `ThemeToggle` | Dark/light mode toggle button |
| `modeTokens` | Raw color tokens by mode |
| `accentTokens` | Accent color constants |
| `SIDEBAR_W` | Sidebar width constant (216px) |

## CSS Variables

All theme values are exposed as `--ui-*` CSS variables on `:root`, so any component can reference them:

```tsx
<Box sx={{ color: 'var(--ui-primary)', background: 'var(--ui-surface-muted)' }}>
```

## Build

```bash
bun run build   # outputs to dist/
```
