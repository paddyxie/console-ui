import React from 'react';
export interface NavItem {
    id: string;
    label: string;
    path: string;
    icon: React.ReactNode;
}
export interface AppShellProps {
    /** Namespaces all localStorage keys — use a stable slug, e.g. "message-gateway". */
    appId: string;
    appName: string;
    nav: NavItem[];
    /** Project-specific CSS variables merged into the --ui-* namespace. */
    extraCssVars?: Record<string, string>;
    /** Extra content in the header right area (before the theme toggle). */
    headerExtras?: React.ReactNode;
    /** Initial theme when no stored preference exists. Defaults to 'dark'. */
    defaultMode?: 'dark' | 'light';
    children: React.ReactNode;
}
export declare function ThemeToggle({ mode, onToggleTheme }: {
    mode: 'dark' | 'light';
    onToggleTheme: () => void;
}): import("react/jsx-runtime").JSX.Element;
export declare function AppShell({ appId, appName, nav, extraCssVars, headerExtras, defaultMode, children }: AppShellProps): import("react/jsx-runtime").JSX.Element;
