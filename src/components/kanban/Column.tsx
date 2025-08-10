import React from 'react'
import { Task, Contact } from '../../types'
import CardItem from './CardItem'
import { Droppable, Draggable } from '@hello-pangea/dnd'

export default function Column({ id, title, tasks, contacts, onAdd, onDelete, lostPulse }:
  { id: string, title: string, tasks: Task[], contacts: Contact[], onAdd: (title: string)=>void, onDelete: (id: string)=>void, lostPulse?: Record<string,number> }){
  return (
    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 min-h-[200px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold capitalize">{title} <span className="text-sm text-slate-400 ml-2">({tasks.length})</span></h3>
        <div className="text-sm text-slate-400"></div>
      </div>
      <button onClick={()=>{
        const t = prompt('Task title')
        if(t) onAdd(t)
      }} className="mb-3 px-2 py-1 rounded bg-gradient-to-r from-slate-700 to-slate-600 text-sm">+ Add task</button>

      <Droppable droppableId={id} type="task">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
            {tasks.map((task, idx) => (
              <Draggable draggableId={task.id} index={idx} key={task.id}>
                {(prov) => (
                  <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                    <CardItem task={task} contacts={contacts} onDelete={onDelete} columnId={id} lostPulse={lostPulse?.[task.id]} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
