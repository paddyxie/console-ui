import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { createLowlight, common } from 'lowlight'
import { CodeBlockNodeView } from './CodeBlockNodeView'

const lowlight = createLowlight(common)

export const codeBlockExtension = CodeBlockLowlight.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockNodeView)
  },
}).configure({ lowlight })
