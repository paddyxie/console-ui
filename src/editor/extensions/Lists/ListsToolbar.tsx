"use client"
import {
  MdFormatListBulleted, MdFormatListNumbered, MdChecklist,
  MdFormatIndentIncrease, MdFormatIndentDecrease,
} from 'react-icons/md'
import { useEditorContext } from '../../EditorContext'

export function ListsToolbar() {
  const { editor } = useEditorContext()
  if (!editor) return null

  return (
    <div className="toolbar-group">
      <button
        title="Bullet List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        onMouseDown={e => e.preventDefault()}
        className={`toolbar-btn${editor.isActive('bulletList') ? ' active' : ''}`}
      >
        <MdFormatListBulleted />
      </button>
      <button
        title="Numbered List"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        onMouseDown={e => e.preventDefault()}
        className={`toolbar-btn${editor.isActive('orderedList') ? ' active' : ''}`}
      >
        <MdFormatListNumbered />
      </button>
      <button
        title="Task List"
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        onMouseDown={e => e.preventDefault()}
        className={`toolbar-btn${editor.isActive('taskList') ? ' active' : ''}`}
      >
        <MdChecklist />
      </button>
      <button
        title="Indent (Tab)"
        onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
        onMouseDown={e => e.preventDefault()}
        className="toolbar-btn"
      >
        <MdFormatIndentIncrease />
      </button>
      <button
        title="Outdent (Shift+Tab)"
        onClick={() => editor.chain().focus().liftListItem('listItem').run()}
        onMouseDown={e => e.preventDefault()}
        className="toolbar-btn"
      >
        <MdFormatIndentDecrease />
      </button>
    </div>
  )
}
