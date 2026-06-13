import React, { useState, useCallback, useRef, useMemo, createContext, useContext } from 'react'
import {
  Box, Typography, BottomNavigation, BottomNavigationAction,
  IconButton, Paper, Tooltip, useMediaQuery, useTheme as useMuiTheme,
  ThemeProvider, CssBaseline,
} from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { createAppTheme, SIDEBAR_W } from '../theme'
import { FontLoader, BaselineStyles } from '../Baseline'

/* ── constants ────────────────────────────────────────────────────────────── */

const MIN_W = 160
const MAX_W = 360
const COLLAPSED_W = 52

/* ── Preference context + helpers ─────────────────────────────────────────── */

const AppIdContext = createContext<string>('')

function readPref(appId: string, key: string, fallback: string): string {
  try { return localStorage.getItem(`${appId}:${key}`) ?? fallback } catch { return fallback }
}
function writePref(appId: string, key: string, value: string): void {
  try { localStorage.setItem(`${appId}:${key}`, value) } catch {}
}

/**
 * Read and write a namespaced user preference from localStorage.
 * Must be used inside an AppShell (which provides the appId context).
 *
 * @example
 * const [width, setWidth] = usePreference('files:tree-width', 300)
 */
export function usePreference<T extends string | number | boolean>(
  key: string,
  defaultValue: T,
): [T, (v: T) => void] {
  const appId = useContext(AppIdContext)
  const [value, setValue] = useState<T>(() => {
    const raw = readPref(appId, key, '')
    if (raw === '') return defaultValue
    if (typeof defaultValue === 'number') return Number(raw) as T
    if (typeof defaultValue === 'boolean') return (raw === 'true') as T
    return raw as T
  })

  const set = useCallback((v: T) => {
    setValue(v)
    writePref(appId, key, String(v))
  }, [appId, key])

  return [value, set]
}

/* ── public types ─────────────────────────────────────────────────────────── */

export interface NavItem {
  id: string
  label: string
  path: string
  icon: React.ReactNode
}

export interface AppShellProps {
  /** Namespaces all localStorage keys — use a stable slug, e.g. "message-gateway". */
  appId: string
  appName: string
  nav: NavItem[]
  /** Project-specific CSS variables merged into the --ui-* namespace. */
  extraCssVars?: Record<string, string>
  /** Extra content in the header right area (before the theme toggle). */
  headerExtras?: React.ReactNode
  /** Content shown in the header, immediately to the right of the app title. */
  headerLeft?: React.ReactNode
  /** Initial theme when no stored preference exists. Defaults to 'dark'. */
  defaultMode?: 'dark' | 'light'
  /** Set to false to hide the sidebar and mobile bottom nav. Defaults to true. */
  sidebar?: boolean
  children: React.ReactNode
}

/* ── ThemeToggle (exported for standalone use) ────────────────────────────── */

