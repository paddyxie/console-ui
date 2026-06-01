interface MdProps {
    children: string;
    /** sx color token or CSS color; defaults to text.primary */
    color?: string;
}
/**
 * Themed markdown renderer. Respects the active MUI theme mode (dark/light).
 * Supports GFM (tables, strikethrough, task lists, etc.).
 */
export default function Md({ children, color }: MdProps): import("react/jsx-runtime").JSX.Element;
export {};
