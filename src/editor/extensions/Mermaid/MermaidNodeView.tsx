"use client"
import { NodeViewWrapper } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import { useState, useEffect, useId, useRef, useCallback } from 'react'
import mermaid from 'mermaid'
import { useTheme } from '../../ThemeContext'
import './mermaid.css'

mermaid.initialize({ startOnLoad: false, theme: 'default' })

const MIN_SCALE = 0.2
const MAX_SCALE = 5

type FlowDir = 'TB' | 'LR' | 'BT' | 'RL'
const FLOW_DIRS: FlowDir[] = ['TB', 'LR', 'BT', 'RL']
const FLOW_DIR_RE = /^((?:graph|flowchart)\s+)(TD|TB|LR|RL|BT)/m

function getFlowDir(src: string): FlowDir | null {
  const m = src.match(FLOW_DIR_RE)
  if (!m) return null
  return (m[2] === 'TD' ? 'TB' : m[2]) as FlowDir
}

function applyFlowDir(src: string, dir: FlowDir): string {
  return src.replace(FLOW_DIR_RE, `$1${dir}`)
}

export function MermaidNodeView({ node, updateAttributes, selected, editor }: NodeViewProps) {
  const { source } = node.attrs as { source: string }
  const { theme } = useTheme()
  const readOnly = !editor.isEditable
  const [editMode, setEditMode] = useState(false)
  const [draft, setDraft] = useState(source)
  const [svg, setSvg] = useState('')
  const [error, setError] = useState('')
  const uid = useId().replace(/:/g, '')
  const diagramId = `mermaid-${uid}`

  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const dragRef = useRef<{ startX: number; startY: number; tx: number; ty: number } | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const [previewHeight, setPreviewHeight] = useState<number | null>(null)
  const resizeRef = useRef<{ startY: number; startH: number } | null>(null)

  const onResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const el = previewRef.current
    if (!el) return
    resizeRef.current = { startY: e.clientY, startH: el.offsetHeight }
    const onMove = (ev: MouseEvent) => {
      if (!resizeRef.current) return
      const newH = Math.max(80, resizeRef.current.startH + ev.clientY - resizeRef.current.startY)
      setPreviewHeight(newH)
    }
    const onUp = () => {
      resizeRef.current = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [])

  useEffect(() => {
    let cancelled = false
    async function render() {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'default',
          themeVariables: theme === 'dark'
            ? {
                background: '#1e1e2e',
                mainBkg: '#313244',
                secondBkg: '#45475a',
                primaryColor: '#313244',
                primaryTextColor: '#cdd6f4',
                primaryBorderColor: '#89b4fa',
                lineColor: '#bac2de',
                edgeLabelBackground: '#1e1e2e',
                textColor: '#cdd6f4',
                nodeTextColor: '#cdd6f4',
                clusterBkg: '#181825',
                clusterBorder: '#45475a',
              }
            : undefined,
        })
        const { svg: rendered } = await mermaid.render(diagramId, source)
        if (!cancelled) {
          setSvg(rendered)
          setError('')
          setScale(1)
          setTranslate({ x: 0, y: 0 })
        }
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e))
      }
    }
    render()
    return () => { cancelled = true }
  }, [source, diagramId, theme])

  useEffect(() => {
    const el = previewRef.current
    if (!el || readOnly) return
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? 0.9 : 1.1
      setScale(s => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s * delta)))
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [editMode, readOnly])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (readOnly) return
    if (e.button !== 0) return
    e.preventDefault()
    dragRef.current = { startX: e.clientX, startY: e.clientY, tx: translate.x, ty: translate.y }
  }, [readOnly, translate])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (readOnly) return
    if (!dragRef.current) return
    setTranslate({
      x: dragRef.current.tx + e.clientX - dragRef.current.startX,
      y: dragRef.current.ty + e.clientY - dragRef.current.startY,
    })
  }, [readOnly])

  const onMouseUp = useCallback(() => { dragRef.current = null }, [])

  function applyEdit() {
    updateAttributes({ source: draft })
    setEditMode(false)
  }

  function resetView() {
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }

  const flowDir = getFlowDir(source)

  function changeDir(dir: FlowDir) {
    updateAttributes({ source: applyFlowDir(source, dir) })
  }

  return (
    <NodeViewWrapper className={`mermaid-node-view${selected ? ' selected' : ''}${readOnly ? ' read-only' : ''}`} contentEditable={false}>
      <div className="mermaid-header">
        <span className="mermaid-label">Mermaid</span>
        <div className="mermaid-header-actions">
          {!editMode && (
            <>
              {flowDir !== null && (
                <div className="mermaid-dir-controls">
                  {FLOW_DIRS.map(d => (
                    <button
                      key={d}
                      className={`mermaid-dir-btn${flowDir === d ? ' active' : ''}`}
                      onClick={() => changeDir(d)}
                      title={`Direction: ${d}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}
              <div className="mermaid-zoom-controls">
                <button onClick={() => setScale(s => Math.min(MAX_SCALE, s * 1.2))} title="Zoom in">+</button>
                <span className="mermaid-zoom-level">{Math.round(scale * 100)}%</span>
                <button onClick={() => setScale(s => Math.max(MIN_SCALE, s * 0.8))} title="Zoom out">−</button>
                <button onClick={resetView} title="Reset view">⊙</button>
              </div>
            </>
          )}
          <button className="mermaid-toggle" onClick={() => { setDraft(source); setEditMode(e => !e) }}>
            {editMode ? 'Preview' : 'Edit'}
          </button>
        </div>
      </div>

      {editMode ? (
        <div className="mermaid-editor">
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            rows={8}
            spellCheck={false}
          />
          <div className="mermaid-editor-actions">
            <button onClick={applyEdit}>Apply</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div
            className="mermaid-preview"
            ref={previewRef}
            style={previewHeight !== null ? { height: previewHeight } : undefined}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {error
              ? <div className="mermaid-error">{error}</div>
              : (
                <div
                  className="mermaid-canvas"
                  style={{ transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})` }}
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              )
            }
          </div>
          <div className="mermaid-resize-handle" onMouseDown={onResizeStart} />
        </>
      )}
    </NodeViewWrapper>
  )
}
