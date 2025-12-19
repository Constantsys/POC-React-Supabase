import { useCallback, useEffect, useState } from 'react'
import type { NewUser, User } from '../types/user'
import { createUser, deleteUser, fetchUsers, updateUser } from '../services/userService'

interface UseUsersState {
  users: User[]
  loading: boolean
  error: string | null
}

export function useUsers() {
  const [state, setState] = useState<UseUsersState>({
    users: [],
    loading: false,
    error: null,
  })

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const users = await fetchUsers()
      setState({ users, loading: false, error: null })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load users'
      setState((prev) => ({ ...prev, loading: false, error: message }))
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const create = useCallback(async (payload: NewUser) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const user = await createUser(payload)
      setState((prev) => ({ ...prev, loading: false, users: [user, ...prev.users] }))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create user'
      setState((prev) => ({ ...prev, loading: false, error: message }))
      throw err
    }
  }, [])

  const update = useCallback(async (id: string, updates: Partial<NewUser>) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const updated = await updateUser(id, updates)
      setState((prev) => ({
        ...prev,
        loading: false,
        users: prev.users.map((u) => (u.id === id ? updated : u)),
      }))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update user'
      setState((prev) => ({ ...prev, loading: false, error: message }))
      throw err
    }
  }, [])

  const remove = useCallback(async (id: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      await deleteUser(id)
      setState((prev) => ({
        ...prev,
        loading: false,
        users: prev.users.filter((u) => u.id !== id),
      }))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete user'
      setState((prev) => ({ ...prev, loading: false, error: message }))
      throw err
    }
  }, [])

  return {
    users: state.users,
    loading: state.loading,
    error: state.error,
    reload: load,
    create,
    update,
    remove,
  }
}


