import './App.css'
import { useState } from 'react'
import { useUsers } from './hooks/useUsers'
import { UserForm } from './components/UserForm'
import { UserTable } from './components/UserTable'
import type { User } from './types/user'

function App() {
  const { users, loading, error, create, update, remove } = useUsers()
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleCreate = async (data: { name: string; email: string }) => {
    setSubmitting(true)
    try {
      await create(data)
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdate = async (data: { name: string; email: string }) => {
    if (!editingUser) return
    setSubmitting(true)
    try {
      await update(editingUser.id, data)
      setEditingUser(null)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (user: User) => {
    await remove(user.id)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>User management</h1>
        <p className="muted">
          React + Supabase example CRUD. This app talks directly to Supabase, no custom backend.
        </p>
      </header>

      <main className="app-main">
        <section>
          <UserForm
            onSubmit={editingUser ? handleUpdate : handleCreate}
            submitting={submitting}
            initialUser={editingUser}
            onCancelEdit={() => setEditingUser(null)}
          />

          {error && <p className="form-error">Error: {error}</p>}
          {loading && !submitting && <p className="muted">Loading users…</p>}

          <UserTable users={users} onEdit={setEditingUser} onDelete={handleDelete} busy={submitting || loading} />
        </section>
      </main>
    </div>
  )
}

export default App
