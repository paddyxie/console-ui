"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const BASE = 900;
const PRESET_STYLE = {
    'fit': { width: '100%', maxWidth: 'none' },
    '50%': { width: 'auto', maxWidth: BASE * 0.50 },
    '75%': { width: 'auto', maxWidth: BASE * 0.75 },
    '90%': { width: 'auto', maxWidth: BASE * 0.90 },
    '100%': { width: 'auto', maxWidth: BASE * 1.00 },
    '120%': { width: 'auto', maxWidth: BASE * 1.20 },
    '150%': { width: 'auto', maxWidth: BASE * 1.50 },
    '175%': { width: 'auto', maxWidth: BASE * 1.75 },
    '200%': { width: 'auto', maxWidth: BASE * 2.00 },
};
const WidthContext = createContext({
    preset: '100%',
    setPreset: () => { },
    widthStyle: PRESET_STYLE['100%'],
});
export function WidthProvider({ children }) {
    const [preset, setPreset] = useState('100%');
    return (_jsx(WidthContext.Provider, { value: { preset, setPreset, widthStyle: PRESET_STYLE[preset] }, children: children }));
}
export function useWidth() {
    return useContext(WidthContext);
}
