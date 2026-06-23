import * as __cu_react from "react";
import * as __cu_react_dom from "react-dom";
const require = (id) => {
  if (id === "react") return __cu_react;
  if (id === "react-dom") return __cu_react_dom;
  throw new Error("console-ui: unexpected require(\"" + id + "\")");
};
import "./chunk-CKEHATKM.js";

// src/theme.ts
import { createTheme, alpha } from "@mui/material/styles";
var SIDEBAR_W = 216;
var modeTokens = {
  dark: {
    bg: "#080a12",
    surface: "#111827",
    surfaceMuted: "#0d0f1a",
    text: "#f1f5f9",
    textSoft: "#e2e8f0",
    textMuted: "#cbd5e1",
    textSecondary: "#a8b3c7",
    textTertiary: "#94a3b8",
    textDisabled: "#64748b",
    emptyIcon: "#475569",
    border: "rgba(255,255,255,0.07)",
    borderSubtle: "rgba(255,255,255,0.05)",
    borderStrong: "rgba(255,255,255,0.1)",
    borderHover: "rgba(255,255,255,0.2)",
    hover: "rgba(255,255,255,0.04)",
    hoverSubtle: "rgba(255,255,255,0.02)",
    field: "rgba(255,255,255,0.05)",
    overlay: "rgba(2,6,23,0.72)",
    tooltip: "#1e2333",
    neutralChipBg: "rgba(100,116,139,0.1)",
    neutralChipBorder: "rgba(100,116,139,0.2)",
    selectedText: "#e0e7ff",
    selectedTextSoft: "#a5b4fc"
  },
  light: {
    bg: "#f8fafc",
    surface: "#ffffff",
    surfaceMuted: "#f1f5f9",
    text: "#0f172a",
    textSoft: "#1e293b",
    textMuted: "#334155",
    textSecondary: "#475569",
    textTertiary: "#64748b",
    textDisabled: "#94a3b8",
    emptyIcon: "#94a3b8",
    border: "rgba(15,23,42,0.1)",
    borderSubtle: "rgba(15,23,42,0.07)",
    borderStrong: "rgba(15,23,42,0.14)",
    borderHover: "rgba(15,23,42,0.24)",
    hover: "rgba(15,23,42,0.05)",
    hoverSubtle: "rgba(15,23,42,0.035)",
    field: "rgba(15,23,42,0.04)",
    overlay: "rgba(255,255,255,0.82)",
    tooltip: "#111827",
    neutralChipBg: "rgba(100,116,139,0.1)",
    neutralChipBorder: "rgba(100,116,139,0.22)",
    selectedText: "#3730a3",
    selectedTextSoft: "#4f46e5"
  }
};
var accentTokens = {
  primary: "#818cf8",
  primaryLight: "#a5b4fc",
  primaryDark: "#6366f1",
  primaryAlt: "#60a5fa",
  success: "#10b981",
  warning: "#f59e0b",
  warningAlt: "#eab308",
  error: "#ef4444",
  errorDark: "#dc2626",
  white: "#fff"
};
var lightAccentTokens = {
  primary: "#4f46e5",
  primaryLight: "#6366f1",
  primaryDark: "#4338ca",
  primaryAlt: "#2563eb"
};
var accentPalettes = [
  {
    id: "cyan",
    label: "Cyan",
    tokens: {
      dark: { primary: "#22d3ee", primaryLight: "#67e8f9", primaryDark: "#06b6d4", primaryAlt: "#38bdf8" },
      light: { primary: "#0891b2", primaryLight: "#06b6d4", primaryDark: "#0e7490", primaryAlt: "#0284c7" }
    }
  },
  {
    id: "violet",
    label: "Violet",
    tokens: {
      dark: { primary: "#8b5cf6", primaryLight: "#a78bfa", primaryDark: "#7c3aed", primaryAlt: "#818cf8" },
      light: { primary: "#7c3aed", primaryLight: "#8b5cf6", primaryDark: "#6d28d9", primaryAlt: "#4f46e5" }
    }
  },
  {
    id: "emerald",
    label: "Emerald",
    tokens: {
      dark: { primary: "#10b981", primaryLight: "#34d399", primaryDark: "#059669", primaryAlt: "#14b8a6" },
      light: { primary: "#059669", primaryLight: "#10b981", primaryDark: "#047857", primaryAlt: "#0d9488" }
    }
  },
  {
    id: "amber",
    label: "Amber",
    tokens: {
      dark: { primary: "#f59e0b", primaryLight: "#fbbf24", primaryDark: "#d97706", primaryAlt: "#eab308" },
      light: { primary: "#d97706", primaryLight: "#f59e0b", primaryDark: "#b45309", primaryAlt: "#ca8a04" }
    }
  },
  {
    id: "rose",
    label: "Rose",
    tokens: {
      dark: { primary: "#f43f5e", primaryLight: "#fb7185", primaryDark: "#e11d48", primaryAlt: "#ec4899" },
      light: { primary: "#e11d48", primaryLight: "#f43f5e", primaryDark: "#be123c", primaryAlt: "#db2777" }
    }
  },
  {
    id: "slate",
    label: "Slate",
    tokens: {
      dark: { primary: "#94a3b8", primaryLight: "#cbd5e1", primaryDark: "#64748b", primaryAlt: "#38bdf8" },
      light: { primary: "#475569", primaryLight: "#64748b", primaryDark: "#334155", primaryAlt: "#0f766e" }
    }
  }
];
function isModeAccentTokenOverrides(input) {
  return "dark" in input || "light" in input;
}
function resolveAccentTokens(mode, input) {
  const base = {
    ...accentTokens,
    ...mode === "light" ? lightAccentTokens : {}
  };
  const overrides = input ? isModeAccentTokenOverrides(input) ? input[mode] : input : void 0;
  return { ...base, ...overrides };
}
var DEFAULT_FONT_BASE_REM = 0.8125;
function rem(value) {
  return `${Number(value.toFixed(4))}rem`;
}
function createTypographyScale(fontScale = 1, fontBaseRem = DEFAULT_FONT_BASE_REM) {
  const base = fontBaseRem * fontScale;
  return {
    appTitle: rem(base * 1.15),
    pageTitle: rem(base * 1.23),
    sectionTitle: rem(base * 1.08),
    dialogTitle: rem(base * 1.08),
    body: rem(base),
    bodySmall: rem(base * 0.92),
    labelShrink: rem(base * 1.08),
    nav: rem(base),
    topNav: rem(base * 0.92),
    meta: rem(base * 0.85),
    micro: rem(base * 0.77),
    control: rem(base),
    controlSmall: rem(base * 0.92),
    tableCell: rem(base),
    tableHead: rem(base * 0.85),
    chip: rem(base * 0.85),
    tooltip: rem(base * 0.92),
    code: rem(base * 0.92),
    markdownH1: rem(base * 1.23),
    markdownH2: rem(base * 1.15),
    markdownH3: rem(base * 1.08)
  };
}
function cssVars(t, a, type, extra) {
  return {
    "--ui-bg": t.bg,
    "--ui-surface": t.surface,
    "--ui-surface-muted": t.surfaceMuted,
    "--ui-text": t.text,
    "--ui-text-soft": t.textSoft,
    "--ui-text-muted": t.textMuted,
    "--ui-text-secondary": t.textSecondary,
    "--ui-text-tertiary": t.textTertiary,
    "--ui-text-disabled": t.textDisabled,
    "--ui-empty-icon": t.emptyIcon,
    "--ui-border": t.border,
    "--ui-border-subtle": t.borderSubtle,
    "--ui-border-strong": t.borderStrong,
    "--ui-border-hover": t.borderHover,
    "--ui-hover": t.hover,
    "--ui-hover-subtle": t.hoverSubtle,
    "--ui-field": t.field,
    "--ui-overlay": t.overlay,
    "--ui-tooltip": t.tooltip,
    "--ui-neutral-chip-bg": t.neutralChipBg,
    "--ui-neutral-chip-border": t.neutralChipBorder,
    "--ui-selected-text": t.selectedText,
    "--ui-selected-text-soft": t.selectedTextSoft,
    "--ui-primary": a.primary,
    "--ui-primary-light": a.primaryLight,
    "--ui-primary-dark": a.primaryDark,
    "--ui-primary-alt": a.primaryAlt,
    "--ui-success": a.success,
    "--ui-warning": a.warning,
    "--ui-warning-alt": a.warningAlt,
    "--ui-error": a.error,
    "--ui-error-dark": a.errorDark,
    "--ui-on-accent": a.white,
    "--ui-primary-bg-subtle": alpha(a.primary, 0.05),
    "--ui-primary-bg": alpha(a.primary, 0.1),
    "--ui-primary-bg-mid": alpha(a.primary, 0.12),
    "--ui-primary-bg-strong": alpha(a.primary, 0.16),
    "--ui-primary-border": alpha(a.primary, 0.25),
    "--ui-primary-border-strong": alpha(a.primary, 0.3),
    "--ui-success-bg": alpha(a.success, 0.1),
    "--ui-success-bg-strong": alpha(a.success, 0.12),
    "--ui-success-border": alpha(a.success, 0.25),
    "--ui-warning-bg": alpha(a.warning, 0.1),
    "--ui-warning-bg-subtle": alpha(a.warning, 0.06),
    "--ui-warning-border": alpha(a.warning, 0.2),
    "--ui-warning-alt-bg": alpha(a.warningAlt, 0.12),
    "--ui-warning-alt-border": alpha(a.warningAlt, 0.25),
    "--ui-error-bg": alpha(a.error, 0.12),
    "--ui-error-border": alpha(a.error, 0.25),
    "--ui-primary-shadow": alpha(a.primary, 0.4),
    "--ui-primary-shadow-strong": alpha(a.primary, 0.6),
    "--ui-success-shadow": alpha(a.success, 0.8),
    "--ui-font-size-app-title": type.appTitle,
    "--ui-font-size-page-title": type.pageTitle,
    "--ui-font-size-section-title": type.sectionTitle,
    "--ui-font-size-dialog-title": type.dialogTitle,
    "--ui-font-size-body": type.body,
    "--ui-font-size-body-small": type.bodySmall,
    "--ui-font-size-label-shrink": type.labelShrink,
    "--ui-font-size-nav": type.nav,
    "--ui-font-size-top-nav": type.topNav,
    "--ui-font-size-meta": type.meta,
    "--ui-font-size-micro": type.micro,
    "--ui-font-size-control": type.control,
    "--ui-font-size-control-small": type.controlSmall,
    "--ui-font-size-table-cell": type.tableCell,
    "--ui-font-size-table-head": type.tableHead,
    "--ui-font-size-chip": type.chip,
    "--ui-font-size-tooltip": type.tooltip,
    "--ui-font-size-code": type.code,
    "--ui-font-size-markdown-h1": type.markdownH1,
    "--ui-font-size-markdown-h2": type.markdownH2,
    "--ui-font-size-markdown-h3": type.markdownH3,
    ...extra
  };
}
function createAppTheme(mode, opts) {
  const t = modeTokens[mode];
  const a = resolveAccentTokens(mode, opts?.accentTokens);
  const type = createTypographyScale(opts?.fontScale, opts?.fontBaseRem);
  const vars = cssVars(t, a, type, opts?.extraCssVars);
  return createTheme({
    palette: {
      mode,
      background: { default: t.bg, paper: t.surface },
      primary: { main: a.primary, light: a.primaryLight, dark: a.primaryDark },
      divider: t.border,
      text: { primary: t.text, secondary: t.textSecondary },
      error: { main: a.error },
      warning: { main: a.warning },
      success: { main: a.success }
    },
    typography: {
      fontFamily: '"Outfit", sans-serif',
      h1: { fontFamily: '"Syne", sans-serif', fontSize: type.pageTitle, fontWeight: 700 },
      h2: { fontFamily: '"Syne", sans-serif', fontSize: type.pageTitle, fontWeight: 700 },
      h3: { fontFamily: '"Syne", sans-serif', fontSize: type.sectionTitle, fontWeight: 650 },
      h4: { fontFamily: '"Syne", sans-serif', fontSize: type.sectionTitle, fontWeight: 650 },
      h5: { fontFamily: '"Syne", sans-serif', fontSize: type.sectionTitle, fontWeight: 600 },
      h6: { fontFamily: '"Syne", sans-serif', fontSize: type.sectionTitle, fontWeight: 600 },
      subtitle1: { fontFamily: '"Outfit", sans-serif', fontSize: type.body, fontWeight: 500 },
      subtitle2: { fontFamily: '"Outfit", sans-serif', fontSize: type.bodySmall, fontWeight: 500, color: t.textSecondary },
      body1: { fontFamily: '"Outfit", sans-serif', fontSize: type.body },
      body2: { fontFamily: '"Outfit", sans-serif', fontSize: type.bodySmall, color: t.textSecondary },
      caption: { fontFamily: '"Fira Code", monospace', fontSize: type.meta }
    },
    shape: { borderRadius: 8 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ":root": { colorScheme: mode, ...vars },
          body: { background: t.bg }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: "none", border: `1px solid ${t.border}` }
        }
      },
      MuiDivider: {
        styleOverrides: { root: { borderColor: t.border } }
      },
      MuiSwitch: {
        styleOverrides: {
          root: { padding: 8 },
          track: { borderRadius: 11 },
          thumb: { boxShadow: "none" }
        }
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            color: t.text,
            fontSize: type.controlSmall,
            fontFamily: '"Outfit", sans-serif',
            "& .MuiOutlinedInput-notchedOutline": { borderColor: t.borderStrong }
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: t.textTertiary,
            fontFamily: '"Outfit", sans-serif',
            fontSize: type.control,
            fontWeight: 400,
            lineHeight: 1.25,
            "&.Mui-focused": { color: a.primary },
            "&.MuiInputLabel-shrink": { color: t.textSecondary, fontSize: type.labelShrink, fontWeight: 500 },
            "&.Mui-disabled": { color: t.textDisabled },
            "&.Mui-error": { color: a.error }
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: t.text,
            fontFamily: '"Outfit", sans-serif',
            fontSize: type.control,
            lineHeight: 1.4
          },
          input: {
            color: t.text,
            font: "inherit",
            "&::placeholder": { color: t.textDisabled, opacity: 1, fontSize: type.bodySmall }
          },
          inputSizeSmall: { fontSize: type.controlSmall },
          inputMultiline: {
            padding: 0
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: { borderColor: t.borderStrong },
          root: {
            background: t.field,
            borderRadius: 6,
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: t.borderHover },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: a.primary },
            "&.MuiOutlinedInput-sizeSmall": { minHeight: 30 },
            "&.MuiInputBase-multiline": {
              padding: "6px 10px"
            }
          },
          input: {
            padding: "10px 12px",
            "&::placeholder": { color: t.textDisabled, opacity: 1, fontSize: type.bodySmall },
            "&.MuiInputBase-inputMultiline": {
              padding: 0
            }
          },
          inputSizeSmall: { padding: "6px 10px" }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: { fontFamily: '"Fira Code", monospace', fontSize: type.chip, height: 22, borderRadius: 4 }
        }
      },
      MuiButton: {
        defaultProps: { size: "small", variant: "outlined" },
        styleOverrides: {
          root: {
            fontFamily: '"Outfit", sans-serif',
            fontSize: type.controlSmall,
            fontWeight: 500,
            textTransform: "none",
            letterSpacing: 0
          },
          contained: {
            background: a.primary,
            color: a.white,
            boxShadow: `0 0 20px ${alpha(a.primary, 0.3)}`,
            "&:hover": { background: a.primaryDark, boxShadow: `0 0 28px ${alpha(a.primary, 0.45)}` },
            "&.Mui-disabled": { background: t.hover, color: t.textDisabled, boxShadow: "none" }
          },
          outlined: {
            borderColor: t.borderStrong,
            color: t.textSecondary,
            "&:hover": {
              borderColor: t.borderHover,
              background: t.hover
            },
            "&.Mui-disabled": { borderColor: t.border, color: t.textDisabled }
          }
        },
        variants: [
          {
            props: { variant: "contained", color: "error" },
            style: {
              background: a.error,
              boxShadow: `0 0 20px ${alpha(a.error, 0.3)}`,
              "&:hover": { background: a.errorDark, boxShadow: `0 0 28px ${alpha(a.error, 0.45)}` }
            }
          }
        ]
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontFamily: '"Outfit", sans-serif',
            fontSize: type.controlSmall,
            fontWeight: 600,
            letterSpacing: 0,
            textTransform: "none"
          }
        }
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontFamily: '"Outfit", sans-serif',
            fontSize: type.tooltip,
            background: t.tooltip,
            border: `1px solid ${t.borderStrong}`
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: t.borderSubtle,
            fontFamily: '"Outfit", sans-serif',
            fontSize: type.tableCell
          },
          head: {
            fontFamily: '"Fira Code", monospace',
            fontSize: type.tableHead,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: t.textMuted,
            background: t.surfaceMuted
          }
        }
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",
            background: t.surface,
            border: `1px solid ${t.borderStrong}`
          }
        }
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontFamily: '"Syne", sans-serif',
            fontSize: type.dialogTitle,
            color: t.text,
            paddingTop: 10,
            paddingBottom: 10,
            borderBottom: `1px solid ${t.border}`
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: t.text,
            fontFamily: '"Outfit", sans-serif',
            fontSize: type.controlSmall,
            "&.Mui-selected": { color: a.primary, backgroundColor: alpha(a.primary, 0.12) },
            "&.Mui-selected:hover": { backgroundColor: alpha(a.primary, 0.16) }
          }
        }
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": { background: t.hoverSubtle },
            "&:last-child td": { border: 0 }
          }
        }
      }
    }
  });
}

