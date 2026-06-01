import type { ReactNode } from 'react';
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
export declare function PageHeader({ title, subtitle, action }: PageHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
