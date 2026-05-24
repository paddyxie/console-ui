# console-ui

Shared theme, baseline styles, and layout shell for console-style dashboards.
Built on MUI + React. Used by `message-gateway`, `ai-agent-workspace`, `awc-bun`.

## Install

```bash
# Pin to a release tag (recommended)
bun add console-ui@git+ssh://git@github.com/paddyxie/console-ui.git#v0.1.0

# Or track latest main (dev only)
bun add console-ui@git+ssh://git@github.com/paddyxie/console-ui.git
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

## CSS Variables

All theme values are on `:root` as `--ui-*`. Use these in `sx` props:

```tsx
<Box sx={{ color: 'var(--ui-primary)', background: 'var(--ui-surface-muted)' }} />
```

## Exports

| Export | Description |
|---|---|
| `createAppTheme(mode, opts?)` | MUI theme with `--ui-*` CSS variables |
| `FontLoader` | Injects Google Fonts (Syne, Outfit, Fira Code) |
| `BaselineStyles` | Global reset + scrollbar styles |
| `AppShell` | Header + sidebar + content layout |
| `ThemeToggle` | Dark/light toggle button |
| `modeTokens` | Raw color tokens by mode |
| `accentTokens` | Brand/status color constants |
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
