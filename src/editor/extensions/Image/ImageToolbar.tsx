"use client"
import { useRef, useState } from 'react'
import { MdImage } from 'react-icons/md'
import { useEditorContext } from '../../EditorContext'

export function ImageToolbar() {
  const { editor } = useEditorContext()
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  if (!editor) return null

  function insertByUrl() {
    if (!url.trim()) return
    editor!.chain().focus().insertContent({
      type: 'resizableImage',
      attrs: { src: url.trim(), alt: '' },
    }).run()
    setUrl('')
    setOpen(false)
  }

  function insertByFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      editor!.chain().focus().insertContent({
        type: 'resizableImage',
        attrs: { src: ev.target?.result as string, alt: file.name },
      }).run()
    }
    reader.readAsDataURL(file)
    e.target.value = ''
    setOpen(false)
  }

  return (
    <div className="toolbar-group" style={{ position: 'relative' }}>
      <button
        title="Insert Image"
        onMouseDown={e => e.preventDefault()}
        onClick={() => setOpen(o => !o)}
        className="toolbar-btn"
      >
        <MdImage />
      </button>
      {open && (
        <div className="link-popover" style={{ minWidth: 320 }}>
          <input
            autoFocus
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && insertByUrl()}
            placeholder="Image URL..."
          />
          <button onClick={insertByUrl}>Insert</button>
          <button onClick={() => inputRef.current?.click()}>Upload</button>
          <button onClick={() => setOpen(false)}>Cancel</button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={insertByFile}
          />
        </div>
      )}
    </div>
  )
}
