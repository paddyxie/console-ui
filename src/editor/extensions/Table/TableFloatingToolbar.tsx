"use client"
import { useState, useEffect } from 'react'
import GridOnIcon from '@mui/icons-material/GridOn'
import type { Editor } from '@tiptap/react'
import { useEditorContext } from '../../EditorContext'
import './tablefloating.css'

interface Position {
  top: number
  left: number
  width: number
}

function getTablePosition(editor: Editor): Position | null {
  if (!editor.isActive('table')) return null

  const { state, view } = editor
  const { $from } = state.selection

  for (let depth = $from.depth; depth >= 0; depth--) {
    const node = $from.node(depth)
    if (node.type.name === 'table') {
      const pos = $from.before(depth)
      const dom = view.nodeDOM(pos) as HTMLElement | null
      if (!dom) break

      const container = view.dom.closest('.editor-content') as HTMLElement | null
      if (!container) break

      const tableRect = dom.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      return {
        top: tableRect.top - containerRect.top - 44,
        left: tableRect.left - containerRect.left,
        width: tableRect.width,
      }
    }
  }
  return null
}

interface FloatingProps {
  editor: Editor
}

function TftBtn({
  title, onClick, danger, active, children,
}: {
  title: string
  onClick: () => void
  danger?: boolean
  active?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      title={title}
      onMouseDown={e => e.preventDefault()}
      onClick={onClick}
      className={`tft-btn${danger ? ' tft-btn-danger' : ''}${active ? ' tft-btn-active' : ''}`}
    >
      {children}
    </button>
  )
}

export function TableFloatingToolbar({ editor }: FloatingProps) {
  const [pos, setPos] = useState<Position | null>(null)

  useEffect(() => {
    function update() { setPos(getTablePosition(editor)) }
    editor.on('selectionUpdate', update)
    editor.on('update', update)
    update()
    return () => {
      editor.off('selectionUpdate', update)
      editor.off('update', update)
    }
  }, [editor])

  if (!pos || !editor.isActive('table')) return null

  const inHeader = editor.isActive('tableHeader')
  const cmd = editor.chain().focus()

  return (
    <div
      className="table-floating-toolbar"
      style={{ top: pos.top, left: pos.left, minWidth: pos.width }}
      onMouseDown={e => e.preventDefault()}
    >
      <div className="table-floating-group">
        <TftBtn title="Insert row above" onClick={() => cmd.addRowBefore().run()}>↑ Row</TftBtn>
        <TftBtn title="Insert row below" onClick={() => cmd.addRowAfter().run()}>↓ Row</TftBtn>
        <TftBtn title="Delete row" onClick={() => cmd.deleteRow().run()} danger>✕ Row</TftBtn>
      </div>

      <div className="tft-divider" />

      <div className="table-floating-group">
        <TftBtn title="Insert column left"  onClick={() => cmd.addColumnBefore().run()}>← Col</TftBtn>
        <TftBtn title="Insert column right" onClick={() => cmd.addColumnAfter().run()}>→ Col</TftBtn>
        <TftBtn title="Delete column" onClick={() => cmd.deleteColumn().run()} danger>✕ Col</TftBtn>
      </div>

      <div className="tft-divider" />

      <div className="table-floating-group">
        <TftBtn title="Toggle header row" onClick={() => cmd.toggleHeaderRow().run()} active={inHeader}>H Row</TftBtn>
        <TftBtn title="Toggle header column" onClick={() => cmd.toggleHeaderColumn().run()} active={inHeader}>H Col</TftBtn>
      </div>

      <div className="tft-divider" />

      <div className="table-floating-group">
        <TftBtn title="Merge selected cells" onClick={() => cmd.mergeCells().run()}>Merge</TftBtn>
        <TftBtn title="Split merged cell"    onClick={() => cmd.splitCell().run()}>Split</TftBtn>
      </div>
    </div>
  )
}

export function TableInsertButton() {
  const { editor } = useEditorContext()
  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(3)

  if (!editor) return null

  function insertTable() {
    editor!.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()
    setOpen(false)
  }

  return (
    <div className="toolbar-group" style={{ position: 'relative' }}>
      <button title="Insert Table" onMouseDown={e => e.preventDefault()} onClick={() => setOpen(o => !o)} className="toolbar-btn" aria-label="Insert table">
        <GridOnIcon />
      </button>
      {open && (
        <div className="link-popover" style={{ minWidth: 210, flexDirection: 'column', gap: 10 }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: '#111' }}>Insert Table</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <label style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, color: '#444' }}>
              Rows
              <input type="number" min={1} max={20} value={rows} onChange={e => setRows(+e.target.value)}
                style={{ width: 52, padding: '3px 6px', border: '1px solid #e5e7eb', borderRadius: 5, fontSize: 13 }} />
            </label>
            <label style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, color: '#444' }}>
              Cols
              <input type="number" min={1} max={20} value={cols} onChange={e => setCols(+e.target.value)}
                style={{ width: 52, padding: '3px 6px', border: '1px solid #e5e7eb', borderRadius: 5, fontSize: 13 }} />
            </label>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={insertTable} style={{ padding: '5px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>Insert</button>
            <button onClick={() => setOpen(false)} style={{ padding: '5px 14px', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 5, cursor: 'pointer', fontSize: 13 }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
