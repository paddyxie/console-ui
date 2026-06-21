"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { NodeViewWrapper } from '@tiptap/react';
import { useState, useEffect, useId, useRef, useCallback } from 'react';
import mermaid from 'mermaid';
import { useTheme } from '../../ThemeContext';
import './mermaid.css';
mermaid.initialize({ startOnLoad: false, theme: 'default' });
const MIN_SCALE = 0.2;
const MAX_SCALE = 5;
const FLOW_DIRS = ['TB', 'LR', 'BT', 'RL'];
const FLOW_DIR_RE = /^((?:graph|flowchart)\s+)(TD|TB|LR|RL|BT)/m;
function getFlowDir(src) {
    const m = src.match(FLOW_DIR_RE);
    if (!m)
        return null;
    return (m[2] === 'TD' ? 'TB' : m[2]);
}
function applyFlowDir(src, dir) {
    return src.replace(FLOW_DIR_RE, `$1${dir}`);
}
export function MermaidNodeView({ node, updateAttributes, selected, editor }) {
    const { source } = node.attrs;
    const { theme } = useTheme();
    const readOnly = !editor.isEditable;
    const [editMode, setEditMode] = useState(false);
    const [draft, setDraft] = useState(source);
    const [svg, setSvg] = useState('');
    const [error, setError] = useState('');
    const uid = useId().replace(/:/g, '');
    const diagramId = `mermaid-${uid}`;
    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const dragRef = useRef(null);
    const previewRef = useRef(null);
    const [previewHeight, setPreviewHeight] = useState(null);
    const resizeRef = useRef(null);
    const onResizeStart = useCallback((e) => {
        e.preventDefault();
        const el = previewRef.current;
        if (!el)
            return;
        resizeRef.current = { startY: e.clientY, startH: el.offsetHeight };
        const onMove = (ev) => {
            if (!resizeRef.current)
                return;
            const newH = Math.max(80, resizeRef.current.startH + ev.clientY - resizeRef.current.startY);
            setPreviewHeight(newH);
        };
        const onUp = () => {
            resizeRef.current = null;
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
    }, []);
    useEffect(() => {
        let cancelled = false;
        async function render() {
            try {
                mermaid.initialize({
                    startOnLoad: false,
                    theme: theme === 'dark' ? 'dark' : 'default',
                    themeVariables: theme === 'dark'
                        ? {
                            background: '#1e1e2e',
                            mainBkg: '#313244',
                            secondBkg: '#45475a',
                            primaryColor: '#313244',
                            primaryTextColor: '#cdd6f4',
                            primaryBorderColor: '#89b4fa',
                            lineColor: '#bac2de',
                            edgeLabelBackground: '#1e1e2e',
                            textColor: '#cdd6f4',
                            nodeTextColor: '#cdd6f4',
                            clusterBkg: '#181825',
                            clusterBorder: '#45475a',
                        }
                        : undefined,
                });
                const { svg: rendered } = await mermaid.render(diagramId, source);
                if (!cancelled) {
                    setSvg(rendered);
                    setError('');
                    setScale(1);
                    setTranslate({ x: 0, y: 0 });
                }
            }
            catch (e) {
                if (!cancelled)
                    setError(e instanceof Error ? e.message : String(e));
            }
        }
        render();
        return () => { cancelled = true; };
    }, [source, diagramId, theme]);
    useEffect(() => {
        const el = previewRef.current;
        if (!el || readOnly)
            return;
        const handler = (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            setScale(s => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s * delta)));
        };
        el.addEventListener('wheel', handler, { passive: false });
        return () => el.removeEventListener('wheel', handler);
    }, [editMode, readOnly]);
    const onMouseDown = useCallback((e) => {
        if (readOnly)
            return;
        if (e.button !== 0)
            return;
        e.preventDefault();
        dragRef.current = { startX: e.clientX, startY: e.clientY, tx: translate.x, ty: translate.y };
    }, [readOnly, translate]);
    const onMouseMove = useCallback((e) => {
        if (readOnly)
            return;
        if (!dragRef.current)
            return;
        setTranslate({
            x: dragRef.current.tx + e.clientX - dragRef.current.startX,
            y: dragRef.current.ty + e.clientY - dragRef.current.startY,
        });
    }, [readOnly]);
    const onMouseUp = useCallback(() => { dragRef.current = null; }, []);
    function applyEdit() {
        updateAttributes({ source: draft });
        setEditMode(false);
    }
    function resetView() {
        setScale(1);
        setTranslate({ x: 0, y: 0 });
    }
    const flowDir = getFlowDir(source);
    function changeDir(dir) {
        updateAttributes({ source: applyFlowDir(source, dir) });
    }
    return (_jsxs(NodeViewWrapper, { className: `mermaid-node-view${selected ? ' selected' : ''}${readOnly ? ' read-only' : ''}`, contentEditable: false, children: [_jsxs("div", { className: "mermaid-header", children: [_jsx("span", { className: "mermaid-label", children: "Mermaid" }), _jsxs("div", { className: "mermaid-header-actions", children: [!editMode && (_jsxs(_Fragment, { children: [flowDir !== null && (_jsx("div", { className: "mermaid-dir-controls", children: FLOW_DIRS.map(d => (_jsx("button", { className: `mermaid-dir-btn${flowDir === d ? ' active' : ''}`, onClick: () => changeDir(d), title: `Direction: ${d}`, children: d }, d))) })), _jsxs("div", { className: "mermaid-zoom-controls", children: [_jsx("button", { onClick: () => setScale(s => Math.min(MAX_SCALE, s * 1.2)), title: "Zoom in", children: "+" }), _jsxs("span", { className: "mermaid-zoom-level", children: [Math.round(scale * 100), "%"] }), _jsx("button", { onClick: () => setScale(s => Math.max(MIN_SCALE, s * 0.8)), title: "Zoom out", children: "\u2212" }), _jsx("button", { onClick: resetView, title: "Reset view", children: "\u2299" })] })] })), _jsx("button", { className: "mermaid-toggle", onClick: () => { setDraft(source); setEditMode(e => !e); }, children: editMode ? 'Preview' : 'Edit' })] })] }), editMode ? (_jsxs("div", { className: "mermaid-editor", children: [_jsx("textarea", { value: draft, onChange: e => setDraft(e.target.value), rows: 8, spellCheck: false }), _jsxs("div", { className: "mermaid-editor-actions", children: [_jsx("button", { onClick: applyEdit, children: "Apply" }), _jsx("button", { onClick: () => setEditMode(false), children: "Cancel" })] })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "mermaid-preview", ref: previewRef, style: previewHeight !== null ? { height: previewHeight } : undefined, onMouseDown: onMouseDown, onMouseMove: onMouseMove, onMouseUp: onMouseUp, onMouseLeave: onMouseUp, children: error
                            ? _jsx("div", { className: "mermaid-error", children: error })
                            : (_jsx("div", { className: "mermaid-canvas", style: { transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})` }, dangerouslySetInnerHTML: { __html: svg } })) }), _jsx("div", { className: "mermaid-resize-handle", onMouseDown: onResizeStart })] }))] }));
}
