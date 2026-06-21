import type { JSONContent } from '@tiptap/core';
import type { Theme } from './ThemeContext';
import './theme.css';
import './editor.css';
export interface EditorSaveData {
    json: JSONContent;
    html: string;
    markdown: string;
}
export interface EditorHandle {
    save: () => void;
    getData: () => EditorSaveData | null;
    getSelectionContext: () => {
        text: string;
        range: {
            from: number;
            to: number;
        };
    } | null;
    replaceRangeWithText: (range: {
        from: number;
        to: number;
    }, text: string) => boolean;
}
export interface EditorProps {
    content?: JSONContent;
    onSave?: (data: EditorSaveData) => void;
    readOnly?: boolean;
    theme?: Theme;
}
export declare const Editor: import("react").ForwardRefExoticComponent<EditorProps & import("react").RefAttributes<EditorHandle>>;
