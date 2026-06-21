'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MdUndo, MdRedo } from 'react-icons/md';
import { useEditorContext } from '../EditorContext';
export function UndoRedoToolbar() {
    const { editor } = useEditorContext();
    if (!editor)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("button", { onMouseDown: e => e.preventDefault(), className: "toolbar-btn", title: "Undo (Ctrl+Z)", onClick: () => editor.chain().focus().undo().run(), disabled: !editor.can().undo(), children: _jsx(MdUndo, {}) }), _jsx("button", { onMouseDown: e => e.preventDefault(), className: "toolbar-btn", title: "Redo (Ctrl+Y)", onClick: () => editor.chain().focus().redo().run(), disabled: !editor.can().redo(), children: _jsx(MdRedo, {}) })] }));
}
