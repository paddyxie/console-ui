import Link from '@tiptap/extension-link';
export const linkExtension = Link.configure({
    autolink: true,
    openOnClick: false,
    HTMLAttributes: {
        rel: 'noopener noreferrer',
        target: '_blank',
    },
});
