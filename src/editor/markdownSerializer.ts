import type { JSONContent } from '@tiptap/core'

export function jsonToMarkdown(json: JSONContent): string {
  return nodeToText(json)
}

function applyMarks(text: string, marks: NonNullable<JSONContent['marks']>): string {
  let result = text
  for (const mark of marks) {
    switch (mark.type) {
      case 'bold':      result = `**${result}**`; break
      case 'italic':    result = `*${result}*`; break
      case 'strike':    result = `~~${result}~~`; break
      case 'code':      result = `\`${result}\``; break
      case 'link':      result = `[${result}](${mark.attrs?.href ?? ''})`; break
    }
  }
  return result
}

function nodeToText(node: JSONContent, indent = ''): string {
  const type = node.type ?? ''

  if (type === 'text') {
    const text = node.text ?? ''
    return node.marks?.length ? applyMarks(text, node.marks) : text
  }

  const children = node.content ?? []

  switch (type) {
    case 'doc':
      return children.map(c => nodeToText(c, indent)).join('\n\n')

    case 'paragraph':
      return indent + children.map(c => nodeToText(c)).join('')

    case 'heading': {
      const level = node.attrs?.level ?? 1
      return '#'.repeat(level) + ' ' + children.map(c => nodeToText(c)).join('')
    }

    case 'bulletList':
      return children.map(c => nodeToText(c, '- ')).join('\n')

    case 'orderedList':
      return children.map((c, i) => nodeToText(c, `${i + 1}. `)).join('\n')

    case 'taskList':
      return children.map(c => nodeToText(c, '')).join('\n')

    case 'listItem':
      return indent + children.map(c => nodeToText(c)).join(' ')

    case 'taskItem': {
      const checked = node.attrs?.checked ? 'x' : ' '
      return `- [${checked}] ` + children.map(c => nodeToText(c)).join(' ')
    }

    case 'blockquote':
      return children.map(c => '> ' + nodeToText(c)).join('\n')

    case 'codeBlock': {
      const lang = node.attrs?.language ?? ''
      const code = children.map(c => nodeToText(c)).join('')
      return `\`\`\`${lang}\n${code}\n\`\`\``
    }

    case 'mermaid':
      return `\`\`\`mermaid\n${node.attrs?.source ?? ''}\n\`\`\``

    case 'table':
      return serializeTable(node)

    case 'resizableImage':
      return `![${node.attrs?.alt ?? ''}](${node.attrs?.src ?? ''})`

    case 'horizontalRule':
      return '---'

    default:
      return children.map(c => nodeToText(c, indent)).join('')
  }
}

function serializeTable(tableNode: JSONContent): string {
  const rows = tableNode.content ?? []
  const lines: string[] = []

  rows.forEach((row, ri) => {
    const cells = row.content ?? []
    const line = '| ' + cells
      .map(cell => (cell.content ?? []).map(c => nodeToText(c)).join(' ').replace(/\|/g, '\\|'))
      .join(' | ') + ' |'
    lines.push(line)

    if (ri === 0) {
      lines.push('| ' + cells.map(() => '---').join(' | ') + ' |')
    }
  })

  return lines.join('\n')
}
