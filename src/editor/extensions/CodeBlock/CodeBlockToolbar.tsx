"use client"
import { MdCode } from 'react-icons/md'
import { useEditorContext } from '../../EditorContext'

export function CodeBlockToolbar() {
  const { editor } = useEditorContext()
  if (!editor) return null

  return (
    <div className="toolbar-group">
      <button
        title="Code Block"
        onMouseDown={e => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`toolbar-btn${editor.isActive('codeBlock') ? ' active' : ''}`}
        aria-label="Code block"
      >
        <MdCode />
      </button>
    </div>
  )
}
