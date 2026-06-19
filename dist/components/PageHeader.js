import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from '@mui/material';
/**
 * Standard page-level header bar used at the top of content areas.
 * Renders a title, optional subtitle, and optional action slot.
 */
export function PageHeader({ title, subtitle, action }) {
    return (_jsxs(Box, { sx: {
            px: 3, py: 2,
            borderBottom: '1px solid var(--ui-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }, children: [_jsxs(Box, { children: [_jsx(Typography, { sx: {
                            fontSize: 'var(--ui-font-size-page-title)', fontWeight: 600, fontFamily: '"Syne", sans-serif',
                        }, children: title }), subtitle && (_jsx(Typography, { sx: { fontSize: 'var(--ui-font-size-body-small)', color: 'var(--ui-text-secondary)' }, children: subtitle }))] }), action] }));
}