export function ThemeToggle({ mode, onToggleTheme }: {
  mode: 'dark' | 'light'
  onToggleTheme: () => void
}) {
  return (
    <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} theme`}>
      <IconButton
        size="small"
        onClick={onToggleTheme}
        sx={{ color: 'var(--ui-text-secondary)', '&:hover': { color: 'primary.main' } }}
      >
        {mode === 'dark'
          ? <LightModeIcon sx={{ fontSize: 18 }} />
          : <DarkModeIcon sx={{ fontSize: 18 }} />}
      </IconButton>
    </Tooltip>
  )
}

/* ── NavRow ───────────────────────────────────────────────────────────────── */

function NavRow({ item, active, collapsed }: { item: NavItem; active: boolean; collapsed: boolean }) {
  const row = (
    <Box
      component={NavLink}
      to={item.path}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: collapsed ? 0 : 1.25,
        justifyContent: collapsed ? 'center' : 'flex-start',
        px: collapsed ? 0 : 1.5,
        py: 0.75,
        borderRadius: '6px',
        transition: 'background 0.15s ease, color 0.15s ease',
        textDecoration: 'none',
        color: active ? 'var(--ui-primary)' : 'var(--ui-text-secondary)',
        background: active ? 'var(--ui-primary-bg)' : 'transparent',
        borderLeft: active ? '3px solid var(--ui-primary)' : '3px solid transparent',
        boxShadow: active ? '0 0 8px var(--ui-primary-shadow)' : 'none',
        fontWeight: active ? 600 : 400,
        fontSize: '0.82rem',
        '&:hover': {
          color: active ? 'var(--ui-primary)' : 'var(--ui-text)',
          background: active ? 'var(--ui-primary-bg)' : 'var(--ui-hover)',
        },
      }}
    >
      <Box sx={{ opacity: active ? 1 : 0.7, display: 'flex', flexShrink: 0 }}>{item.icon}</Box>
      {!collapsed && (
        <Typography sx={{
          fontFamily: '"Outfit", sans-serif',
          fontSize: '0.82rem', fontWeight: active ? 600 : 400, lineHeight: 1,
        }}>
          {item.label}
        </Typography>
      )}
    </Box>
  )
  return collapsed
    ? <Tooltip title={item.label} placement="right">{row}</Tooltip>
    : row
}

function findActive(nav: NavItem[], pathname: string) {
  return nav.find(n => pathname === n.path || pathname.startsWith(`${n.path}/`))
}

/* ── AppShellContent — rendered inside ThemeProvider ─────────────────────── */

function AppShellContent({ appId, appName, nav, headerExtras, headerLeft, sidebar = true, mode, onToggleTheme, children }: {
  appId: string
  appName: string
  nav: NavItem[]
  headerExtras?: React.ReactNode
  headerLeft?: React.ReactNode
  sidebar?: boolean
  mode: 'dark' | 'light'
  onToggleTheme: () => void
  children: React.ReactNode
}) {
  const muiTheme = useMuiTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'))
  const location = useLocation()

  const [sidebarW, setSidebarW] = useState(() =>
    parseInt(readPref(appId, 'sidebar-width', String(SIDEBAR_W)))
  )
  const [collapsed, setCollapsed] = useState(() =>
    readPref(appId, 'sidebar-collapsed', 'false') === 'true'
  )

  const toggleCollapsed = useCallback(() => {
    setCollapsed(c => {
      writePref(appId, 'sidebar-collapsed', String(!c))
      return !c
    })
  }, [appId])

  // Drag-to-resize
  const dragRef = useRef<{ startX: number; startW: number; lastW: number } | null>(null)
  const onDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragRef.current = { startX: e.clientX, startW: sidebarW, lastW: sidebarW }
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return
      const w = Math.min(MAX_W, Math.max(MIN_W, dragRef.current.startW + ev.clientX - dragRef.current.startX))
      dragRef.current.lastW = w
      setSidebarW(w)
    }
    const onUp = () => {
      const finalW = dragRef.current?.lastW ?? sidebarW
      dragRef.current = null
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      writePref(appId, 'sidebar-width', String(finalW))
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [appId, sidebarW])

  const activeNav = findActive(nav, location.pathname)
  const activePath = activeNav?.path ?? nav[0]?.path ?? '/'
  const pageTitle = activeNav?.label ?? ''
  const effectiveW = collapsed ? COLLAPSED_W : sidebarW

  /* ── mobile ───────────────────────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: 'var(--ui-bg)' }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1,
          px: 2, py: 1.25,
          background: 'var(--ui-surface-muted)',
          borderBottom: '1px solid var(--ui-border)',
          flexShrink: 0,
        }}>
          <Typography sx={{ fontFamily: '"Syne", sans-serif', fontSize: '0.9rem', fontWeight: 700, color: 'var(--ui-primary)' }}>
            {appName}
          </Typography>
          {headerLeft}
          {headerExtras}
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <ThemeToggle mode={mode} onToggleTheme={onToggleTheme} />
          </Box>
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
          {children}
        </Box>

        {sidebar && <Paper elevation={0} sx={{ background: 'var(--ui-surface-muted)', borderTop: '1px solid var(--ui-border)', flexShrink: 0 }}>
          <BottomNavigation
            value={activePath}
            sx={{
              background: 'transparent', height: 56,
              '& .MuiBottomNavigationAction-root': {
                color: 'var(--ui-text-secondary)', minWidth: 0, padding: '6px 0',
                '&.Mui-selected': { color: 'var(--ui-primary)' },
              },
              '& .MuiBottomNavigationAction-label': {
                fontFamily: '"Outfit", sans-serif', fontSize: '0.6rem',
                '&.Mui-selected': { fontSize: '0.6rem' },
              },
            }}
          >
            {nav.map(item => (
              <BottomNavigationAction
                key={item.id}
                component={NavLink}
                to={item.path}
                value={item.path}
                label={item.label.split(' ')[0]}
                icon={item.icon}
              />
            ))}
          </BottomNavigation>
        </Paper>}
      </Box>
    )
  }

  /* ── desktop ──────────────────────────────────────────────────────────────── */
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{
        height: 48, flexShrink: 0,
        display: 'flex', alignItems: 'center', px: 2,
        background: 'var(--ui-surface-muted)',
        borderBottom: '1px solid var(--ui-border)',
        zIndex: 10,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 'auto', minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
            <Typography sx={{ fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--ui-primary)', whiteSpace: 'nowrap' }}>
              {appName}
            </Typography>
            {pageTitle && (
              <>
                <Typography sx={{ color: 'var(--ui-text-disabled)', fontSize: '0.85rem' }}>|</Typography>
                <Typography sx={{ fontFamily: '"Fira Code", monospace', fontSize: '0.78rem', color: 'var(--ui-text-secondary)', whiteSpace: 'nowrap' }}>
                  {pageTitle}
                </Typography>
              </>
            )}
          </Box>
          {headerLeft}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {headerExtras}
          <ThemeToggle mode={mode} onToggleTheme={onToggleTheme} />
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar */}
        {sidebar && <Box sx={{
          width: effectiveW, flexShrink: 0,
          background: 'var(--ui-surface-muted)',
          borderRight: '1px solid var(--ui-border)',
          display: 'flex', flexDirection: 'column',
          py: 1.5, px: collapsed ? 0.5 : 1,
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Nav items */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, flex: 1 }}>
            {nav.map(item => (
              <NavRow key={item.id} item={item} active={activePath === item.path} collapsed={collapsed} />
            ))}
          </Box>

          {/* Collapse toggle */}
          <Box sx={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end', pt: 1 }}>
            <Tooltip title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} placement="right">
              <IconButton
                size="small"
                onClick={toggleCollapsed}
                sx={{ color: 'var(--ui-text-disabled)', '&:hover': { color: 'var(--ui-text-secondary)' } }}
              >
                {collapsed
                  ? <ChevronRightIcon sx={{ fontSize: 16 }} />
                  : <ChevronLeftIcon sx={{ fontSize: 16 }} />}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Drag handle — only when expanded */}
          {!collapsed && (
            <Box
              onMouseDown={onDragStart}
              sx={{
                position: 'absolute', top: 0, right: 0,
                width: 4, height: '100%',
                cursor: 'col-resize',
                '&:hover': { background: 'var(--ui-primary-border)' },
                zIndex: 1,
              }}
            />
          )}
        </Box>}

        {/* Main content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

/* ── AppShell (public) ────────────────────────────────────────────────────── */

export function AppShell({ appId, appName, nav, extraCssVars, headerExtras, headerLeft, defaultMode = 'dark', sidebar, children }: AppShellProps) {
  const [mode, setMode] = useState<'dark' | 'light'>(() =>
    readPref(appId, 'theme', defaultMode) as 'dark' | 'light'
  )

  const theme = useMemo(() => createAppTheme(mode, { extraCssVars }), [mode, extraCssVars])

  const onToggleTheme = useCallback(() => {
    setMode(m => {
      const next = m === 'dark' ? 'light' : 'dark'
      writePref(appId, 'theme', next)
      return next
    })
  }, [appId])

  return (
    <AppIdContext.Provider value={appId}>
    <ThemeProvider theme={theme}>
      <FontLoader />
      <BaselineStyles />
      <CssBaseline />
      <AppShellContent
        appId={appId}
        appName={appName}
        nav={nav}
        headerExtras={headerExtras}
        headerLeft={headerLeft}
        sidebar={sidebar}
        mode={mode}
        onToggleTheme={onToggleTheme}
      >
        {children}
      </AppShellContent>
    </ThemeProvider>
    </AppIdContext.Provider>
  )
}
