import { AppState } from '../types'

const KEY = 'shiny-kanban-state-v2'

export function loadState(): AppState | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) as AppState : null
  } catch {
    return null
  }
}

export function saveState(state: AppState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch (e) {
    console.error('Failed to save state', e)
  }
}
