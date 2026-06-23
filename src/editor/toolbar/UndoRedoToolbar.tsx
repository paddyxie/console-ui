'use client'

import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'
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
        <UndoIcon />
      </button>
      <button
        onMouseDown={e => e.preventDefault()}
        className="toolbar-btn"
        title="Redo (Ctrl+Y)"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <RedoIcon />
      </button>
    </>
  )
}
