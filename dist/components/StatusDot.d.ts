interface StatusDotProps {
    /** CSS color value — typically a `var(--ui-*)` token or a status color. */
    color: string;
    /** Show a soft glow matching the dot color. */
    glow?: boolean;
    /** Diameter in pixels. Defaults to 8. */
    size?: number;
}
/** Small circular status indicator. */
export declare function StatusDot({ color, glow, size }: StatusDotProps): import("react/jsx-runtime").JSX.Element;
export {};
