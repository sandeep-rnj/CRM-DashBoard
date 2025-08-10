
export default function Header({ onSearch }: { onSearch: (q: string) => void }){
  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-extrabold text-slate-900 animate-sparkle">SR</div>
          <div>
            <h1 className="text-lg font-semibold">Sandeep Ranjan CRM</h1>
            <div className="text-sm text-slate-400">Organize tasks, deals & contacts</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input onChange={(e)=>onSearch(e.target.value)} placeholder="Search tasks or contacts..." className="px-3 py-2 rounded-md bg-slate-700 border border-slate-600 focus:outline-none" />
        </div>
      </div>
    </header>
  )
}
