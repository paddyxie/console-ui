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

## UI Design Rules

These rules apply to all consuming projects.

### 1. All form controls in the same context must be the same height

Never mix `size="small"` and `size="medium"` within one toolbar, form row, or filter bar.
Never use explicit `height` overrides to force a match — that value drifts whenever the
theme changes. Use consistent `size` props and let MUI size components naturally.

### 2. Use TextField, not Box + InputBase

For any text input that sits alongside a `Select`, use `TextField`. Never use
`Box + InputBase` with an explicit `height`.

Both `TextField` and `Select` are backed by `OutlinedInput`. With the same `size` prop
they will have the same height automatically.

```tsx
// ✅ Correct
<TextField size="small" label="Search" value={q} onChange={...} />
<FormControl size="small"><InputLabel>Role</InputLabel><Select .../></FormControl>

// ❌ Wrong — hardcoded height will always drift
<Box sx={{ height: 32, border: '...' }}>
  <InputBase ... />
</Box>
<Select size="small" ...>...</Select>
```

`InputBase` is for completely unstyled inputs inside a custom container that provides
its own border and sizing. Use it intentionally, not as a drop-in for `TextField`.

### 3. Label policy: all or nothing, default all

Within a single toolbar or form, every control must follow the same label pattern.

**Default: use labels everywhere.**
- `TextField` → `label` prop (floating label)
- `Select` → wrap in `FormControl + InputLabel`, pass `label` to Select for the notch

```tsx
// ✅ All labeled — consistent
<TextField size="small" label="Conversation ID" ... />
<FormControl size="small">
  <InputLabel>Platform</InputLabel>
  <Select label="Platform" ...>...</Select>
</FormControl>

// ❌ Mixed — 3 have labels, 2 have placeholder only
<TextField size="small" label="Conversation ID" ... />
<Select size="small" displayEmpty renderValue={...}>...</Select>
```

**When to skip labels (placeholder only):** only if every control in the context is
equally self-evident without a label (e.g. a single search box). In that case, none
should have labels.

Do not use `displayEmpty + renderValue` to fake a label on a Select. Use `InputLabel`.

### 4. Dialog header/footer style

`DialogTitle` gets a bottom border but no background color change. `DialogActions` gets
no border and no background color change. Both areas share the same background as the
dialog body (`--ui-surface`). This avoids the "banded" look where header and footer
appear as visually distinct panels.

`DialogTitle` padding is tightened to `py: 1.25` (vs MUI default 16px) for a more
compact header.

The theme (`MuiDialog` + `MuiDialogTitle` overrides) handles background, border, font,
font size, padding, and the header divider automatically. No `PaperProps` or font props
needed at the call site.

```tsx
// ✅ Correct — theme does the work
<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
  <DialogTitle>Title</DialogTitle>
  <DialogContent>...</DialogContent>
  <DialogActions sx={{ px: 3, pb: 2 }}>...</DialogActions>
</Dialog>

// With icon in title — only layout sx remains
<DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  <SomeIcon /> Title
</DialogTitle>

// ❌ Wrong — hardcoding what the theme already provides
<Dialog PaperProps={{ sx: { background: 'var(--ui-surface)', border: '...' } }}>
<DialogTitle sx={{ fontFamily: '"Syne"...', fontSize: '0.9rem', color: '...', borderBottom: '...' }}>
<DialogActions sx={{ background: 'var(--ui-surface-muted)', borderTop: '...' }}>
```

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
bun run build          # tsup → bundled dist/ (index.js + index.css + index.d.ts)

# Watch mode
bun run dev            # tsup --watch
```

The build is a **bundle** (tsup/esbuild), not a plain `tsc` transpile, with **three entry
points** so consumers only pay for what they import:

| Import path          | Contains                                  | Heavy deps bundled            |
| -------------------- | ----------------------------------------- | ----------------------------- |
| `console-ui`         | theme, AppShell, PageHeader, …            | none (~40 KB)                 |
| `console-ui/editor`  | rich-text `Editor`                        | tiptap, prosemirror, mermaid, lowlight, highlight.js |
| `console-ui/md`      | `Md` markdown renderer                    | react-markdown, remark-gfm    |

Consuming projects import the compiled `dist/` (via `exports`), never `src/`. Each bundle
inlines its own dependencies and leaves only the peers external (react, react-dom, @mui/*,
@emotion/*, react-router-dom). This is deliberate on two counts:
- **Zero `optimizeDeps` config** for consumers — nothing to pre-bundle or interop-fix.
- **Single instance** of React / MUI / emotion via the externalized peers (bundling them
  would duplicate instances and break hooks / theming).
- **No dead weight**: a shell-only app never pulls the editor or markdown trees.

CSS: only the editor has stylesheets; they are concatenated into `dist/editor.css`, exposed
as `console-ui/editor.css`. Import it once where you use the `Editor` (the core and `md`
entries have no CSS).

When adding a dependency to the library, put it in `devDependencies` (it gets bundled), and
add it to the `external` list in `tsup.config.ts` only if it is a peer the consumer must own.
If the dep is heavy and only used by one feature, consider a dedicated entry point for it.

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
- `@emotion/react` ^11
- `@emotion/styled` ^11
- `react-router-dom` ^6 or ^7

Do not bundle these. They are `peerDependencies` and stay external in `tsup.config.ts`,
so the library uses the consumer's single copy. Everything else is bundled into `dist`.

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
