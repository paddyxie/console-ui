"use client"
import { NodeViewWrapper } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import { useRef, useCallback } from 'react'
import './image.css'

type ResizeDirection = 'se' | 'sw' | 'ne' | 'nw' | 'e' | 'w' | 's' | 'n'

export function ImageNodeView({ node, updateAttributes, selected }: NodeViewProps) {
  const { src, alt, width, height } = node.attrs as {
    src: string; alt: string; width: number | null; height: number | null
  }

  const startRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null)

  const onMouseDown = useCallback(
    (dir: ResizeDirection) => (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const img = (e.currentTarget as HTMLElement).closest('.image-wrapper')?.querySelector('img')
      if (!img) return

      const rect = img.getBoundingClientRect()
      startRef.current = { x: e.clientX, y: e.clientY, w: rect.width, h: rect.height }

      const aspect = rect.width / rect.height

      function onMove(ev: MouseEvent) {
        if (!startRef.current) return
        const dx = ev.clientX - startRef.current.x
        const dy = ev.clientY - startRef.current.y

        let newW = startRef.current.w
        let newH = startRef.current.h

        if (dir.includes('e')) newW = Math.max(60, startRef.current.w + dx)
        if (dir.includes('w')) newW = Math.max(60, startRef.current.w - dx)
        if (dir.includes('s')) newH = Math.max(40, startRef.current.h + dy)
        if (dir.includes('n')) newH = Math.max(40, startRef.current.h - dy)

        if (dir.length === 2) {
          if (dir.includes('e') || dir.includes('w')) {
            newH = Math.round(newW / aspect)
          } else {
            newW = Math.round(newH * aspect)
          }
        }

        updateAttributes({ width: Math.round(newW), height: Math.round(newH) })
      }

      function onUp() {
        startRef.current = null
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
      }

      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    },
    [updateAttributes]
  )

  const handles: ResizeDirection[] = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']

  return (
    <NodeViewWrapper className={`image-node-view${selected ? ' selected' : ''}`}>
      <div className="image-wrapper">
        <img
          src={src}
          alt={alt}
          style={{ width: width ? `${width}px` : undefined, height: height ? `${height}px` : undefined }}
          draggable={false}
        />
        {selected && handles.map(dir => (
          <div
            key={dir}
            className={`resize-handle resize-handle-${dir}`}
            onMouseDown={onMouseDown(dir)}
          />
        ))}
      </div>
    </NodeViewWrapper>
  )
}
