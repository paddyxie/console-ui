"use client"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import ChecklistIcon from '@mui/icons-material/Checklist'
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease'
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease'
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
        <FormatListBulletedIcon />
      </button>
      <button
        title="Numbered List"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        onMouseDown={e => e.preventDefault()}
        className={`toolbar-btn${editor.isActive('orderedList') ? ' active' : ''}`}
      >
        <FormatListNumberedIcon />
      </button>
      <button
        title="Task List"
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        onMouseDown={e => e.preventDefault()}
        className={`toolbar-btn${editor.isActive('taskList') ? ' active' : ''}`}
      >
        <ChecklistIcon />
      </button>
      <button
        title="Indent (Tab)"
        onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
        onMouseDown={e => e.preventDefault()}
        className="toolbar-btn"
      >
        <FormatIndentIncreaseIcon />
      </button>
      <button
        title="Outdent (Shift+Tab)"
        onClick={() => editor.chain().focus().liftListItem('listItem').run()}
        onMouseDown={e => e.preventDefault()}
        className="toolbar-btn"
      >
        <FormatIndentDecreaseIcon />
      </button>
    </div>
  )
}
