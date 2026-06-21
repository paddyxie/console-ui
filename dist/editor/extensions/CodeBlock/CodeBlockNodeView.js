import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import './codeblock.css';
const LANGUAGES = [
    'plaintext', 'javascript', 'typescript', 'jsx', 'tsx',
    'python', 'go', 'rust', 'java', 'c', 'cpp', 'csharp',
    'html', 'css', 'json', 'yaml', 'bash', 'sql', 'markdown',
];
export function CodeBlockNodeView({ node, updateAttributes }) {
    const language = node.attrs.language || 'plaintext';
    return (_jsxs(NodeViewWrapper, { className: "code-block-wrapper", children: [_jsx("div", { className: "code-block-header", contentEditable: false, children: _jsxs("select", { value: language, onChange: e => updateAttributes({ language: e.target.value }), className: "code-block-lang-select", children: [LANGUAGES.map(lang => (_jsx("option", { value: lang, children: lang }, lang))), !LANGUAGES.includes(language) && (_jsx("option", { value: language, children: language }))] }) }), _jsx("pre", { children: _jsx(NodeViewContent, { as: "div" }) })] }));
}