// src/Baseline.tsx
import { useEffect } from "react";
import { GlobalStyles } from "@mui/material";
import { jsx } from "react/jsx-runtime";
var FONTS_LINK_ID = "console-ui-fonts";
var FONTS_URL = "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&family=Fira+Code:wght@400;500&display=swap";
function FontLoader() {
  useEffect(() => {
    if (document.getElementById(FONTS_LINK_ID)) return;
    const pre1 = document.createElement("link");
    pre1.rel = "preconnect";
    pre1.href = "https://fonts.googleapis.com";
    document.head.appendChild(pre1);
    const pre2 = document.createElement("link");
    pre2.rel = "preconnect";
    pre2.href = "https://fonts.gstatic.com";
    pre2.crossOrigin = "";
    document.head.appendChild(pre2);
    const link = document.createElement("link");
    link.id = FONTS_LINK_ID;
    link.rel = "stylesheet";
    link.href = FONTS_URL;
    document.head.appendChild(link);
  }, []);
  return null;
}
function BaselineStyles() {
  return /* @__PURE__ */ jsx(
    GlobalStyles,
    {
      styles: {
        "*, *::before, *::after": { boxSizing: "border-box", margin: 0, padding: 0 },
        "::-webkit-scrollbar": { width: 6, height: 6 },
        "::-webkit-scrollbar-track": { background: "transparent" },
        "::-webkit-scrollbar-thumb": {
          background: "var(--ui-border-strong)",
          borderRadius: 3
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "var(--ui-border-hover)"
        }
      }
    }
  );
}

