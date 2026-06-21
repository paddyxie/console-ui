"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { MdInsertLink, MdLinkOff } from 'react-icons/md';
import { useEditorContext } from '../../EditorContext';
export function LinkToolbar() {
    const { editor } = useEditorContext();
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState('');
    if (!editor)
        return null;
    const isActive = editor.isActive('link');
    function applyLink() {
        if (!url)
            return;
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        setUrl('');
        setOpen(false);
    }
    function removeLink() {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }
    return (_jsxs("div", { className: "toolbar-group", style: { position: 'relative' }, children: [_jsx("button", { title: "Insert / Edit Link", onMouseDown: e => e.preventDefault(), onClick: () => {
                    const current = editor.getAttributes('link').href || '';
                    setUrl(current);
                    setOpen(o => !o);
                }, className: `toolbar-btn${isActive ? ' active' : ''}`, children: _jsx(MdInsertLink, {}) }), isActive && (_jsx("button", { title: "Remove Link", onClick: removeLink, onMouseDown: e => e.preventDefault(), className: "toolbar-btn", children: _jsx(MdLinkOff, {}) })), open && (_jsxs("div", { className: "link-popover", children: [_jsx("input", { autoFocus: true, value: url, onChange: e => setUrl(e.target.value), onKeyDown: e => e.key === 'Enter' && applyLink(), placeholder: "https://\u2026" }), _jsx("button", { onClick: applyLink, children: "Apply" }), _jsx("button", { onClick: () => setOpen(false), children: "Cancel" })] }))] }));
}
