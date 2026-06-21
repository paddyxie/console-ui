import type { ReactNode } from 'react';
export type Theme = 'light' | 'dark';
export declare function ThemeProvider({ children, theme }: {
    children: ReactNode;
    theme?: Theme;
}): import("react/jsx-runtime").JSX.Element;
export declare function useTheme(): {
    theme: Theme;
};
