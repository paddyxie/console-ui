'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => { },
});
export function ThemeProvider({ children, defaultTheme = 'light' }) {
    const [theme, setTheme] = useState(defaultTheme);
    return (_jsx(ThemeContext.Provider, { value: { theme, toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light') }, children: children }));
}
export function useTheme() {
    return useContext(ThemeContext);
}
