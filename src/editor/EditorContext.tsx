"use client"
import { createContext, useContext } from 'react'
import type { Editor } from '@tiptap/react'

interface EditorContextValue {
  editor: Editor | null
}

export const EditorContext = createContext<EditorContextValue>({ editor: null })

export function useEditorContext() {
  return useContext(EditorContext)
}
