import * as react_jsx_runtime from 'react/jsx-runtime';

interface MdProps {
    children: string;
    /** sx color token or CSS color; defaults to text.primary */
    color?: string;
}
/**
 * Themed markdown renderer. Respects the active MUI theme mode (dark/light).
 * Supports GFM (tables, strikethrough, task lists, etc.).
 */
declare function Md({ children, color }: MdProps): react_jsx_runtime.JSX.Element;

export { Md };
