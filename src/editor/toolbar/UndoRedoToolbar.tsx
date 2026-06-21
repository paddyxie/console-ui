'use client'

import { MdUndo, MdRedo } from 'react-icons/md'
import { useEditorContext } from '../EditorContext'

export function UndoRedoToolbar() {
  const { editor } = useEditorContext()
  if (!editor) return null

  return (
    <>
      <button
        onMouseDown={e => e.preventDefault()}
        className="toolbar-btn"
        title="Undo (Ctrl+Z)"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <MdUndo />
      </button>
      <button
        onMouseDown={e => e.preventDefault()}
        className="toolbar-btn"
        title="Redo (Ctrl+Y)"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <MdRedo />
      </button>
    </>
  )
}
