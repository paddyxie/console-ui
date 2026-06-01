import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from '@mui/material';
/** Small circular status indicator. */
export function StatusDot({ color, glow = false, size = 8 }) {
    return (_jsx(Box, { sx: {
            width: size,
            height: size,
            borderRadius: '50%',
            background: color,
            flexShrink: 0,
            boxShadow: glow ? `0 0 6px ${color}80` : 'none',
        } }));
}
