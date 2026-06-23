import * as _mui_material from '@mui/material';
import { PaletteMode } from '@mui/material/styles';
import * as react_jsx_runtime from 'react/jsx-runtime';
import React__default, { ReactNode } from 'react';

declare const SIDEBAR_W = 216;
declare const modeTokens: {
    readonly dark: {
        readonly bg: "#080a12";
        readonly surface: "#111827";
        readonly surfaceMuted: "#0d0f1a";
        readonly text: "#f1f5f9";
        readonly textSoft: "#e2e8f0";
        readonly textMuted: "#cbd5e1";
        readonly textSecondary: "#a8b3c7";
        readonly textTertiary: "#94a3b8";
        readonly textDisabled: "#64748b";
        readonly emptyIcon: "#475569";
        readonly border: "rgba(255,255,255,0.07)";
        readonly borderSubtle: "rgba(255,255,255,0.05)";
        readonly borderStrong: "rgba(255,255,255,0.1)";
        readonly borderHover: "rgba(255,255,255,0.2)";
        readonly hover: "rgba(255,255,255,0.04)";
        readonly hoverSubtle: "rgba(255,255,255,0.02)";
        readonly field: "rgba(255,255,255,0.05)";
        readonly overlay: "rgba(2,6,23,0.72)";
        readonly tooltip: "#1e2333";
        readonly neutralChipBg: "rgba(100,116,139,0.1)";
        readonly neutralChipBorder: "rgba(100,116,139,0.2)";
        readonly selectedText: "#e0e7ff";
        readonly selectedTextSoft: "#a5b4fc";
    };
    readonly light: {
        readonly bg: "#f8fafc";
        readonly surface: "#ffffff";
        readonly surfaceMuted: "#f1f5f9";
        readonly text: "#0f172a";
        readonly textSoft: "#1e293b";
        readonly textMuted: "#334155";
        readonly textSecondary: "#475569";
        readonly textTertiary: "#64748b";
        readonly textDisabled: "#94a3b8";
        readonly emptyIcon: "#94a3b8";
        readonly border: "rgba(15,23,42,0.1)";
        readonly borderSubtle: "rgba(15,23,42,0.07)";
        readonly borderStrong: "rgba(15,23,42,0.14)";
        readonly borderHover: "rgba(15,23,42,0.24)";
        readonly hover: "rgba(15,23,42,0.05)";
        readonly hoverSubtle: "rgba(15,23,42,0.035)";
        readonly field: "rgba(15,23,42,0.04)";
        readonly overlay: "rgba(255,255,255,0.82)";
        readonly tooltip: "#111827";
        readonly neutralChipBg: "rgba(100,116,139,0.1)";
        readonly neutralChipBorder: "rgba(100,116,139,0.22)";
        readonly selectedText: "#3730a3";
        readonly selectedTextSoft: "#4f46e5";
    };
};
type ModeTokens = (typeof modeTokens)[keyof typeof modeTokens];
interface AccentTokens {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    primaryAlt: string;
    success: string;
    warning: string;
    warningAlt: string;
    error: string;
    errorDark: string;
    white: string;
}
type AccentTokenOverrides = Partial<AccentTokens>;
type ModeAccentTokenOverrides = Partial<Record<PaletteMode, AccentTokenOverrides>>;
type AccentTokenInput = AccentTokenOverrides | ModeAccentTokenOverrides;
interface AccentPaletteOption {
    id: string;
    label: string;
    tokens: AccentTokenInput;
}
declare const accentTokens: AccentTokens;
declare const accentPalettes: readonly [{
    readonly id: "cyan";
    readonly label: "Cyan";
    readonly tokens: {
        readonly dark: {
            readonly primary: "#22d3ee";
            readonly primaryLight: "#67e8f9";
            readonly primaryDark: "#06b6d4";
            readonly primaryAlt: "#38bdf8";
        };
        readonly light: {
            readonly primary: "#0891b2";
            readonly primaryLight: "#06b6d4";
            readonly primaryDark: "#0e7490";
            readonly primaryAlt: "#0284c7";
        };
    };
}, {
    readonly id: "violet";
    readonly label: "Violet";
    readonly tokens: {
        readonly dark: {
            readonly primary: "#8b5cf6";
            readonly primaryLight: "#a78bfa";
            readonly primaryDark: "#7c3aed";
            readonly primaryAlt: "#818cf8";
        };
        readonly light: {
            readonly primary: "#7c3aed";
            readonly primaryLight: "#8b5cf6";
            readonly primaryDark: "#6d28d9";
            readonly primaryAlt: "#4f46e5";
        };
    };
}, {
    readonly id: "emerald";
    readonly label: "Emerald";
    readonly tokens: {
        readonly dark: {
            readonly primary: "#10b981";
            readonly primaryLight: "#34d399";
            readonly primaryDark: "#059669";
            readonly primaryAlt: "#14b8a6";
        };
        readonly light: {
            readonly primary: "#059669";
            readonly primaryLight: "#10b981";
            readonly primaryDark: "#047857";
            readonly primaryAlt: "#0d9488";
        };
    };
}, {
    readonly id: "amber";
    readonly label: "Amber";
    readonly tokens: {
        readonly dark: {
            readonly primary: "#f59e0b";
            readonly primaryLight: "#fbbf24";
            readonly primaryDark: "#d97706";
            readonly primaryAlt: "#eab308";
        };
        readonly light: {
            readonly primary: "#d97706";
            readonly primaryLight: "#f59e0b";
            readonly primaryDark: "#b45309";
            readonly primaryAlt: "#ca8a04";
        };
    };
}, {
    readonly id: "rose";
    readonly label: "Rose";
    readonly tokens: {
        readonly dark: {
            readonly primary: "#f43f5e";
            readonly primaryLight: "#fb7185";
            readonly primaryDark: "#e11d48";
            readonly primaryAlt: "#ec4899";
        };
        readonly light: {
            readonly primary: "#e11d48";
            readonly primaryLight: "#f43f5e";
            readonly primaryDark: "#be123c";
            readonly primaryAlt: "#db2777";
        };
    };
}, {
    readonly id: "slate";
    readonly label: "Slate";
    readonly tokens: {
        readonly dark: {
            readonly primary: "#94a3b8";
            readonly primaryLight: "#cbd5e1";
            readonly primaryDark: "#64748b";
            readonly primaryAlt: "#38bdf8";
        };
        readonly light: {
            readonly primary: "#475569";
            readonly primaryLight: "#64748b";
            readonly primaryDark: "#334155";
            readonly primaryAlt: "#0f766e";
        };
    };
}];
declare function resolveAccentTokens(mode: PaletteMode, input?: AccentTokenInput): AccentTokens;
interface TypographyScale {
    appTitle: string;
    pageTitle: string;
    sectionTitle: string;
    dialogTitle: string;
    body: string;
    bodySmall: string;
    labelShrink: string;
    nav: string;
    topNav: string;
    meta: string;
    micro: string;
    control: string;
    controlSmall: string;
    tableCell: string;
    tableHead: string;
    chip: string;
    tooltip: string;
    code: string;
    markdownH1: string;
    markdownH2: string;
    markdownH3: string;
}
declare function createTypographyScale(fontScale?: number, fontBaseRem?: number): TypographyScale;
interface ThemeOptions {
    extraCssVars?: Record<string, string>;
    accentTokens?: AccentTokenInput;
    fontScale?: number;
    fontBaseRem?: number;
}
declare function createAppTheme(mode: PaletteMode, opts?: ThemeOptions): _mui_material.Theme;

