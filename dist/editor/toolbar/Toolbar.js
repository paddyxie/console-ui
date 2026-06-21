'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BasicFormattingToolbar } from '../extensions/BasicFormatting/BasicFormattingToolbar';
import { ListsToolbar } from '../extensions/Lists/ListsToolbar';
import { LinkToolbar } from '../extensions/Link/LinkToolbar';
import { ImageToolbar } from '../extensions/Image/ImageToolbar';
import { TableInsertButton } from '../extensions/Table/TableFloatingToolbar';
import { CodeBlockToolbar } from '../extensions/CodeBlock/CodeBlockToolbar';
import { MermaidToolbar } from '../extensions/Mermaid/MermaidToolbar';
import { UndoRedoToolbar } from './UndoRedoToolbar';
import { WidthControl } from './WidthControl';
const Sep = () => _jsx("div", { className: "toolbar-separator" });
export function Toolbar() {
    return (_jsxs("div", { className: "editor-toolbar", children: [_jsx("div", { className: "toolbar-group", children: _jsx(WidthControl, {}) }), _jsx(Sep, {}), _jsx(BasicFormattingToolbar, {}), _jsx(Sep, {}), _jsx(ListsToolbar, {}), _jsx(Sep, {}), _jsx(LinkToolbar, {}), _jsx(Sep, {}), _jsx(ImageToolbar, {}), _jsx(Sep, {}), _jsx(TableInsertButton, {}), _jsx(Sep, {}), _jsx("div", { className: "toolbar-group", children: _jsx(UndoRedoToolbar, {}) }), _jsx(Sep, {}), _jsx(CodeBlockToolbar, {}), _jsx(Sep, {}), _jsx(MermaidToolbar, {})] }));
}
