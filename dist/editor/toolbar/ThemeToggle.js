'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useTheme } from '../ThemeContext';
export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    return (_jsx("button", { className: "toolbar-btn", onMouseDown: e => e.preventDefault(), onClick: toggleTheme, title: `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`, children: theme === 'light' ? _jsx(MdDarkMode, {}) : _jsx(MdLightMode, {}) }));
}
