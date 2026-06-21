'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
const ThemeContext = createContext('light');
export function ThemeProvider({ children, theme = 'light' }) {
    return _jsx(ThemeContext.Provider, { value: theme, children: children });
}
export function useTheme() {
    return { theme: useContext(ThemeContext) };
}
