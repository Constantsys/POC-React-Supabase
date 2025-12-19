import type { User } from '../types/user'

interface UserTableProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (user: User) => Promise<void> | void
  busy: boolean
}

export function UserTable({ users, onEdit, onDelete, busy }: UserTableProps) {
  if (users.length === 0) {
    return <p className="muted">No users yet. Create the first one using the form above.</p>
  }

  return (
    <div className="card">
      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
                <td className="actions-cell">
                  <button type="button" className="secondary" disabled={busy} onClick={() => onEdit(user)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="danger"
                    disabled={busy}
                    onClick={async () => {
                      // basic confirm to avoid accidental deletes
                      const confirmed = window.confirm(`Delete user "${user.name}"?`)
                      if (!confirmed) return
                      await onDelete(user)
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


