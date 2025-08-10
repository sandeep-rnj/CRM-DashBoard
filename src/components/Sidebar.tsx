import React, { useState } from 'react'
import { Contact } from '../types'

export default function Sidebar({ contacts = [], onAdd, onUpdate, onDelete }:
  { contacts: Contact[], onAdd: (c: Contact)=>void, onUpdate: (c: Contact)=>void, onDelete: (id: string)=>void }){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if(!name) return alert('Name required')
    const c: Contact = { id: 'c_' + Math.random().toString(36).slice(2,9), name, email, company: name }
    onAdd(c)
    setName(''); setEmail('')
  }

  return (
    <aside className="w-80">
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <h3 className="font-semibold text-lg">Contacts</h3>
        <form className="mt-3 flex flex-col gap-2" onSubmit={submit}>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="px-3 py-2 rounded bg-slate-700 border border-slate-600" />
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="px-3 py-2 rounded bg-slate-700 border border-slate-600" />
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded bg-brand-500 font-semibold" type="submit">Add</button>
            <button type="button" onClick={()=>{setName(''); setEmail('')}} className="px-3 py-2 rounded bg-slate-600">Clear</button>
          </div>
        </form>

        <ul className="mt-4 space-y-2 max-h-64 overflow-auto">
          {contacts.map(c=>(
            <li key={c.id} className="flex items-center justify-between bg-slate-900 p-2 rounded">
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-slate-400">{c.email || '—'}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>onDelete(c.id)} className="text-xs px-2 py-1 bg-slate-700 rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
