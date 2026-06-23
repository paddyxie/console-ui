"use client"
import { useState } from 'react'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import LinkOffIcon from '@mui/icons-material/LinkOff'
import { useEditorContext } from '../../EditorContext'

export function LinkToolbar() {
  const { editor } = useEditorContext()
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')

  if (!editor) return null

  const isActive = editor.isActive('link')

  function applyLink() {
    if (!url) return
    editor!.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    setUrl('')
    setOpen(false)
  }

  function removeLink() {
    editor!.chain().focus().extendMarkRange('link').unsetLink().run()
  }

  return (
    <div className="toolbar-group" style={{ position: 'relative' }}>
      <button
        title="Insert / Edit Link"
        onMouseDown={e => e.preventDefault()}
        onClick={() => {
          const current = editor.getAttributes('link').href || ''
          setUrl(current)
          setOpen(o => !o)
        }}
        className={`toolbar-btn${isActive ? ' active' : ''}`}
      >
        <InsertLinkIcon />
      </button>
      {isActive && (
        <button title="Remove Link" onClick={removeLink} onMouseDown={e => e.preventDefault()} className="toolbar-btn">
          <LinkOffIcon />
        </button>
      )}
      {open && (
        <div className="link-popover">
          <input
            autoFocus
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && applyLink()}
            placeholder="https://…"
          />
          <button onClick={applyLink}>Apply</button>
          <button onClick={() => setOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  )
}
