import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import Highlight from '@tiptap/extension-highlight'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'

export const basicFormattingExtensions = [
  Bold,
  Italic,
  Underline,
  Strike,
  Highlight.configure({ multicolor: true }),
  TextStyle,
  Color,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Subscript,
  Superscript,
]
