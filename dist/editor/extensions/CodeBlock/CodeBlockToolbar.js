"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { MdCode } from 'react-icons/md';
import { useEditorContext } from '../../EditorContext';
export function CodeBlockToolbar() {
    const { editor } = useEditorContext();
    if (!editor)
        return null;
    return (_jsx("div", { className: "toolbar-group", children: _jsx("button", { title: "Code Block", onMouseDown: e => e.preventDefault(), onClick: () => editor.chain().focus().toggleCodeBlock().run(), className: `toolbar-btn${editor.isActive('codeBlock') ? ' active' : ''}`, "aria-label": "Code block", children: _jsx(MdCode, {}) }) }));
}
