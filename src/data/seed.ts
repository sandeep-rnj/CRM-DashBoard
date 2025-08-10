import { AppState } from '../types'

export const seed: AppState = {
  contacts: [
    { id: 'c_1', name: 'Acme Corporation', email: 'hello@acme.com', company: 'Acme' },
    { id: 'c_2', name: 'Beta LLC', email: 'sales@beta.com', company: 'Beta Co' },
    { id: 'c_3', name: 'Gamma Ltd', email: 'team@gamma.com', company: 'Gamma' }
  ],
  columns: {
    backlog: [
      { id: 't_1', title: 'Reach out to Acme', contactId: 'c_1', createdAt: new Date().toISOString() },
      { id: 't_2', title: 'Demo for Beta LLC', contactId: 'c_2', createdAt: new Date().toISOString() }
    ],
    inprogress: [
      { id: 't_3', title: 'Prepare proposal', contactId: 'c_3', createdAt: new Date().toISOString() }
    ],
    won: [],
    lost: []
  }
}
