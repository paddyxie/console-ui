import type { WidthPreset } from '../WidthContext'
import { useWidth } from '../WidthContext'

const OPTIONS: { value: WidthPreset; label: string }[] = [
  { value: '50%',  label: '50%' },
  { value: '75%',  label: '75%' },
  { value: '90%',  label: '90%' },
  { value: '100%', label: '100%' },
  { value: '120%', label: '120%' },
  { value: '150%', label: '150%' },
  { value: '175%', label: '175%' },
  { value: '200%', label: '200%' },
  { value: 'fit',  label: 'Fit' },
]

export function WidthControl() {
  const { preset, setPreset } = useWidth()
  return (
    <select
      className="toolbar-heading-select width-select"
      value={preset}
      onChange={e => setPreset(e.target.value as WidthPreset)}
      title="Editor width"
    >
      {OPTIONS.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}
