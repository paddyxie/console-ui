import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import './codeblock.css'

const LANGUAGES = [
  'plaintext', 'javascript', 'typescript', 'jsx', 'tsx',
  'python', 'go', 'rust', 'java', 'c', 'cpp', 'csharp',
  'html', 'css', 'json', 'yaml', 'bash', 'sql', 'markdown',
]

export function CodeBlockNodeView({ node, updateAttributes }: NodeViewProps) {
  const language: string = node.attrs.language || 'plaintext'

  return (
    <NodeViewWrapper className="code-block-wrapper">
      <div className="code-block-header" contentEditable={false}>
        <select
          value={language}
          onChange={e => updateAttributes({ language: e.target.value })}
          className="code-block-lang-select"
        >
          {LANGUAGES.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
          {!LANGUAGES.includes(language) && (
            <option value={language}>{language}</option>
          )}
        </select>
      </div>
      <pre>
        <NodeViewContent as="div" />
      </pre>
    </NodeViewWrapper>
  )
}
