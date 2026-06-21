"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdFormatStrikethrough, MdSubscript, MdSuperscript, MdFormatAlignLeft, MdFormatAlignCenter, MdFormatAlignRight, } from 'react-icons/md';
import { useEditorContext } from '../../EditorContext';
function Btn({ title, onClick, active, children, }) {
    return (_jsx("button", { title: title, onMouseDown: e => e.preventDefault(), onClick: onClick, className: `toolbar-btn${active ? ' active' : ''}`, "aria-pressed": active, children: children }));
}
export function BasicFormattingToolbar() {
    const { editor } = useEditorContext();
    if (!editor)
        return null;
    const activeLevel = [1, 2, 3].find(l => editor.isActive('heading', { level: l }));
    const headingValue = activeLevel ? String(activeLevel) : '0';
    function onHeadingChange(e) {
        const val = +e.target.value;
        if (val === 0) {
            editor.chain().focus().setParagraph().run();
        }
        else {
            editor.chain().focus().toggleHeading({ level: val }).run();
        }
    }
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "toolbar-group", children: _jsxs("select", { value: headingValue, onChange: onHeadingChange, className: "toolbar-heading-select", title: "Text style", children: [_jsx("option", { value: "0", children: "Paragraph" }), _jsx("option", { value: "1", children: "Heading 1" }), _jsx("option", { value: "2", children: "Heading 2" }), _jsx("option", { value: "3", children: "Heading 3" })] }) }), _jsx("div", { className: "toolbar-separator" }), _jsxs("div", { className: "toolbar-group", children: [_jsx(Btn, { title: "Bold (Ctrl+B)", onClick: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold'), children: _jsx(MdFormatBold, {}) }), _jsx(Btn, { title: "Italic (Ctrl+I)", onClick: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic'), children: _jsx(MdFormatItalic, {}) }), _jsx(Btn, { title: "Underline (Ctrl+U)", onClick: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive('underline'), children: _jsx(MdFormatUnderlined, {}) }), _jsx(Btn, { title: "Strikethrough", onClick: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive('strike'), children: _jsx(MdFormatStrikethrough, {}) })] }), _jsx("div", { className: "toolbar-separator" }), _jsxs("div", { className: "toolbar-group", children: [_jsx(Btn, { title: "Subscript", onClick: () => editor.chain().focus().toggleSubscript().run(), active: editor.isActive('subscript'), children: _jsx(MdSubscript, {}) }), _jsx(Btn, { title: "Superscript", onClick: () => editor.chain().focus().toggleSuperscript().run(), active: editor.isActive('superscript'), children: _jsx(MdSuperscript, {}) })] }), _jsx("div", { className: "toolbar-separator" }), _jsxs("div", { className: "toolbar-group", children: [_jsx(Btn, { title: "Align Left", onClick: () => editor.chain().focus().setTextAlign('left').run(), active: editor.isActive({ textAlign: 'left' }), children: _jsx(MdFormatAlignLeft, {}) }), _jsx(Btn, { title: "Align Center", onClick: () => editor.chain().focus().setTextAlign('center').run(), active: editor.isActive({ textAlign: 'center' }), children: _jsx(MdFormatAlignCenter, {}) }), _jsx(Btn, { title: "Align Right", onClick: () => editor.chain().focus().setTextAlign('right').run(), active: editor.isActive({ textAlign: 'right' }), children: _jsx(MdFormatAlignRight, {}) })] })] }));
}
