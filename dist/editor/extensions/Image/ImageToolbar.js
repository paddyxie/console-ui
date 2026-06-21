"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { MdImage } from 'react-icons/md';
import { useEditorContext } from '../../EditorContext';
export function ImageToolbar() {
    const { editor } = useEditorContext();
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState('');
    const inputRef = useRef(null);
    if (!editor)
        return null;
    function insertByUrl() {
        if (!url.trim())
            return;
        editor.chain().focus().insertContent({
            type: 'resizableImage',
            attrs: { src: url.trim(), alt: '' },
        }).run();
        setUrl('');
        setOpen(false);
    }
    function insertByFile(e) {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = ev => {
            editor.chain().focus().insertContent({
                type: 'resizableImage',
                attrs: { src: ev.target?.result, alt: file.name },
            }).run();
        };
        reader.readAsDataURL(file);
        e.target.value = '';
        setOpen(false);
    }
    return (_jsxs("div", { className: "toolbar-group", style: { position: 'relative' }, children: [_jsx("button", { title: "Insert Image", onMouseDown: e => e.preventDefault(), onClick: () => setOpen(o => !o), className: "toolbar-btn", children: _jsx(MdImage, {}) }), open && (_jsxs("div", { className: "link-popover", style: { minWidth: 320 }, children: [_jsx("input", { autoFocus: true, value: url, onChange: e => setUrl(e.target.value), onKeyDown: e => e.key === 'Enter' && insertByUrl(), placeholder: "Image URL..." }), _jsx("button", { onClick: insertByUrl, children: "Insert" }), _jsx("button", { onClick: () => inputRef.current?.click(), children: "Upload" }), _jsx("button", { onClick: () => setOpen(false), children: "Cancel" }), _jsx("input", { ref: inputRef, type: "file", accept: "image/*", style: { display: 'none' }, onChange: insertByFile })] }))] }));
}
