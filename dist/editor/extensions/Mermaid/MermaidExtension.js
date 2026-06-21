import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { MermaidNodeView } from './MermaidNodeView';
import { v4 as uuidv4 } from 'uuid';
export const MermaidExtension = Node.create({
    name: 'mermaid',
    group: 'block',
    atom: true,
    draggable: true,
    addAttributes() {
        return {
            source: { default: 'graph TD\n  A --> B' },
            id: { default: () => uuidv4() },
        };
    },
    parseHTML() {
        return [{ tag: 'div[data-type="mermaid"]' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'mermaid' })];
    },
    addNodeView() {
        return ReactNodeViewRenderer(MermaidNodeView);
    },
});
