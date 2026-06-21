import type { PaletteMode } from '@mui/material/styles';
export declare const SIDEBAR_W = 216;
export declare const modeTokens: {
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
export type ModeTokens = (typeof modeTokens)[keyof typeof modeTokens];
export interface AccentTokens {
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
export type AccentTokenOverrides = Partial<AccentTokens>;
export type ModeAccentTokenOverrides = Partial<Record<PaletteMode, AccentTokenOverrides>>;
export type AccentTokenInput = AccentTokenOverrides | ModeAccentTokenOverrides;
export interface AccentPaletteOption {
    id: string;
    label: string;
    tokens: AccentTokenInput;
}
export declare const accentTokens: AccentTokens;
export declare const accentPalettes: readonly [{
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
export declare function resolveAccentTokens(mode: PaletteMode, input?: AccentTokenInput): AccentTokens;
export interface TypographyScale {
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
export declare function createTypographyScale(fontScale?: number, fontBaseRem?: number): TypographyScale;
export interface ThemeOptions {
    extraCssVars?: Record<string, string>;
    accentTokens?: AccentTokenInput;
    fontScale?: number;
    fontBaseRem?: number;
}
export declare function createAppTheme(mode: PaletteMode, opts?: ThemeOptions): import("@mui/material").Theme;
