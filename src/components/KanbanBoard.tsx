import React, { useMemo } from 'react'
import { Columns, Contact, Task } from '../types'
import Column from './kanban/Column'
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'

export default function KanbanBoard({ columns, contacts, onColumnsChange, onAddTask, onDeleteTask, query, onCardStatusChange, lostPulse }:
  { columns: Columns, contacts: Contact[], onColumnsChange: (c: Columns)=>void, onAddTask: (col: string, t: Task)=>void, onDeleteTask: (id:string)=>void, query?: string, onCardStatusChange?: (id:string, dest:string)=>void, lostPulse?: Record<string,number> }){
  const colKeys = Object.keys(columns)
  const filtered = useMemo(()=>{
    if(!query) return columns
    const q = query.toLowerCase()
    const out: Columns = {}
    for (const k of colKeys) {
      out[k] = columns[k].filter(t => t.title.toLowerCase().includes(q))
    }
    return out
  }, [columns, query])

  const onDragEnd = (res: DropResult) => {
    const { source, destination } = res
    if(!destination) return
    if(source.droppableId === destination.droppableId && source.index === destination.index) return

    const from = Array.from(columns[source.droppableId])
    const [moved] = from.splice(source.index, 1)
    const to = Array.from(columns[destination.droppableId])
    to.splice(destination.index, 0, moved)

    const next = { ...columns, [source.droppableId]: from, [destination.droppableId]: to }
    onColumnsChange(next)

    if(onCardStatusChange){
      onCardStatusChange(moved.id, destination.droppableId)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-4 gap-4">
        {Object.keys(filtered).map(key => (
          <Droppable droppableId={key} key={key}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Column
                  id={key}
                  title={key}
                  tasks={filtered[key]}
                  contacts={contacts}
                  onAdd={(title)=> {
                    const t: Task = { id: 't_' + Math.random().toString(36).slice(2,9), title, createdAt: new Date().toISOString(), contactId: contacts[0]?.id ?? null }
                    onAddTask(key, t)
                  }}
                  onDelete={onDeleteTask}
                  lostPulse={lostPulse}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}
