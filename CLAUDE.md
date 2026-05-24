# console-ui — Developer Guide

## What This Is

`console-ui` is the shared frontend UI library for all internal console-style dashboards
(`message-gateway`, `ai-agent-workspace`, `awc-bun`, and future projects).

It owns: design tokens, global baseline styles, font loading, the MUI theme configuration,
the application shell layout, and shared UI components. Individual projects provide their
own page/feature code and may extend the theme with project-specific CSS variables.

**Goal:** one place to change something visual, all projects stay consistent.

---

## Architecture Layers

```
Layer 1 – Design Tokens      src/theme.ts          Color palette, CSS vars (--ui-*)
Layer 2 – Baseline           src/Baseline.tsx       CSS reset, fonts, scrollbars
Layer 3 – App Shell          src/layout/AppShell.tsx  Header + sidebar + content layout
Layer 4 – Shared Components  src/components/        Reusable UI pieces (growing over time)
```

Each layer only depends on layers below it. Projects import from any layer they need.

---

## CSS Variables Contract

All theme values are exposed as `--ui-*` CSS custom properties on `:root`. This is the
primary styling contract between the library and consuming projects. Projects must use
these variables for any theme-sensitive styling — never hardcode color values.

See `src/theme.ts` for the full variable list. The namespace is stable; variables are
only added (never renamed or removed) without a major version bump.

Projects may add their own variables via `extraCssVars` in `createAppTheme()`.

---

## User Preference Persistence

AppShell persists user preferences to `localStorage` using namespaced keys:

```
{appId}:theme           — 'dark' | 'light'
{appId}:sidebar-width   — number (px), when sidebar is resizable
{appId}:sidebar-collapsed — 'true' | 'false'
```

The consuming project passes its `appId` to `AppShell`. Defaults are applied when no
stored value exists.

---

## Adding a Component

Before adding a component to this library, ask:
- Is it used in 2+ projects, or very likely to be?
- Is it purely UI (no business logic, no API calls)?
- Can it be styled entirely via `--ui-*` CSS variables and MUI sx?

If yes: add it to `src/components/`, export from `src/index.ts`.
If no: keep it in the consuming project.

---

## Development Workflow

```bash
# Local development — link from a consuming project
bun add console-ui@file:../../console-ui

# Build
bun run build          # tsc → dist/

# Watch mode
bun run dev            # tsc --watch
```

Consuming projects reference `src/index.ts` directly (via `exports."."."import"`),
so `dist/` is only needed for TypeScript types during development and for git releases.

---

## Releasing

Releases are distributed via git tags. No npm registry needed.

```bash
git tag v0.x.y
git push origin v0.x.y
```

Consumers pin to a tag in their `package.json`:
```json
"console-ui": "git+https://github.com/paddyxie/console-ui.git#v0.x.y"
```

**Versioning intent:**
- Patch `0.x.Y`: bug fixes, additive CSS vars, new components
- Minor `0.X.0`: new layout features, new props on existing components
- Major `X.0.0`: breaking changes to CSS var names, component APIs, or MUI peer dep version

---

## Peer Dependencies

Projects must provide:
- `react` ^18 or ^19
- `react-dom` ^18 or ^19
- `@mui/material` ^5 or ^6
- `@mui/icons-material` ^5 or ^6
- `react-router-dom` ^6 or ^7

Do not bundle these. They are `peerDependencies`.

---

## Project Extension Pattern

Each consuming project has a thin `theme.ts` that calls `createAppTheme()` and passes
project-specific CSS variables:

```ts
// message-gateway/web/src/theme.ts
import { createAppTheme } from 'console-ui'
export function createAppTheme(mode) {
  return baseCreateTheme(mode, {
    extraCssVars: {
      '--ui-telegram': '#229ED9',
      // ...
    }
  })
}
```

This is the only sanctioned way to extend the theme. Do not fork `theme.ts`.

---

## What Does NOT Belong Here

- Business logic or API calls
- Page-level components (pages stay in each project)
- Project-specific state management
- Feature-specific UI (e.g., a message bubble is message-gateway's responsibility)
- Any component used in only one project
