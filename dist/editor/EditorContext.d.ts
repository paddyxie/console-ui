import type { Editor } from '@tiptap/react';
interface EditorContextValue {
    editor: Editor | null;
}
export declare const EditorContext: import("react").Context<EditorContextValue>;
export declare function useEditorContext(): EditorContextValue;
export {};
