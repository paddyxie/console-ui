"use client"
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough'
import SubscriptIcon from '@mui/icons-material/Subscript'
import SuperscriptIcon from '@mui/icons-material/Superscript'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import { useEditorContext } from '../../EditorContext'

type Level = 1 | 2 | 3 | 4 | 5 | 6

function Btn({
  title, onClick, active, children,
}: { title: string; onClick: () => void; active: boolean; children: React.ReactNode }) {
  return (
    <button
      title={title}
      onMouseDown={e => e.preventDefault()}
      onClick={onClick}
      className={`toolbar-btn${active ? ' active' : ''}`}
      aria-pressed={active}
    >
      {children}
    </button>
  )
}

export function BasicFormattingToolbar() {
  const { editor } = useEditorContext()
  if (!editor) return null

  const activeLevel = ([1, 2, 3] as Level[]).find(l => editor.isActive('heading', { level: l }))
  const headingValue = activeLevel ? String(activeLevel) : '0'

  function onHeadingChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = +e.target.value
    if (val === 0) {
      editor!.chain().focus().setParagraph().run()
    } else {
      editor!.chain().focus().toggleHeading({ level: val as Level }).run()
    }
  }

  return (
    <>
      <div className="toolbar-group">
        <select
          value={headingValue}
          onChange={onHeadingChange}
          className="toolbar-heading-select"
          title="Text style"
        >
          <option value="0">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>
      </div>

      <div className="toolbar-separator" />

      <div className="toolbar-group">
        <Btn title="Bold (Ctrl+B)" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
          <FormatBoldIcon />
        </Btn>
        <Btn title="Italic (Ctrl+I)" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
          <FormatItalicIcon />
        </Btn>
        <Btn title="Underline (Ctrl+U)" onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')}>
          <FormatUnderlinedIcon />
        </Btn>
        <Btn title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')}>
          <FormatStrikethroughIcon />
        </Btn>
      </div>

      <div className="toolbar-separator" />

      <div className="toolbar-group">
        <Btn title="Subscript" onClick={() => editor.chain().focus().toggleSubscript().run()} active={editor.isActive('subscript')}>
          <SubscriptIcon />
        </Btn>
        <Btn title="Superscript" onClick={() => editor.chain().focus().toggleSuperscript().run()} active={editor.isActive('superscript')}>
          <SuperscriptIcon />
        </Btn>
      </div>

      <div className="toolbar-separator" />

      <div className="toolbar-group">
        <Btn title="Align Left" onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })}>
          <FormatAlignLeftIcon />
        </Btn>
        <Btn title="Align Center" onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })}>
          <FormatAlignCenterIcon />
        </Btn>
        <Btn title="Align Right" onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })}>
          <FormatAlignRightIcon />
        </Btn>
      </div>
    </>
  )
}
