import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Box, Typography, BottomNavigation, BottomNavigationAction, IconButton, Paper, Tooltip, useMediaQuery, useTheme as useMuiTheme, ThemeProvider, CssBaseline, } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { createAppTheme, SIDEBAR_W } from '../theme';
import { FontLoader, BaselineStyles } from '../Baseline';
/* ── constants ────────────────────────────────────────────────────────────── */
const MIN_W = 160;
const MAX_W = 360;
const COLLAPSED_W = 52;
/* ── localStorage helpers ─────────────────────────────────────────────────── */
function readPref(appId, key, fallback) {
    try {
        return localStorage.getItem(`${appId}:${key}`) ?? fallback;
    }
    catch {
        return fallback;
    }
}
function writePref(appId, key, value) {
    try {
        localStorage.setItem(`${appId}:${key}`, value);
    }
    catch { }
}
/* ── ThemeToggle (exported for standalone use) ────────────────────────────── */
export function ThemeToggle({ mode, onToggleTheme }) {
    return (_jsx(Tooltip, { title: `Switch to ${mode === 'dark' ? 'light' : 'dark'} theme`, children: _jsx(IconButton, { size: "small", onClick: onToggleTheme, sx: { color: 'var(--ui-text-secondary)', '&:hover': { color: 'primary.main' } }, children: mode === 'dark'
                ? _jsx(LightModeIcon, { sx: { fontSize: 18 } })
                : _jsx(DarkModeIcon, { sx: { fontSize: 18 } }) }) }));
}
/* ── NavRow ───────────────────────────────────────────────────────────────── */
function NavRow({ item, active, collapsed }) {
    const row = (_jsxs(Box, { component: NavLink, to: item.path, sx: {
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
        }, children: [_jsx(Box, { sx: { opacity: active ? 1 : 0.7, display: 'flex', flexShrink: 0 }, children: item.icon }), !collapsed && (_jsx(Typography, { sx: {
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '0.82rem', fontWeight: active ? 600 : 400, lineHeight: 1,
                }, children: item.label }))] }));
    return collapsed
        ? _jsx(Tooltip, { title: item.label, placement: "right", children: row })
        : row;
}
function findActive(nav, pathname) {
    return nav.find(n => pathname === n.path || pathname.startsWith(`${n.path}/`));
}
/* ── AppShellContent — rendered inside ThemeProvider ─────────────────────── */
function AppShellContent({ appId, appName, nav, headerExtras, mode, onToggleTheme, children }) {
    const muiTheme = useMuiTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
    const location = useLocation();
    const [sidebarW, setSidebarW] = useState(() => parseInt(readPref(appId, 'sidebar-width', String(SIDEBAR_W))));
    const [collapsed, setCollapsed] = useState(() => readPref(appId, 'sidebar-collapsed', 'false') === 'true');
    // Debounced sidebar width persistence
    const persistTimer = useRef(undefined);
    useEffect(() => {
        clearTimeout(persistTimer.current);
        persistTimer.current = setTimeout(() => writePref(appId, 'sidebar-width', String(sidebarW)), 300);
    }, [appId, sidebarW]);
    const toggleCollapsed = useCallback(() => {
        setCollapsed(c => {
            writePref(appId, 'sidebar-collapsed', String(!c));
            return !c;
        });
    }, [appId]);
    // Drag-to-resize
    const dragRef = useRef(null);
    const onDragStart = useCallback((e) => {
        e.preventDefault();
        dragRef.current = { startX: e.clientX, startW: sidebarW };
        const onMove = (ev) => {
            if (!dragRef.current)
                return;
            const w = Math.min(MAX_W, Math.max(MIN_W, dragRef.current.startW + ev.clientX - dragRef.current.startX));
            setSidebarW(w);
        };
        const onUp = () => {
            dragRef.current = null;
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    }, [sidebarW]);
    const activeNav = findActive(nav, location.pathname);
    const activePath = activeNav?.path ?? nav[0]?.path ?? '/';
    const pageTitle = activeNav?.label ?? '';
    const effectiveW = collapsed ? COLLAPSED_W : sidebarW;
    /* ── mobile ───────────────────────────────────────────────────────────────── */
    if (isMobile) {
        return (_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', height: '100dvh', background: 'var(--ui-bg)' }, children: [_jsxs(Box, { sx: {
                        display: 'flex', alignItems: 'center', gap: 1,
                        px: 2, py: 1.25,
                        background: 'var(--ui-surface-muted)',
                        borderBottom: '1px solid var(--ui-border)',
                        flexShrink: 0,
                    }, children: [_jsx(Typography, { sx: { fontFamily: '"Syne", sans-serif', fontSize: '0.9rem', fontWeight: 700, color: 'var(--ui-primary)' }, children: appName }), headerExtras, _jsx(Box, { sx: { ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.75 }, children: _jsx(ThemeToggle, { mode: mode, onToggleTheme: onToggleTheme }) })] }), _jsx(Box, { sx: { flex: 1, overflow: 'auto', minHeight: 0 }, children: children }), _jsx(Paper, { elevation: 0, sx: { background: 'var(--ui-surface-muted)', borderTop: '1px solid var(--ui-border)', flexShrink: 0 }, children: _jsx(BottomNavigation, { value: activePath, sx: {
                            background: 'transparent', height: 56,
                            '& .MuiBottomNavigationAction-root': {
                                color: 'var(--ui-text-secondary)', minWidth: 0, padding: '6px 0',
                                '&.Mui-selected': { color: 'var(--ui-primary)' },
                            },
                            '& .MuiBottomNavigationAction-label': {
                                fontFamily: '"Outfit", sans-serif', fontSize: '0.6rem',
                                '&.Mui-selected': { fontSize: '0.6rem' },
                            },
                        }, children: nav.map(item => (_jsx(BottomNavigationAction, { component: NavLink, to: item.path, value: item.path, label: item.label.split(' ')[0], icon: item.icon }, item.id))) }) })] }));
    }
    /* ── desktop ──────────────────────────────────────────────────────────────── */
    return (_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }, children: [_jsxs(Box, { sx: {
                    height: 48, flexShrink: 0,
                    display: 'flex', alignItems: 'center', px: 2,
                    background: 'var(--ui-surface-muted)',
                    borderBottom: '1px solid var(--ui-border)',
                    zIndex: 10,
                }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'baseline', gap: 1.5, mr: 'auto' }, children: [_jsx(Typography, { sx: { fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--ui-primary)', whiteSpace: 'nowrap' }, children: appName }), pageTitle && (_jsxs(_Fragment, { children: [_jsx(Typography, { sx: { color: 'var(--ui-text-disabled)', fontSize: '0.85rem' }, children: "|" }), _jsx(Typography, { sx: { fontFamily: '"Fira Code", monospace', fontSize: '0.78rem', color: 'var(--ui-text-secondary)', whiteSpace: 'nowrap' }, children: pageTitle })] }))] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [headerExtras, _jsx(ThemeToggle, { mode: mode, onToggleTheme: onToggleTheme })] })] }), _jsxs(Box, { sx: { flex: 1, display: 'flex', overflow: 'hidden' }, children: [_jsxs(Box, { sx: {
                            width: effectiveW, flexShrink: 0,
                            background: 'var(--ui-surface-muted)',
                            borderRight: '1px solid var(--ui-border)',
                            display: 'flex', flexDirection: 'column',
                            py: 1.5, px: collapsed ? 0.5 : 1,
                            overflow: 'hidden',
                            position: 'relative',
                            transition: 'width 0.15s ease',
                        }, children: [_jsx(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 0.25, flex: 1 }, children: nav.map(item => (_jsx(NavRow, { item: item, active: activePath === item.path, collapsed: collapsed }, item.id))) }), _jsx(Box, { sx: { display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end', pt: 1 }, children: _jsx(Tooltip, { title: collapsed ? 'Expand sidebar' : 'Collapse sidebar', placement: "right", children: _jsx(IconButton, { size: "small", onClick: toggleCollapsed, sx: { color: 'var(--ui-text-disabled)', '&:hover': { color: 'var(--ui-text-secondary)' } }, children: collapsed
                                            ? _jsx(ChevronRightIcon, { sx: { fontSize: 16 } })
                                            : _jsx(ChevronLeftIcon, { sx: { fontSize: 16 } }) }) }) }), !collapsed && (_jsx(Box, { onMouseDown: onDragStart, sx: {
                                    position: 'absolute', top: 0, right: 0,
                                    width: 4, height: '100%',
                                    cursor: 'col-resize',
                                    '&:hover': { background: 'var(--ui-primary-border)' },
                                    zIndex: 1,
                                } }))] }), _jsx(Box, { sx: { flex: 1, overflow: 'auto' }, children: children })] })] }));
}
/* ── AppShell (public) ────────────────────────────────────────────────────── */
export function AppShell({ appId, appName, nav, extraCssVars, headerExtras, defaultMode = 'dark', children }) {
    const [mode, setMode] = useState(() => readPref(appId, 'theme', defaultMode));
    const theme = useMemo(() => createAppTheme(mode, { extraCssVars }), [mode, extraCssVars]);
    const onToggleTheme = useCallback(() => {
        setMode(m => {
            const next = m === 'dark' ? 'light' : 'dark';
            writePref(appId, 'theme', next);
            return next;
        });
    }, [appId]);
    return (_jsxs(ThemeProvider, { theme: theme, children: [_jsx(FontLoader, {}), _jsx(BaselineStyles, {}), _jsx(CssBaseline, {}), _jsx(AppShellContent, { appId: appId, appName: appName, nav: nav, headerExtras: headerExtras, mode: mode, onToggleTheme: onToggleTheme, children: children })] }));
}
