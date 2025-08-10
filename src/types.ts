export type ID = string

export interface Contact {
  id: ID
  name: string
  email?: string
  company?: string
  phone?: string
}

export interface Task {
  id: ID
  title: string
  description?: string
  contactId?: ID | null
  createdAt: string
}

export interface Columns {
  [key: string]: Task[]
}

export interface AppState {
  contacts: Contact[]
  columns: Columns
}
