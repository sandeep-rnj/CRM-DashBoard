import React, { useEffect, useMemo, useState, useRef } from 'react'
import { seed } from './data/seed'
import { loadState, saveState } from './utils/storage'
import { AppState, Contact, Task } from './types'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import KanbanBoard from './components/KanbanBoard'
import { ExportImport } from './components/ExportImport'
import ConfettiCanvas from './components/ConfettiCanvas'

export default function App(){
  const initial = useMemo(() => loadState() ?? seed, [])
  const [state, setState] = useState<AppState>(initial)
  const [query, setQuery] = useState('')
  const [lostPulse, setLostPulse] = useState<Record<string, number>>({})
  const confettiRef = useRef<{ burst: ()=>void } | null>(null)

  useEffect(() => {
    saveState(state)
  }, [state])

  const addContact = (c: Contact) => setState(s => ({ ...s, contacts: [...s.contacts, c] }))
  const updateContact = (c: Contact) => setState(s => ({ ...s, contacts: s.contacts.map(x => x.id === c.id ? c : x) }))
  const removeContact = (id: string) => setState(s => ({ ...s, contacts: s.contacts.filter(c => c.id !== id) }))

  const addTaskTo = (col: string, t: Task) => setState(s => ({ ...s, columns: { ...s.columns, [col]: [...(s.columns[col]||[]), t] } }))
  const updateColumns = (cols: AppState['columns']) => setState(s => ({ ...s, columns: cols }))
  const deleteTask = (taskId: string) => {
    const next: AppState['columns'] = {}
    for (const k of Object.keys(state.columns)) {
      next[k] = state.columns[k].filter(t => t.id !== taskId)
    }
    setState(s => ({ ...s, columns: next }))
  }

  const exportJson = () => JSON.stringify(state, null, 2)
  const importJson = (raw: string) => {
    try {
      const parsed = JSON.parse(raw) as AppState
      setState(parsed)
      return true
    } catch {
      return false
    }
  }

  // Called when a card changes column. Used to trigger confetti or sad effect.
  const onCardStatusChange = (taskId: string, destCol: string) => {
    if(destCol === 'won'){
      confettiRef.current?.burst?.()
    }
    if(destCol === 'lost'){
      // add a pulse timestamp to animate lost cards briefly
      setLostPulse(p => ({ ...p, [taskId]: Date.now() }))
      // remove after 4s
      setTimeout(()=> setLostPulse(p => { const np = { ...p }; delete np[taskId]; return np }), 4000)
    }
  }

  return (
    <div className="min-h-screen relative">
      <Header onSearch={setQuery} />
      <div className="flex gap-6 px-6 py-4">
        <Sidebar
          contacts={state.contacts}
          onAdd={addContact}
          onUpdate={updateContact}
          onDelete={removeContact}
        />
        <main className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Kanban</h2>
            <ExportImport onExport={exportJson} onImport={importJson} />
          </div>
          <KanbanBoard
            columns={state.columns}
            contacts={state.contacts}
            onColumnsChange={updateColumns}
            onAddTask={addTaskTo}
            onDeleteTask={deleteTask}
            query={query}
            onCardStatusChange={onCardStatusChange}
            lostPulse={lostPulse}
          />
        </main>
      </div>

      <ConfettiCanvas ref={confettiRef} />
    </div>
  )
}
