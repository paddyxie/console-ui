import { Node } from '@tiptap/core';
export interface ImageAttrs {
    src: string;
    alt: string;
    width: number | null;
    height: number | null;
    id: string;
}
export declare const ImageExtension: Node<object, object>;
