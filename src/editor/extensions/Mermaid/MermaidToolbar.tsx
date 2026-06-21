"use client"
import { useEditorContext } from '../../EditorContext'

const DEFAULT_SOURCE = `graph TD
  A[Start] --> B{Decision}
  B -->|Yes| C[Do it]
  B -->|No| D[Skip it]`

const MERMAID_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAYFBMVEVHcEzgCF7gCF/gCV/gCF7gCV/gCV/gCV/cBFzgCV/jBlzfAFXeAE7gAFrgAV70rsn////74OvpW47iGGjxmrv40N7kKHL/9vrrdJzviq/96/PmQn32wNLyosHkMHPdDGL46vnAAAAAIHRSTlMALVyWu9jt/wf2C///////////////////////////C9JagEIAAAEnSURBVHgBhZMFAsMgDEUrUEPr3t7/liNkmY/+avIfDhEoTlLGsyx/KMs4S5M4QhUpWl8q0wr8iud/xQsHpHlAqWu/DAFZHCV5UAm2EGqD+a+QUihNWa0g9r8s4t43tjZNq9BXujG1NZ7gUeaBzjr1g/DB0I8u6nyQIaAmCxon4fx59MGkEMBKm8V6rUqtFuEGGwQAiA3Ty7re0Q19Aqic7WZLdRGAkmSM+JmlfgVU0+rdvmjX7VsfhNmEnEeyx1mKzYhXYLdGi4aASejO7h+ArVtp0Deyre0XAPmJKgDyG6iHdcG5GOoXIHsCBwHHE8guAVpuMI51BGBcDwBpuWnDOGklvZSGN22Yqy13vWnjLOSX8fXBiYrQ0TsjpzP9c7iyFI7m1fG/AVn0KTLVesoTAAAAAElFTkSuQmCC'

export function MermaidToolbar() {
  const { editor } = useEditorContext()
  if (!editor) return null

  return (
    <div className="toolbar-group">
      <button
        title="Insert Mermaid Diagram"
        onMouseDown={e => e.preventDefault()}
        onClick={() => editor.chain().focus().insertContent({
          type: 'mermaid',
          attrs: { source: DEFAULT_SOURCE },
        }).run()}
        className="toolbar-btn"
        aria-label="Insert Mermaid diagram"
      >
        <img src={MERMAID_PNG} width="17" height="17" style={{ display: 'block' }} alt="" aria-hidden="true" />
      </button>
    </div>
  )
}
