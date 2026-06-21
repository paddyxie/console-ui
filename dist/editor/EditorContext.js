"use client";
import { createContext, useContext } from 'react';
export const EditorContext = createContext({ editor: null });
export function useEditorContext() {
    return useContext(EditorContext);
}
