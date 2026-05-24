import React from 'react'
import {
  Box, Typography, BottomNavigation, BottomNavigationAction,
  IconButton, Paper, Tooltip, useMediaQuery, useTheme,
} from '@mui/material'
import type { PaletteMode } from '@mui/material/styles'
import { NavLink, useLocation } from 'react-router-dom'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { SIDEBAR_W } from '../theme'

/* ── public types ─────────────────────────────────────────────────────────── */

export interface NavItem {
  id: string
  label: string
  path: string
  icon: React.ReactNode
}

export interface AppShellProps {
  appName: string
  nav: NavItem[]
  mode: PaletteMode
  onToggleTheme: () => void
  /** Extra content rendered in the header right area (before the theme toggle). */
  headerExtras?: React.ReactNode
  children: React.ReactNode
}

/* ── helpers ──────────────────────────────────────────────────────────────── */

export function ThemeToggle({ mode, onToggleTheme }: {
  mode: PaletteMode
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

function NavRow({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Box
      component={NavLink}
      to={item.path}
      sx={{
        display: 'flex', alignItems: 'center', gap: 1.25,
        px: 1.5, py: 0.75, borderRadius: '6px',
        transition: 'all 0.15s ease',
        textDecoration: 'none',
        color: active ? 'var(--ui-primary)' : 'var(--ui-text-secondary)',
        background: active ? 'var(--ui-primary-bg)' : 'transparent',
        borderLeft: active
          ? '3px solid var(--ui-primary)'
          : '3px solid transparent',
        boxShadow: active ? '0 0 8px var(--ui-primary-shadow)' : 'none',
        fontWeight: active ? 600 : 400,
        fontSize: '0.82rem',
        '&:hover': {
          color: active ? 'var(--ui-primary)' : 'var(--ui-text)',
          background: active ? 'var(--ui-primary-bg)' : 'var(--ui-hover)',
        },
      }}
    >
      <Box sx={{ opacity: active ? 1 : 0.7, display: 'flex' }}>{item.icon}</Box>
      <Typography sx={{
        fontFamily: '"Outfit", sans-serif',
        fontSize: '0.82rem', fontWeight: active ? 600 : 400, lineHeight: 1,
      }}>
        {item.label}
      </Typography>
    </Box>
  )
}

function findActive(nav: NavItem[], pathname: string) {
  return nav.find(n => pathname === n.path || pathname.startsWith(`${n.path}/`))
}

/* ── AppShell ─────────────────────────────────────────────────────────────── */

export function AppShell({ appName, nav, mode, onToggleTheme, headerExtras, children }: AppShellProps) {
  const muiTheme = useTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'))
  const location = useLocation()
  const activeNav = findActive(nav, location.pathname)
  const activePath = activeNav?.path ?? nav[0]?.path ?? '/'
  const pageTitle = activeNav?.label ?? ''

  /* ── mobile ─────────────────────────────────────────────────────────────── */
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
          <Typography sx={{
            fontFamily: '"Syne", sans-serif',
            fontSize: '0.9rem', fontWeight: 700, color: 'var(--ui-primary)',
          }}>
            {appName}
          </Typography>
          {headerExtras}
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <ThemeToggle mode={mode} onToggleTheme={onToggleTheme} />
          </Box>
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
          {children}
        </Box>

        <Paper elevation={0} sx={{
          background: 'var(--ui-surface-muted)',
          borderTop: '1px solid var(--ui-border)',
          flexShrink: 0,
        }}>
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
        </Paper>
      </Box>
    )
  }

  /* ── desktop ────────────────────────────────────────────────────────────── */
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
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mr: 'auto' }}>
          <Typography sx={{
            fontFamily: '"Syne", sans-serif', fontWeight: 700,
            fontSize: '0.95rem', color: 'var(--ui-primary)', whiteSpace: 'nowrap',
          }}>
            {appName}
          </Typography>
          {pageTitle && (
            <>
              <Typography sx={{ color: 'var(--ui-text-disabled)', fontSize: '0.85rem' }}>|</Typography>
              <Typography sx={{
                fontFamily: '"Fira Code", monospace', fontSize: '0.78rem',
                color: 'var(--ui-text-secondary)', whiteSpace: 'nowrap',
              }}>
                {pageTitle}
              </Typography>
            </>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {headerExtras}
          <ThemeToggle mode={mode} onToggleTheme={onToggleTheme} />
        </Box>
      </Box>

      {/* Body: sidebar + content */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <Box sx={{
          width: SIDEBAR_W, flexShrink: 0,
          background: 'var(--ui-surface-muted)',
          borderRight: '1px solid var(--ui-border)',
          display: 'flex', flexDirection: 'column',
          py: 1.5, px: 1,
          overflow: 'hidden',
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
            {nav.map(item => (
              <NavRow key={item.id} item={item} active={activePath === item.path} />
            ))}
          </Box>
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