// src/layout/AppShell.tsx
import { useState, useCallback, useRef, useMemo, createContext, useContext } from "react";
import {
  Box,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Paper,
  Tooltip,
  useMediaQuery,
  useTheme as useMuiTheme,
  ThemeProvider,
  CssBaseline,
  Menu,
  MenuItem,
  ListItemIcon
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var MIN_W = 160;
var MAX_W = 360;
var COLLAPSED_W = 52;
var ACCENT_KEY = "accent";
var AppIdContext = createContext("");
function readPref(appId, key, fallback) {
  try {
    return localStorage.getItem(`${appId}:${key}`) ?? fallback;
  } catch {
    return fallback;
  }
}
function writePref(appId, key, value) {
  try {
    localStorage.setItem(`${appId}:${key}`, value);
  } catch {
  }
}
function usePreference(key, defaultValue) {
  const appId = useContext(AppIdContext);
  const [value, setValue] = useState(() => {
    const raw = readPref(appId, key, "");
    if (raw === "") return defaultValue;
    if (typeof defaultValue === "number") return Number(raw);
    if (typeof defaultValue === "boolean") return raw === "true";
    return raw;
  });
  const set = useCallback((v) => {
    setValue(v);
    writePref(appId, key, String(v));
  }, [appId, key]);
  return [value, set];
}
function ThemeToggle({ mode, onToggleTheme }) {
  return /* @__PURE__ */ jsx2(Tooltip, { title: `Switch to ${mode === "dark" ? "light" : "dark"} theme`, children: /* @__PURE__ */ jsx2(
    IconButton,
    {
      size: "small",
      onClick: onToggleTheme,
      sx: { color: "var(--ui-text-secondary)", "&:hover": { color: "primary.main" } },
      children: mode === "dark" ? /* @__PURE__ */ jsx2(LightModeIcon, { sx: { fontSize: 18 } }) : /* @__PURE__ */ jsx2(DarkModeIcon, { sx: { fontSize: 18 } })
    }
  ) });
}
function AccentPaletteMenu({
  mode,
  palettes,
  selectedId,
  onSelect
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  if (palettes.length < 2) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Tooltip, { title: "Theme color", children: /* @__PURE__ */ jsx2(
      IconButton,
      {
        size: "small",
        onClick: (event) => setAnchorEl(event.currentTarget),
        sx: { color: "var(--ui-text-secondary)", "&:hover": { color: "primary.main" } },
        children: /* @__PURE__ */ jsx2(PaletteOutlinedIcon, { sx: { fontSize: 18 } })
      }
    ) }),
    /* @__PURE__ */ jsx2(
      Menu,
      {
        anchorEl,
        open,
        onClose: () => setAnchorEl(null),
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        transformOrigin: { vertical: "top", horizontal: "right" },
        MenuListProps: { dense: true },
        PaperProps: {
          sx: {
            mt: 0.75,
            minWidth: 148,
            background: "var(--ui-surface)",
            borderColor: "var(--ui-border-strong)"
          }
        },
        children: palettes.map((palette) => {
          const selectedPalette = palette.id === selectedId;
          const color = resolveAccentTokens(mode, palette.tokens).primary;
          return /* @__PURE__ */ jsxs(
            MenuItem,
            {
              selected: selectedPalette,
              onClick: () => {
                onSelect(palette.id);
                setAnchorEl(null);
              },
              sx: { gap: 1, minHeight: 30 },
              children: [
                /* @__PURE__ */ jsx2(
                  Box,
                  {
                    sx: {
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: color,
                      border: "1px solid var(--ui-border-strong)",
                      boxShadow: selectedPalette ? "0 0 0 3px var(--ui-primary-border)" : "none",
                      flexShrink: 0
                    }
                  }
                ),
                /* @__PURE__ */ jsx2(Typography, { sx: { fontFamily: '"Outfit", sans-serif', fontSize: "var(--ui-font-size-control-small)", flex: 1 }, children: palette.label }),
                /* @__PURE__ */ jsx2(ListItemIcon, { sx: { minWidth: 18, color: selectedPalette ? "var(--ui-primary)" : "transparent" }, children: /* @__PURE__ */ jsx2(CheckIcon, { sx: { fontSize: 16 } }) })
              ]
            },
            palette.id
          );
        })
      }
    )
  ] });
}
function NavRow({ item, active, collapsed }) {
  const row = /* @__PURE__ */ jsxs(
    Box,
    {
      component: NavLink,
      to: item.path,
      sx: {
        display: "flex",
        alignItems: "center",
        gap: collapsed ? 0 : 1.25,
        justifyContent: collapsed ? "center" : "flex-start",
        px: collapsed ? 0 : 1.5,
        py: 0.75,
        borderRadius: "6px",
        transition: "background 0.15s ease, color 0.15s ease",
        textDecoration: "none",
        color: active ? "var(--ui-primary)" : "var(--ui-text-secondary)",
        background: active ? "var(--ui-primary-bg)" : "transparent",
        borderLeft: active ? "3px solid var(--ui-primary)" : "3px solid transparent",
        boxShadow: active ? "0 0 8px var(--ui-primary-shadow)" : "none",
        fontWeight: active ? 600 : 400,
        fontSize: "var(--ui-font-size-nav)",
        "&:hover": {
          color: active ? "var(--ui-primary)" : "var(--ui-text)",
          background: active ? "var(--ui-primary-bg)" : "var(--ui-hover)"
        }
      },
      children: [
        /* @__PURE__ */ jsx2(Box, { sx: { opacity: active ? 1 : 0.7, display: "flex", flexShrink: 0 }, children: item.icon }),
        !collapsed && /* @__PURE__ */ jsx2(Typography, { sx: {
          fontFamily: '"Outfit", sans-serif',
          fontSize: "var(--ui-font-size-nav)",
          fontWeight: active ? 600 : 400,
          lineHeight: 1
        }, children: item.label })
      ]
    }
  );
  return collapsed ? /* @__PURE__ */ jsx2(Tooltip, { title: item.label, placement: "right", children: row }) : row;
}
function findActive(nav, pathname) {
  return nav.find((n) => pathname === n.path || pathname.startsWith(`${n.path}/`));
}
function AppShellContent({
  appId,
  appName,
  nav,
  headerExtras,
  headerLeft,
  sidebar = true,
  mode,
  onToggleTheme,
  accentPalettes: accentPalettes2,
  accentId,
  onAccentChange,
  children
}) {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const location = useLocation();
  const [sidebarW, setSidebarW] = useState(
    () => parseInt(readPref(appId, "sidebar-width", String(SIDEBAR_W)))
  );
  const [collapsed, setCollapsed] = useState(
    () => readPref(appId, "sidebar-collapsed", "false") === "true"
  );
  const toggleCollapsed = useCallback(() => {
    setCollapsed((c) => {
      writePref(appId, "sidebar-collapsed", String(!c));
      return !c;
    });
  }, [appId]);
  const dragRef = useRef(null);
  const onDragStart = useCallback((e) => {
    e.preventDefault();
    dragRef.current = { startX: e.clientX, startW: sidebarW, lastW: sidebarW };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    const onMove = (ev) => {
      if (!dragRef.current) return;
      const w = Math.min(MAX_W, Math.max(MIN_W, dragRef.current.startW + ev.clientX - dragRef.current.startX));
      dragRef.current.lastW = w;
      setSidebarW(w);
    };
    const onUp = () => {
      const finalW = dragRef.current?.lastW ?? sidebarW;
      dragRef.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      writePref(appId, "sidebar-width", String(finalW));
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [appId, sidebarW]);
  const activeNav = findActive(nav, location.pathname);
  const activePath = activeNav?.path ?? nav[0]?.path ?? "/";
  const pageTitle = activeNav?.label ?? "";
  const effectiveW = collapsed ? COLLAPSED_W : sidebarW;
  if (isMobile) {
    return /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", flexDirection: "column", height: "100dvh", background: "var(--ui-bg)" }, children: [
      /* @__PURE__ */ jsxs(Box, { sx: {
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 2,
        py: 1.25,
        background: "var(--ui-surface-muted)",
        borderBottom: "1px solid var(--ui-border)",
        flexShrink: 0
      }, children: [
        /* @__PURE__ */ jsx2(Typography, { sx: { fontFamily: '"Syne", sans-serif', fontSize: "var(--ui-font-size-app-title)", fontWeight: 700, color: "var(--ui-primary)" }, children: appName }),
        headerLeft,
        headerExtras,
        /* @__PURE__ */ jsxs(Box, { sx: { ml: "auto", display: "flex", alignItems: "center", gap: 0.75 }, children: [
          accentPalettes2 && /* @__PURE__ */ jsx2(AccentPaletteMenu, { mode, palettes: accentPalettes2, selectedId: accentId, onSelect: onAccentChange }),
          /* @__PURE__ */ jsx2(ThemeToggle, { mode, onToggleTheme })
        ] })
      ] }),
      /* @__PURE__ */ jsx2(Box, { sx: { flex: 1, overflow: "auto", minHeight: 0 }, children }),
      sidebar && /* @__PURE__ */ jsx2(Paper, { elevation: 0, sx: { background: "var(--ui-surface-muted)", borderTop: "1px solid var(--ui-border)", flexShrink: 0 }, children: /* @__PURE__ */ jsx2(
        BottomNavigation,
        {
          value: activePath,
          sx: {
            background: "transparent",
            height: 56,
            "& .MuiBottomNavigationAction-root": {
              color: "var(--ui-text-secondary)",
              minWidth: 0,
              padding: "6px 0",
              "&.Mui-selected": { color: "var(--ui-primary)" }
            },
            "& .MuiBottomNavigationAction-label": {
              fontFamily: '"Outfit", sans-serif',
              fontSize: "var(--ui-font-size-micro)",
              "&.Mui-selected": { fontSize: "var(--ui-font-size-micro)" }
            }
          },
          children: nav.map((item) => /* @__PURE__ */ jsx2(
            BottomNavigationAction,
            {
              component: NavLink,
              to: item.path,
              value: item.path,
              label: item.label.split(" ")[0],
              icon: item.icon
            },
            item.id
          ))
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }, children: [
    /* @__PURE__ */ jsxs(Box, { sx: {
      height: 48,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      px: 2,
      background: "var(--ui-surface-muted)",
      borderBottom: "1px solid var(--ui-border)",
      zIndex: 10
    }, children: [
      /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", alignItems: "center", gap: 2, mr: "auto", minWidth: 0 }, children: [
        /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", alignItems: "baseline", gap: 1.5 }, children: [
          /* @__PURE__ */ jsx2(Typography, { sx: { fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: "var(--ui-font-size-app-title)", color: "var(--ui-primary)", whiteSpace: "nowrap" }, children: appName }),
          pageTitle && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx2(Typography, { sx: { color: "var(--ui-text-disabled)", fontSize: "var(--ui-font-size-body-small)" }, children: "|" }),
            /* @__PURE__ */ jsx2(Typography, { sx: { fontFamily: '"Fira Code", monospace', fontSize: "var(--ui-font-size-top-nav)", color: "var(--ui-text-secondary)", whiteSpace: "nowrap" }, children: pageTitle })
          ] })
        ] }),
        headerLeft
      ] }),
      /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", alignItems: "center", gap: 1 }, children: [
        headerExtras,
        accentPalettes2 && /* @__PURE__ */ jsx2(AccentPaletteMenu, { mode, palettes: accentPalettes2, selectedId: accentId, onSelect: onAccentChange }),
        /* @__PURE__ */ jsx2(ThemeToggle, { mode, onToggleTheme })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Box, { sx: { flex: 1, display: "flex", overflow: "hidden" }, children: [
      sidebar && /* @__PURE__ */ jsxs(Box, { sx: {
        width: effectiveW,
        flexShrink: 0,
        background: "var(--ui-surface-muted)",
        borderRight: "1px solid var(--ui-border)",
        display: "flex",
        flexDirection: "column",
        py: 1.5,
        px: collapsed ? 0.5 : 1,
        overflow: "hidden",
        position: "relative"
      }, children: [
        /* @__PURE__ */ jsx2(Box, { sx: { display: "flex", flexDirection: "column", gap: 0.25, flex: 1 }, children: nav.map((item) => /* @__PURE__ */ jsx2(NavRow, { item, active: activePath === item.path, collapsed }, item.id)) }),
        /* @__PURE__ */ jsx2(Box, { sx: { display: "flex", justifyContent: collapsed ? "center" : "flex-end", pt: 1 }, children: /* @__PURE__ */ jsx2(Tooltip, { title: collapsed ? "Expand sidebar" : "Collapse sidebar", placement: "right", children: /* @__PURE__ */ jsx2(
          IconButton,
          {
            size: "small",
            onClick: toggleCollapsed,
            sx: { color: "var(--ui-text-disabled)", "&:hover": { color: "var(--ui-text-secondary)" } },
            children: collapsed ? /* @__PURE__ */ jsx2(ChevronRightIcon, { sx: { fontSize: 16 } }) : /* @__PURE__ */ jsx2(ChevronLeftIcon, { sx: { fontSize: 16 } })
          }
        ) }) }),
        !collapsed && /* @__PURE__ */ jsx2(
          Box,
          {
            onMouseDown: onDragStart,
            sx: {
              position: "absolute",
              top: 0,
              right: 0,
              width: 4,
              height: "100%",
              cursor: "col-resize",
              "&:hover": { background: "var(--ui-primary-border)" },
              zIndex: 1
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsx2(Box, { sx: { flex: 1, overflow: "auto" }, children })
    ] })
  ] });
}
function AppShell({
  appId,
  appName,
  nav,
  extraCssVars,
  accentTokens: accentTokens2,
  accentPalettes: accentPalettes2,
  defaultAccentId,
  headerExtras,
  headerLeft,
  defaultMode = "dark",
  fontScale,
  fontBaseRem,
  sidebar,
  children
}) {
  const [mode, setMode] = useState(
    () => readPref(appId, "theme", defaultMode)
  );
  const normalizedAccentPalettes = accentPalettes2?.length ? accentPalettes2 : void 0;
  const fallbackAccentId = defaultAccentId ?? normalizedAccentPalettes?.[0]?.id ?? "";
  const [accentId, setAccentId] = useState(() => readPref(appId, ACCENT_KEY, fallbackAccentId));
  const selectedAccent = normalizedAccentPalettes?.find((p) => p.id === accentId) ?? normalizedAccentPalettes?.[0];
  const activeAccentTokens = selectedAccent?.tokens ?? accentTokens2;
  const theme = useMemo(
    () => createAppTheme(mode, { extraCssVars, accentTokens: activeAccentTokens, fontScale, fontBaseRem }),
    [mode, extraCssVars, activeAccentTokens, fontScale, fontBaseRem]
  );
  const onToggleTheme = useCallback(() => {
    setMode((m) => {
      const next = m === "dark" ? "light" : "dark";
      writePref(appId, "theme", next);
      return next;
    });
  }, [appId]);
  const onAccentChange = useCallback((id) => {
    setAccentId(id);
    writePref(appId, ACCENT_KEY, id);
  }, [appId]);
  return /* @__PURE__ */ jsx2(AppIdContext.Provider, { value: appId, children: /* @__PURE__ */ jsxs(ThemeProvider, { theme, children: [
    /* @__PURE__ */ jsx2(FontLoader, {}),
    /* @__PURE__ */ jsx2(BaselineStyles, {}),
    /* @__PURE__ */ jsx2(CssBaseline, {}),
    /* @__PURE__ */ jsx2(
      AppShellContent,
      {
        appId,
        appName,
        nav,
        headerExtras,
        headerLeft,
        sidebar,
        mode,
        onToggleTheme,
        accentPalettes: normalizedAccentPalettes,
        accentId: selectedAccent?.id ?? accentId,
        onAccentChange,
        children
      }
    )
  ] }) });
}

// src/components/PageHeader.tsx
import { Box as Box2, Typography as Typography2 } from "@mui/material";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function PageHeader({ title, subtitle, action }) {
  return /* @__PURE__ */ jsxs2(Box2, { sx: {
    px: 3,
    py: 2,
    borderBottom: "1px solid var(--ui-border)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }, children: [
    /* @__PURE__ */ jsxs2(Box2, { children: [
      /* @__PURE__ */ jsx3(Typography2, { sx: {
        fontSize: "var(--ui-font-size-page-title)",
        fontWeight: 600,
        fontFamily: '"Syne", sans-serif'
      }, children: title }),
      subtitle && /* @__PURE__ */ jsx3(Typography2, { sx: { fontSize: "var(--ui-font-size-body-small)", color: "var(--ui-text-secondary)" }, children: subtitle })
    ] }),
    action
  ] });
}

// src/components/PaginationBar.tsx
import { Button, FormControl, IconButton as IconButton2, MenuItem as MenuItem2, Select, Stack } from "@mui/material";
import ChevronLeftIcon2 from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon2 from "@mui/icons-material/ChevronRight";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var pageButtonSx = {
  minWidth: 34,
  width: 34,
  height: 34,
  borderRadius: "50%",
  color: "var(--ui-text)",
  p: 0,
  "&.MuiButton-contained": {
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    boxShadow: "none",
    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.22)", boxShadow: "none" }
  }
};
var pageIconButtonSx = {
  width: 34,
  height: 34,
  color: "var(--ui-text)",
  "&.Mui-disabled": { color: "var(--ui-text-tertiary)" }
};
function PaginationBar({
  currentPage,
  totalPages,
  disabled = false,
  maxVisiblePages = 10,
  pageSize,
  pageSizeOptions = [],
  pageSizeLabel = "Page size",
  onPageChange,
  onPageSizeChange
}) {
  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages);
  const pageWindowStart = Math.floor((safeCurrentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const pageWindowEnd = Math.min(safeTotalPages, pageWindowStart + maxVisiblePages - 1);
  const pageNumbers = Array.from(
    { length: pageWindowEnd - pageWindowStart + 1 },
    (_, index) => pageWindowStart + index
  );
  const showPageSize = pageSize !== void 0 && onPageSizeChange !== void 0 && pageSizeOptions.length > 0;
  return /* @__PURE__ */ jsxs3(
    Stack,
    {
      direction: { xs: "column", md: "row" },
      justifyContent: "flex-end",
      alignItems: { xs: "stretch", md: "center" },
      spacing: 1,
      children: [
        /* @__PURE__ */ jsxs3(Stack, { direction: "row", spacing: 0.5, sx: { flexWrap: "wrap", justifyContent: { xs: "flex-start", md: "center" } }, children: [
          /* @__PURE__ */ jsx4(
            IconButton2,
            {
              size: "small",
              "aria-label": "First page",
              disabled: safeCurrentPage <= 1 || disabled,
              onClick: () => onPageChange(1),
              sx: pageIconButtonSx,
              children: /* @__PURE__ */ jsx4(FirstPageIcon, { fontSize: "small" })
            }
          ),
          /* @__PURE__ */ jsx4(
            IconButton2,
            {
              size: "small",
              "aria-label": "Previous page",
              disabled: safeCurrentPage <= 1 || disabled,
              onClick: () => onPageChange(safeCurrentPage - 1),
              sx: pageIconButtonSx,
              children: /* @__PURE__ */ jsx4(ChevronLeftIcon2, { fontSize: "small" })
            }
          ),
          pageNumbers.map((pageNumber) => /* @__PURE__ */ jsx4(
            Button,
            {
              size: "small",
              variant: pageNumber === safeCurrentPage ? "contained" : "text",
              disabled,
              onClick: () => onPageChange(pageNumber),
              sx: pageButtonSx,
              children: pageNumber
            },
            pageNumber
          )),
          /* @__PURE__ */ jsx4(
            IconButton2,
            {
              size: "small",
              "aria-label": "Next page",
              disabled: safeCurrentPage >= safeTotalPages || disabled,
              onClick: () => onPageChange(safeCurrentPage + 1),
              sx: pageIconButtonSx,
              children: /* @__PURE__ */ jsx4(ChevronRightIcon2, { fontSize: "small" })
            }
          ),
          /* @__PURE__ */ jsx4(
            IconButton2,
            {
              size: "small",
              "aria-label": "Last page",
              disabled: safeCurrentPage >= safeTotalPages || disabled,
              onClick: () => onPageChange(safeTotalPages),
              sx: pageIconButtonSx,
              children: /* @__PURE__ */ jsx4(LastPageIcon, { fontSize: "small" })
            }
          )
        ] }),
        showPageSize && /* @__PURE__ */ jsx4(FormControl, { size: "small", sx: { width: 76 }, children: /* @__PURE__ */ jsx4(
          Select,
          {
            value: String(pageSize),
            inputProps: { "aria-label": pageSizeLabel },
            onChange: (event) => onPageSizeChange(Number(event.target.value)),
            children: pageSizeOptions.map((size) => /* @__PURE__ */ jsx4(MenuItem2, { value: String(size), children: size }, size))
          }
        ) })
      ]
    }
  );
}

// src/components/StatusDot.tsx
import { Box as Box3 } from "@mui/material";
import { jsx as jsx5 } from "react/jsx-runtime";
function StatusDot({ color, glow = false, size = 8 }) {
  return /* @__PURE__ */ jsx5(Box3, { sx: {
    width: size,
    height: size,
    borderRadius: "50%",
    background: color,
    flexShrink: 0,
    boxShadow: glow ? `0 0 6px ${color}80` : "none"
  } });
}
export {
  AppShell,
  BaselineStyles,
  FontLoader,
  PageHeader,
  PaginationBar,
  SIDEBAR_W,
  StatusDot,
  ThemeToggle,
  accentPalettes,
  accentTokens,
  createAppTheme,
  createTypographyScale,
  modeTokens,
  resolveAccentTokens,
  usePreference
};
