"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NodeViewWrapper } from '@tiptap/react';
import { useRef, useCallback } from 'react';
import './image.css';
export function ImageNodeView({ node, updateAttributes, selected }) {
    const { src, alt, width, height } = node.attrs;
    const startRef = useRef(null);
    const onMouseDown = useCallback((dir) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        const img = e.currentTarget.closest('.image-wrapper')?.querySelector('img');
        if (!img)
            return;
        const rect = img.getBoundingClientRect();
        startRef.current = { x: e.clientX, y: e.clientY, w: rect.width, h: rect.height };
        const aspect = rect.width / rect.height;
        function onMove(ev) {
            if (!startRef.current)
                return;
            const dx = ev.clientX - startRef.current.x;
            const dy = ev.clientY - startRef.current.y;
            let newW = startRef.current.w;
            let newH = startRef.current.h;
            if (dir.includes('e'))
                newW = Math.max(60, startRef.current.w + dx);
            if (dir.includes('w'))
                newW = Math.max(60, startRef.current.w - dx);
            if (dir.includes('s'))
                newH = Math.max(40, startRef.current.h + dy);
            if (dir.includes('n'))
                newH = Math.max(40, startRef.current.h - dy);
            if (dir.length === 2) {
                if (dir.includes('e') || dir.includes('w')) {
                    newH = Math.round(newW / aspect);
                }
                else {
                    newW = Math.round(newH * aspect);
                }
            }
            updateAttributes({ width: Math.round(newW), height: Math.round(newH) });
        }
        function onUp() {
            startRef.current = null;
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        }
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
    }, [updateAttributes]);
    const handles = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
    return (_jsx(NodeViewWrapper, { className: `image-node-view${selected ? ' selected' : ''}`, children: _jsxs("div", { className: "image-wrapper", children: [_jsx("img", { src: src, alt: alt, style: { width: width ? `${width}px` : undefined, height: height ? `${height}px` : undefined }, draggable: false }), selected && handles.map(dir => (_jsx("div", { className: `resize-handle resize-handle-${dir}`, onMouseDown: onMouseDown(dir) }, dir)))] }) }));
}
