import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ImageNodeView } from './ImageNodeView';
import { v4 as uuidv4 } from 'uuid';
export const ImageExtension = Node.create({
    name: 'resizableImage',
    group: 'block',
    atom: true,
    draggable: true,
    addAttributes() {
        return {
            src: { default: null },
            alt: { default: '' },
            width: { default: null },
            height: { default: null },
            id: { default: () => uuidv4() },
        };
    },
    parseHTML() {
        return [{ tag: 'img[src]' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['img', mergeAttributes(HTMLAttributes)];
    },
    addNodeView() {
        return ReactNodeViewRenderer(ImageNodeView);
    },
});
