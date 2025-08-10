import React from 'react'
import { Task, Contact } from '../../types'
import { motion } from 'framer-motion'

export default function CardItem({ task, contacts = [], onDelete, columnId, lostPulse }:
  { task: Task, contacts?: Contact[], onDelete: (id: string)=>void, columnId?: string, lostPulse?: number }){
  const contact = contacts.find(c=>c.id === task.contactId)
  const isWon = columnId === 'won'
  const isLost = columnId === 'lost'
  return (
    <motion.div initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} whileHover={{ scale: 1.01 }} className={`relative bg-gradient-to-br from-slate-900 to-slate-800 p-3 rounded shadow transform transition-shadow duration-200 ${isWon ? 'ring-2 ring-emerald-400' : ''} ${isLost ? 'filter grayscale opacity-80' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium text-slate-100">{task.title}</div>
          <div className="text-xs text-slate-400">{contact ? contact.name : 'No contact'}</div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {isWon && <span className="text-xs px-2 py-1 bg-emerald-500 text-slate-900 rounded font-semibold">WON</span>}
          {isLost && <span className="text-xs px-2 py-1 bg-red-600 text-slate-100 rounded font-semibold">LOST</span>}
          <button onClick={()=>onDelete(task.id)} className="text-xs px-2 py-1 bg-slate-700 rounded">Delete</button>
        </div>
      </div>
      {isLost && (
        <div className="mt-2 text-sm text-slate-400 flex items-center gap-2">
          <span className="text-2xl">😔</span>
          <span className="animate-sadDrop">This deal was lost</span>
        </div>
      )}
      {/* small pulse overlay when recently moved to lost */}
      {lostPulse && <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-red-600/10 to-transparent animate-pulse rounded" />}
    </motion.div>
  )
}
