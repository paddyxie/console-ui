import type { ReactNode, CSSProperties } from 'react';
export type WidthPreset = '50%' | '75%' | '90%' | '100%' | '120%' | '150%' | '175%' | '200%' | 'fit';
interface WidthContextValue {
    preset: WidthPreset;
    setPreset: (p: WidthPreset) => void;
    widthStyle: CSSProperties;
}
export declare function WidthProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useWidth(): WidthContextValue;
export {};
