'use client'

import { BasicFormattingToolbar } from '../extensions/BasicFormatting/BasicFormattingToolbar'
import { ListsToolbar } from '../extensions/Lists/ListsToolbar'
import { LinkToolbar } from '../extensions/Link/LinkToolbar'
import { ImageToolbar } from '../extensions/Image/ImageToolbar'
import { TableInsertButton } from '../extensions/Table/TableFloatingToolbar'
import { CodeBlockToolbar } from '../extensions/CodeBlock/CodeBlockToolbar'
import { MermaidToolbar } from '../extensions/Mermaid/MermaidToolbar'
import { UndoRedoToolbar } from './UndoRedoToolbar'
import { WidthControl } from './WidthControl'
import { ThemeToggle } from './ThemeToggle'

const Sep = () => <div className="toolbar-separator" />

export function Toolbar() {
  return (
    <div className="editor-toolbar">
      <div className="toolbar-group">
        <WidthControl />
      </div>
      <Sep />
      <BasicFormattingToolbar />
      <Sep />
      <ListsToolbar />
      <Sep />
      <LinkToolbar />
      <Sep />
      <ImageToolbar />
      <Sep />
      <TableInsertButton />
      <Sep />
      <div className="toolbar-group">
        <UndoRedoToolbar />
      </div>
      <Sep />
      <CodeBlockToolbar />
      <Sep />
      <MermaidToolbar />
      <div style={{ flex: 1 }} />
      <Sep />
      <div className="toolbar-group">
        <ThemeToggle />
      </div>
    </div>
  )
}
