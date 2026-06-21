import type { ReactNode } from 'react';
export type Theme = 'light' | 'dark';
interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}
export declare function ThemeProvider({ children, defaultTheme }: {
    children: ReactNode;
    defaultTheme?: Theme;
}): import("react/jsx-runtime").JSX.Element;
export declare function useTheme(): ThemeContextValue;
export {};
