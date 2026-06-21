import React from 'react';
import { type AccentPaletteOption, type AccentTokenInput } from '../theme';
/**
 * Read and write a namespaced user preference from localStorage.
 * Must be used inside an AppShell (which provides the appId context).
 *
 * @example
 * const [width, setWidth] = usePreference('files:tree-width', 300)
 */
export declare function usePreference<T extends string | number | boolean>(key: string, defaultValue: T): [T, (v: T) => void];
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
    /** Project-specific accent tokens. Ignored when accentPalettes is provided. */
    accentTokens?: AccentTokenInput;
    /** Optional accent choices shown in the header and persisted by appId. */
    accentPalettes?: readonly AccentPaletteOption[];
    /** Initial accent palette id when no stored preference exists. Defaults to the first palette. */
    defaultAccentId?: string;
    /** Extra content in the header right area (before the theme toggle). */
    headerExtras?: React.ReactNode;
    /** Content shown in the header, immediately to the right of the app title. */
    headerLeft?: React.ReactNode;
    /** Initial theme when no stored preference exists. Defaults to 'dark'. */
    defaultMode?: 'dark' | 'light';
    /** Multiplies the shared typography scale. Defaults to 1. */
    fontScale?: number;
    /** Base rem used by the shared typography scale. Defaults to 0.8125rem. */
    fontBaseRem?: number;
    /** Set to false to hide the sidebar and mobile bottom nav. Defaults to true. */
    sidebar?: boolean;
    children: React.ReactNode;
}
export declare function ThemeToggle({ mode, onToggleTheme }: {
    mode: 'dark' | 'light';
    onToggleTheme: () => void;
}): import("react/jsx-runtime").JSX.Element;
export declare function AppShell({ appId, appName, nav, extraCssVars, accentTokens, accentPalettes, defaultAccentId, headerExtras, headerLeft, defaultMode, fontScale, fontBaseRem, sidebar, children, }: AppShellProps): import("react/jsx-runtime").JSX.Element;
