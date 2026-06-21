'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEditor, EditorContent } from '@tiptap/react';
import { useReducer, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { StarterKit } from '@tiptap/starter-kit';
import { basicFormattingExtensions } from './extensions/BasicFormatting/BasicFormattingExtension';
import { listsExtensions } from './extensions/Lists/ListsExtension';
import { linkExtension } from './extensions/Link/LinkExtension';
import { ImageExtension } from './extensions/Image/ImageExtension';
import { tableExtensions } from './extensions/Table/TableExtension';
import { codeBlockExtension } from './extensions/CodeBlock/CodeBlockExtension';
import { MermaidExtension } from './extensions/Mermaid/MermaidExtension';
import { TableFloatingToolbar } from './extensions/Table/TableFloatingToolbar';
import { EditorContext, useEditorContext } from './EditorContext';
import { ThemeProvider, useTheme } from './ThemeContext';
import { WidthProvider, useWidth } from './WidthContext';
import { Toolbar } from './toolbar/Toolbar';
import { jsonToMarkdown } from './markdownSerializer';
import './theme.css';
import './editor.css';
const extensions = [
    StarterKit.configure({
        bold: false,
        italic: false,
        strike: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        code: false,
        codeBlock: false,
    }),
    ...basicFormattingExtensions,
    ...listsExtensions,
    linkExtension,
    ImageExtension,
    ...tableExtensions,
    codeBlockExtension,
    MermaidExtension,
];
const defaultContent = `<h1>Welcome to the Editor</h1>
<p>Start typing here. Use the toolbar above to format text.</p>
`;
function EditorInner({ content, onSave, readOnly = false }, ref) {
    const editor = useEditor({
        extensions,
        content: content ?? defaultContent,
        editable: !readOnly,
        immediatelyRender: false,
    });
    useEffect(() => {
        if (!editor || !content?.type)
            return;
        editor.commands.setContent(content);
    }, [editor, content]);
    useEffect(() => {
        if (!editor)
            return;
        editor.setEditable(!readOnly);
    }, [editor, readOnly]);
    const [, tick] = useReducer(x => x + 1, 0);
    useEffect(() => {
        if (!editor)
            return;
        editor.on('selectionUpdate', tick);
        editor.on('transaction', tick);
        return () => {
            editor.off('selectionUpdate', tick);
            editor.off('transaction', tick);
        };
    }, [editor]);
    return (_jsx(EditorContext.Provider, { value: { editor }, children: _jsx(EditorUI, { onSave: onSave, readOnly: readOnly, ref: ref }) }));
}
const EditorUI = forwardRef(function EditorUI({ onSave, readOnly }, ref) {
    const { editor } = useEditorContext();
    const { theme } = useTheme();
    const { widthStyle } = useWidth();
    const getEditorData = useCallback(() => {
        if (!editor)
            return null;
        const json = editor.getJSON();
        return { json, html: editor.getHTML(), markdown: jsonToMarkdown(json) };
    }, [editor]);
    const handleSave = useCallback(() => {
        if (!onSave)
            return;
        const data = getEditorData();
        if (data)
            onSave(data);
    }, [getEditorData, onSave]);
    const getSelectionContext = useCallback(() => {
        if (!editor)
            return null;
        const { from, to, empty } = editor.state.selection;
        if (empty)
            return null;
        return {
            range: { from, to },
            text: editor.state.doc.textBetween(from, to, '\n'),
        };
    }, [editor]);
    const replaceRangeWithText = useCallback((range, text) => {
        if (!editor)
            return false;
        editor.chain().focus().insertContentAt(range, text).run();
        return true;
    }, [editor]);
    useImperativeHandle(ref, () => ({
        save: handleSave,
        getData: getEditorData,
        getSelectionContext,
        replaceRangeWithText,
    }), [handleSave, getEditorData, getSelectionContext, replaceRangeWithText]);
    if (!editor)
        return null;
    return (_jsxs("div", { className: "editor-root", "data-theme": theme, "data-read-only": readOnly ? 'true' : 'false', children: [!readOnly && _jsx(Toolbar, {}), _jsx("div", { className: "editor-workspace", children: _jsx("div", { className: "editor-document-column", children: _jsx("div", { className: "editor-main", style: { ...widthStyle, margin: '0 auto', transition: 'width 0.2s ease, max-width 0.2s ease' }, children: _jsx("div", { className: "editor-wrapper", children: _jsxs("div", { className: "editor-content", children: [_jsx(EditorContent, { editor: editor }), !readOnly && _jsx(TableFloatingToolbar, { editor: editor })] }) }) }) }) })] }));
});
const EditorInnerWithRef = forwardRef(EditorInner);
export const Editor = forwardRef(function Editor({ defaultTheme, ...props }, ref) {
    return (_jsx(ThemeProvider, { defaultTheme: defaultTheme, children: _jsx(WidthProvider, { children: _jsx(EditorInnerWithRef, { ...props, ref: ref }) }) }));
});
