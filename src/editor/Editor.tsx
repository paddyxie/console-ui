'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { useReducer, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react'
import type { Ref } from 'react'
import type { JSONContent } from '@tiptap/core'
import { StarterKit } from '@tiptap/starter-kit'
import { basicFormattingExtensions } from './extensions/BasicFormatting/BasicFormattingExtension'
import { listsExtensions } from './extensions/Lists/ListsExtension'
import { linkExtension } from './extensions/Link/LinkExtension'
import { ImageExtension } from './extensions/Image/ImageExtension'
import { tableExtensions } from './extensions/Table/TableExtension'
import { codeBlockExtension } from './extensions/CodeBlock/CodeBlockExtension'
import { MermaidExtension } from './extensions/Mermaid/MermaidExtension'
import { TableFloatingToolbar } from './extensions/Table/TableFloatingToolbar'
import { EditorContext, useEditorContext } from './EditorContext'
import { ThemeProvider, useTheme } from './ThemeContext'
import type { Theme } from './ThemeContext'
import { WidthProvider, useWidth } from './WidthContext'
import { Toolbar } from './toolbar/Toolbar'
import { jsonToMarkdown } from './markdownSerializer'
import './theme.css'
import './editor.css'

const extensions = [
  StarterKit.configure({
    bold: false,
    italic: false,
    strike: false,
    bulletList: false,
    orderedList: false,
    listItem: false,
    code: false,
    codeBlock: false,
  }),
  ...basicFormattingExtensions,
  ...listsExtensions,
  linkExtension,
  ImageExtension,
  ...tableExtensions,
  codeBlockExtension,
  MermaidExtension,
]

const defaultContent = `<h1>Welcome to the Editor</h1>
<p>Start typing here. Use the toolbar above to format text.</p>
`

export interface EditorSaveData {
  json: JSONContent
  html: string
  markdown: string
}

export interface EditorHandle {
  save: () => void
  getData: () => EditorSaveData | null
  getSelectionContext: () => { text: string; range: { from: number; to: number } } | null
  replaceRangeWithText: (range: { from: number; to: number }, text: string) => boolean
}

export interface EditorProps {
  content?: JSONContent
  onSave?: (data: EditorSaveData) => void
  readOnly?: boolean
  theme?: Theme
}

function EditorInner(
  { content, onSave, readOnly = false }: Omit<EditorProps, 'theme'>,
  ref: Ref<EditorHandle>
) {
  const editor = useEditor({
    extensions,
    content: content ?? defaultContent,
    editable: !readOnly,
    immediatelyRender: false,
  })

  useEffect(() => {
    if (!editor || !content?.type) return
    editor.commands.setContent(content)
  }, [editor, content])

  useEffect(() => {
    if (!editor) return
    editor.setEditable(!readOnly)
  }, [editor, readOnly])

  const [, tick] = useReducer(x => x + 1, 0)
  useEffect(() => {
    if (!editor) return
    editor.on('selectionUpdate', tick)
    editor.on('transaction', tick)
    return () => {
      editor.off('selectionUpdate', tick)
      editor.off('transaction', tick)
    }
  }, [editor])

  return (
    <EditorContext.Provider value={{ editor }}>
      <EditorUI onSave={onSave} readOnly={readOnly} ref={ref} />
    </EditorContext.Provider>
  )
}

const EditorUI = forwardRef<EditorHandle, { onSave?: (data: EditorSaveData) => void; readOnly: boolean }>(
  function EditorUI({ onSave, readOnly }, ref) {
    const { editor } = useEditorContext()
    const { theme } = useTheme()
    const { widthStyle } = useWidth()

    const getEditorData = useCallback((): EditorSaveData | null => {
      if (!editor) return null
      const json = editor.getJSON()
      return { json, html: editor.getHTML(), markdown: jsonToMarkdown(json) }
    }, [editor])

    const handleSave = useCallback(() => {
      if (!onSave) return
      const data = getEditorData()
      if (data) onSave(data)
    }, [getEditorData, onSave])

    const getSelectionContext = useCallback(() => {
      if (!editor) return null
      const { from, to, empty } = editor.state.selection
      if (empty) return null
      return {
        range: { from, to },
        text: editor.state.doc.textBetween(from, to, '\n'),
      }
    }, [editor])

    const replaceRangeWithText = useCallback((range: { from: number; to: number }, text: string) => {
      if (!editor) return false
      editor.chain().focus().insertContentAt(range, text).run()
      return true
    }, [editor])

    useImperativeHandle(ref, () => ({
      save: handleSave,
      getData: getEditorData,
      getSelectionContext,
      replaceRangeWithText,
    }), [handleSave, getEditorData, getSelectionContext, replaceRangeWithText])

    if (!editor) return null

    return (
      <div
        className="editor-root"
        data-theme={theme}
        data-read-only={readOnly ? 'true' : 'false'}
      >
        {!readOnly && <Toolbar />}

        <div className="editor-workspace">
          <div className="editor-document-column">
            <div
              className="editor-main"
              style={{ ...widthStyle, margin: '0 auto', transition: 'width 0.2s ease, max-width 0.2s ease' }}
            >
              <div className="editor-wrapper">
                <div className="editor-content">
                  <EditorContent editor={editor} />
                  {!readOnly && <TableFloatingToolbar editor={editor} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

const EditorInnerWithRef = forwardRef(EditorInner)

export const Editor = forwardRef<EditorHandle, EditorProps>(
  function Editor({ theme, ...props }, ref) {
    return (
      <ThemeProvider theme={theme}>
        <WidthProvider>
          <EditorInnerWithRef {...props} ref={ref} />
        </WidthProvider>
      </ThemeProvider>
    )
  }
)
