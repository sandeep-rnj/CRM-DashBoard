import React, { useRef } from 'react'

export function ExportImport({ onExport, onImport }:{ onExport: ()=>string, onImport: (raw: string)=>boolean }){
  const ref = useRef<HTMLInputElement | null>(null)

  const doExport = () => {
    const data = onExport()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'shiny-kanban-export.json'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const triggerImport = () => ref.current?.click()
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if(!f) return
    const reader = new FileReader()
    reader.onload = () => {
      const ok = onImport(String(reader.result))
      if(!ok) alert('Invalid JSON')
    }
    reader.readAsText(f)
    e.currentTarget.value = ''
  }

  return (
    <div className="flex gap-2">
      <button onClick={doExport} className="px-3 py-2 bg-slate-700 rounded">Export</button>
      <button onClick={triggerImport} className="px-3 py-2 bg-slate-700 rounded">Import</button>
      <input type="file" accept="application/json" ref={ref} onChange={handle} className="hidden" />
    </div>
  )
}
