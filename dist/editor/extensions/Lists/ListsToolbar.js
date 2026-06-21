"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MdFormatListBulleted, MdFormatListNumbered, MdChecklist, MdFormatIndentIncrease, MdFormatIndentDecrease, } from 'react-icons/md';
import { useEditorContext } from '../../EditorContext';
export function ListsToolbar() {
    const { editor } = useEditorContext();
    if (!editor)
        return null;
    return (_jsxs("div", { className: "toolbar-group", children: [_jsx("button", { title: "Bullet List", onClick: () => editor.chain().focus().toggleBulletList().run(), onMouseDown: e => e.preventDefault(), className: `toolbar-btn${editor.isActive('bulletList') ? ' active' : ''}`, children: _jsx(MdFormatListBulleted, {}) }), _jsx("button", { title: "Numbered List", onClick: () => editor.chain().focus().toggleOrderedList().run(), onMouseDown: e => e.preventDefault(), className: `toolbar-btn${editor.isActive('orderedList') ? ' active' : ''}`, children: _jsx(MdFormatListNumbered, {}) }), _jsx("button", { title: "Task List", onClick: () => editor.chain().focus().toggleTaskList().run(), onMouseDown: e => e.preventDefault(), className: `toolbar-btn${editor.isActive('taskList') ? ' active' : ''}`, children: _jsx(MdChecklist, {}) }), _jsx("button", { title: "Indent (Tab)", onClick: () => editor.chain().focus().sinkListItem('listItem').run(), onMouseDown: e => e.preventDefault(), className: "toolbar-btn", children: _jsx(MdFormatIndentIncrease, {}) }), _jsx("button", { title: "Outdent (Shift+Tab)", onClick: () => editor.chain().focus().liftListItem('listItem').run(), onMouseDown: e => e.preventDefault(), className: "toolbar-btn", children: _jsx(MdFormatIndentDecrease, {}) })] }));
}
