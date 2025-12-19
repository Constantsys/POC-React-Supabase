import { type FormEvent, useEffect, useState } from 'react'
import type { NewUser, User } from '../types/user'

interface UserFormProps {
  onSubmit: (data: NewUser) => Promise<void> | void
  submitting: boolean
  initialUser?: User | null
  onCancelEdit?: () => void
}

const emptyForm: NewUser = {
  name: '',
  email: '',
}

export function UserForm({ onSubmit, submitting, initialUser, onCancelEdit }: UserFormProps) {
  const [form, setForm] = useState<NewUser>(emptyForm)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialUser) {
      setForm({
        name: initialUser.name,
        email: initialUser.email,
      })
    } else {
      setForm(emptyForm)
    }
  }, [initialUser])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!form.name.trim()) {
      setError('Name is required.')
      return
    }

    if (!form.email.trim()) {
      setError('Email is required.')
      return
    }

    try {
      await onSubmit({
        name: form.name.trim(),
        email: form.email.trim(),
      })

      if (!initialUser) {
        setForm(emptyForm)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error while saving user.'
      setError(message)
    }
  }

  return (
    <form className="card user-form" onSubmit={handleSubmit}>
      <h2>{initialUser ? 'Edit user' : 'Create user'}</h2>

      <div className="form-row">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Ada Lovelace"
        />
      </div>

      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="ada@example.com"
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        {initialUser && onCancelEdit && (
          <button type="button" className="secondary" onClick={onCancelEdit} disabled={submitting}>
            Cancel
          </button>
        )}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : initialUser ? 'Update user' : 'Create user'}
        </button>
      </div>
    </form>
  )
}


