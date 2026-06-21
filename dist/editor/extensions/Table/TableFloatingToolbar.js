"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { MdGridOn } from 'react-icons/md';
import { useEditorContext } from '../../EditorContext';
import './tablefloating.css';
function getTablePosition(editor) {
    if (!editor.isActive('table'))
        return null;
    const { state, view } = editor;
    const { $from } = state.selection;
    for (let depth = $from.depth; depth >= 0; depth--) {
        const node = $from.node(depth);
        if (node.type.name === 'table') {
            const pos = $from.before(depth);
            const dom = view.nodeDOM(pos);
            if (!dom)
                break;
            const container = view.dom.closest('.editor-content');
            if (!container)
                break;
            const tableRect = dom.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            return {
                top: tableRect.top - containerRect.top - 44,
                left: tableRect.left - containerRect.left,
                width: tableRect.width,
            };
        }
    }
    return null;
}
function TftBtn({ title, onClick, danger, active, children, }) {
    return (_jsx("button", { title: title, onMouseDown: e => e.preventDefault(), onClick: onClick, className: `tft-btn${danger ? ' tft-btn-danger' : ''}${active ? ' tft-btn-active' : ''}`, children: children }));
}
export function TableFloatingToolbar({ editor }) {
    const [pos, setPos] = useState(null);
    useEffect(() => {
        function update() { setPos(getTablePosition(editor)); }
        editor.on('selectionUpdate', update);
        editor.on('update', update);
        update();
        return () => {
            editor.off('selectionUpdate', update);
            editor.off('update', update);
        };
    }, [editor]);
    if (!pos || !editor.isActive('table'))
        return null;
    const inHeader = editor.isActive('tableHeader');
    const cmd = editor.chain().focus();
    return (_jsxs("div", { className: "table-floating-toolbar", style: { top: pos.top, left: pos.left, minWidth: pos.width }, onMouseDown: e => e.preventDefault(), children: [_jsxs("div", { className: "table-floating-group", children: [_jsx(TftBtn, { title: "Insert row above", onClick: () => cmd.addRowBefore().run(), children: "\u2191 Row" }), _jsx(TftBtn, { title: "Insert row below", onClick: () => cmd.addRowAfter().run(), children: "\u2193 Row" }), _jsx(TftBtn, { title: "Delete row", onClick: () => cmd.deleteRow().run(), danger: true, children: "\u2715 Row" })] }), _jsx("div", { className: "tft-divider" }), _jsxs("div", { className: "table-floating-group", children: [_jsx(TftBtn, { title: "Insert column left", onClick: () => cmd.addColumnBefore().run(), children: "\u2190 Col" }), _jsx(TftBtn, { title: "Insert column right", onClick: () => cmd.addColumnAfter().run(), children: "\u2192 Col" }), _jsx(TftBtn, { title: "Delete column", onClick: () => cmd.deleteColumn().run(), danger: true, children: "\u2715 Col" })] }), _jsx("div", { className: "tft-divider" }), _jsxs("div", { className: "table-floating-group", children: [_jsx(TftBtn, { title: "Toggle header row", onClick: () => cmd.toggleHeaderRow().run(), active: inHeader, children: "H Row" }), _jsx(TftBtn, { title: "Toggle header column", onClick: () => cmd.toggleHeaderColumn().run(), active: inHeader, children: "H Col" })] }), _jsx("div", { className: "tft-divider" }), _jsxs("div", { className: "table-floating-group", children: [_jsx(TftBtn, { title: "Merge selected cells", onClick: () => cmd.mergeCells().run(), children: "Merge" }), _jsx(TftBtn, { title: "Split merged cell", onClick: () => cmd.splitCell().run(), children: "Split" })] })] }));
}
export function TableInsertButton() {
    const { editor } = useEditorContext();
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);
    if (!editor)
        return null;
    function insertTable() {
        editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
        setOpen(false);
    }
    return (_jsxs("div", { className: "toolbar-group", style: { position: 'relative' }, children: [_jsx("button", { title: "Insert Table", onMouseDown: e => e.preventDefault(), onClick: () => setOpen(o => !o), className: "toolbar-btn", "aria-label": "Insert table", children: _jsx(MdGridOn, {}) }), open && (_jsxs("div", { className: "link-popover", style: { minWidth: 210, flexDirection: 'column', gap: 10 }, children: [_jsx("div", { style: { fontWeight: 600, fontSize: 13, color: '#111' }, children: "Insert Table" }), _jsxs("div", { style: { display: 'flex', gap: 10, alignItems: 'center' }, children: [_jsxs("label", { style: { fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, color: '#444' }, children: ["Rows", _jsx("input", { type: "number", min: 1, max: 20, value: rows, onChange: e => setRows(+e.target.value), style: { width: 52, padding: '3px 6px', border: '1px solid #e5e7eb', borderRadius: 5, fontSize: 13 } })] }), _jsxs("label", { style: { fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, color: '#444' }, children: ["Cols", _jsx("input", { type: "number", min: 1, max: 20, value: cols, onChange: e => setCols(+e.target.value), style: { width: 52, padding: '3px 6px', border: '1px solid #e5e7eb', borderRadius: 5, fontSize: 13 } })] })] }), _jsxs("div", { style: { display: 'flex', gap: 8 }, children: [_jsx("button", { onClick: insertTable, style: { padding: '5px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer', fontSize: 13, fontWeight: 500 }, children: "Insert" }), _jsx("button", { onClick: () => setOpen(false), style: { padding: '5px 14px', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 5, cursor: 'pointer', fontSize: 13 }, children: "Cancel" })] })] }))] }));
}
