import * as React from 'react';
import { ReactNode } from 'react';
import { JSONContent } from '@tiptap/core';
import * as react_jsx_runtime from 'react/jsx-runtime';

type Theme = 'light' | 'dark';
declare function ThemeProvider({ children, theme }: {
    children: ReactNode;
    theme?: Theme;
}): react_jsx_runtime.JSX.Element;
declare function useTheme(): {
    theme: Theme;
};

interface EditorSaveData {
    json: JSONContent;
    html: string;
    markdown: string;
}
interface EditorHandle {
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
interface EditorProps {
    content?: JSONContent;
    onSave?: (data: EditorSaveData) => void;
    readOnly?: boolean;
    theme?: Theme;
}
declare const Editor: React.ForwardRefExoticComponent<EditorProps & React.RefAttributes<EditorHandle>>;

declare function jsonToMarkdown(json: JSONContent): string;

export { Editor, type EditorHandle, type EditorProps, type EditorSaveData, type Theme as EditorTheme, ThemeProvider as EditorThemeProvider, jsonToMarkdown, useTheme as useEditorTheme };