/** Injects Google Fonts <link> into <head> exactly once. */
declare function FontLoader(): null;
/** Global reset + scrollbar styles (uses --ui-* css vars for light/dark). */
declare function BaselineStyles(): react_jsx_runtime.JSX.Element;

/**
 * Read and write a namespaced user preference from localStorage.
 * Must be used inside an AppShell (which provides the appId context).
 *
 * @example
 * const [width, setWidth] = usePreference('files:tree-width', 300)
 */
declare function usePreference<T extends string | number | boolean>(key: string, defaultValue: T): [T, (v: T) => void];
interface NavItem {
    id: string;
    label: string;
    path: string;
    icon: React__default.ReactNode;
}
interface AppShellProps {
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
    headerExtras?: React__default.ReactNode;
    /** Content shown in the header, immediately to the right of the app title. */
    headerLeft?: React__default.ReactNode;
    /** Initial theme when no stored preference exists. Defaults to 'dark'. */
    defaultMode?: 'dark' | 'light';
    /** Multiplies the shared typography scale. Defaults to 1. */
    fontScale?: number;
    /** Base rem used by the shared typography scale. Defaults to 0.8125rem. */
    fontBaseRem?: number;
    /** Set to false to hide the sidebar and mobile bottom nav. Defaults to true. */
    sidebar?: boolean;
    children: React__default.ReactNode;
}
declare function ThemeToggle({ mode, onToggleTheme }: {
    mode: 'dark' | 'light';
    onToggleTheme: () => void;
}): react_jsx_runtime.JSX.Element;
declare function AppShell({ appId, appName, nav, extraCssVars, accentTokens, accentPalettes, defaultAccentId, headerExtras, headerLeft, defaultMode, fontScale, fontBaseRem, sidebar, children, }: AppShellProps): react_jsx_runtime.JSX.Element;

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    /** Optional content (e.g. a Button) placed on the right side. */
    action?: ReactNode;
}
/**
 * Standard page-level header bar used at the top of content areas.
 * Renders a title, optional subtitle, and optional action slot.
 */
declare function PageHeader({ title, subtitle, action }: PageHeaderProps): react_jsx_runtime.JSX.Element;

interface PaginationBarProps {
    currentPage: number;
    totalPages: number;
    disabled?: boolean;
    maxVisiblePages?: number;
    pageSize?: number;
    pageSizeOptions?: number[];
    pageSizeLabel?: string;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
}
declare function PaginationBar({ currentPage, totalPages, disabled, maxVisiblePages, pageSize, pageSizeOptions, pageSizeLabel, onPageChange, onPageSizeChange, }: PaginationBarProps): react_jsx_runtime.JSX.Element;

interface StatusDotProps {
    /** CSS color value — typically a `var(--ui-*)` token or a status color. */
    color: string;
    /** Show a soft glow matching the dot color. */
    glow?: boolean;
    /** Diameter in pixels. Defaults to 8. */
    size?: number;
}
/** Small circular status indicator. */
declare function StatusDot({ color, glow, size }: StatusDotProps): react_jsx_runtime.JSX.Element;

export { type AccentPaletteOption, type AccentTokenInput, type AccentTokenOverrides, type AccentTokens, AppShell, type AppShellProps, BaselineStyles, FontLoader, type ModeAccentTokenOverrides, type ModeTokens, type NavItem, PageHeader, PaginationBar, type PaginationBarProps, SIDEBAR_W, StatusDot, type ThemeOptions, ThemeToggle, type TypographyScale, accentPalettes, accentTokens, createAppTheme, createTypographyScale, modeTokens, resolveAccentTokens, usePreference };
