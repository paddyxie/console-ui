# console-ui — Agent Architecture Guide

## Purpose & Scope

This library is the single source of truth for the visual foundation of all console dashboards.
It is **not** a generic component library — it is opinionated, purpose-built for internal
admin/monitoring UIs sharing a common design language.

Agents working in this repo must understand: changes here affect every consuming project.
Always think about backward compatibility. Small API additions are safe; renaming anything
exported is a breaking change.

---

## Consuming Projects

| Project            | Path                      | Status                        | Version |
|--------------------|---------------------------|-------------------------------|---------|
| message-gateway    | `../message-gateway/web`  | ✅ Fully migrated              | v0.2.0  |
| ai-agent-workspace | `../ai-agent-workspace/web` | 🔄 Needs migration           | —       |
| awc-bun            | `../awc-bun/web`          | 🔄 Needs migration            | —       |

When adding features, verify they work in message-gateway (the reference consumer).

---

## Source Structure

```
src/
  index.ts              Public API — all exports must go through here
  theme.ts              Design tokens + MUI theme factory
  Baseline.tsx          FontLoader + BaselineStyles
  layout/
    AppShell.tsx        Header + Sidebar + Content shell
  components/           Shared UI components (growing)
dist/                   TypeScript build output (committed for git releases)
```

**Rule:** Nothing is part of the library's public API unless it's exported from `src/index.ts`.

---

## Design Token Principles

1. **Two-tier tokens**: mode tokens (light/dark surface/text colors) + accent tokens
   (brand colors, status colors). Accent tokens do not change between modes.

2. **CSS variables are the contract**: MUI theme values and raw token objects are
   implementation details. The `--ui-*` CSS variables are what consuming projects
   depend on in their `sx` props and component styles.

3. **Naming convention**: `--ui-{category}-{variant}` where category is one of:
   `bg`, `surface`, `text`, `border`, `hover`, `field`, `overlay`, `primary`,
   `success`, `warning`, `error`. Add new variables following this pattern.

4. **Never remove or rename** a CSS variable without a major version bump.

---

## AppShell Design Decisions

**Header**: fixed 48px height, full width. Houses app name, optional extras slot, theme toggle.

**Sidebar**: resizable (drag right edge, 160–360px) and collapsible (icon-only, 52px).
All state persisted to `{appId}:sidebar-width` and `{appId}:sidebar-collapsed`.
Width writes are debounced 300ms (resize events are frequent).

**Mobile**: sidebar replaced by `BottomNavigation`. Breakpoint: `sm` (600px).

**Routing**: AppShell is router-agnostic but NavItems use `react-router-dom` NavLink
internally. Projects must wrap AppShell inside a `<BrowserRouter>`.

**NavItem contract**:
```ts
{ id: string; label: string; path: string; icon: ReactNode }
```
This interface is stable. Add optional fields only (never remove `id`, `label`, `path`, `icon`).

---

## Component Conventions

When adding a shared component:

1. **File**: `src/components/ComponentName.tsx`
2. **Export**: named export, added to `src/index.ts`
3. **Styling**: use `sx` prop with `--ui-*` CSS vars; no hardcoded colors
4. **Props**: keep minimal; use sensible defaults; no "everything configurable" trap
5. **No state management**: components are controlled or use local React state only
6. **No API calls**: zero network dependencies

Components are promoted from a consuming project when they appear in 2+ projects
or are clearly going to be reused.

---

## Preference Persistence

AppShell owns user preference persistence. The pattern:

- `appId` prop (e.g. `"message-gateway"`) namespaces all keys
- Keys: `{appId}:theme`, `{appId}:sidebar-width`, `{appId}:sidebar-collapsed`
- Storage: `localStorage`
- Read on mount, write on change — no debounce needed for theme/collapsed,
  debounce sidebar-width writes (resize events are frequent)

---

## Migration Guide (for agents migrating a project)

When migrating `ai-agent-workspace` or `awc-bun`:

1. **Add dependency**: `bun add console-ui@file:../../console-ui`
2. **Replace theme.ts**: delete local theme, create thin wrapper calling `createAppTheme()`
   with any project-specific `extraCssVars`
3. **Replace App layout**: remove hand-rolled header/sidebar code, use `AppShell`
4. **Replace FontLoader**: remove any manual Google Fonts `<link>` tags
5. **Remove duplicate CSS**: anything that duplicates `BaselineStyles` (scrollbars, box-sizing)
6. **Remove `optimizeDeps.include: ['console-ui']`** from `vite.config.ts` if present —
   console-ui ships compiled JS in `dist/`, no Vite pre-bundling needed
7. **Add no-flash script** to `index.html` (see below)
8. **Verify**: app renders, nav works, theme toggle works, mobile responsive

### No-flash script (required in index.html `<head>`)

Prevents the white/unstyled flash before React renders by pre-applying the correct
background color from localStorage before the JS bundle executes.

```html
<!-- no-flash: apply theme background before React renders -->
<script>
  (function () {
    try {
      var m = localStorage.getItem('{appId}:theme') === 'light' ? 'light' : 'dark'
      var s = document.documentElement.style
      s.background = m === 'dark' ? '#080a12' : '#f8fafc'
      s.color = m === 'dark' ? '#f1f5f9' : '#0f172a'
      s.colorScheme = m
    } catch (e) {}
  })()
</script>
```

Replace `{appId}` with the project's `appId` (e.g. `message-gateway`).
The color values (`#080a12`, `#f8fafc`) come from `modeTokens` in `src/theme.ts` — if
they ever change, update this script too.

---

## Publishing Checklist (for agents doing a release)

```
1. bun run build          — confirm dist/ is up to date
2. git add -A && git commit -m "release: vX.Y.Z"
3. git tag vX.Y.Z
4. git push origin main --tags
5. Update consuming projects: change #vOLD to #vX.Y.Z in package.json, run bun install
```

---

## What Agents Must NOT Do

- Add dependencies to `dependencies` (only `devDependencies` and `peerDependencies`)
- Import anything from consuming projects
- Add page-level or feature-specific components
- Hardcode colors or fonts — always go through `--ui-*` vars or MUI theme tokens
- Break the `--ui-*` CSS variable contract without a major version
- Commit `node_modules/`
