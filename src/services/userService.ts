import { supabase } from '../lib/supabaseClient'
import type { NewUser, User } from '../types/user'

const TABLE_NAME = 'users'

export async function fetchUsers(): Promise<User[]> {
    const { data, error } = await supabase.from(TABLE_NAME).select('*').order('created_at', { ascending: false })

    if (error) {
        throw error
    }

    return (data ?? []) as User[]
}

export async function createUser(payload: NewUser): Promise<User> {
    const { data, error } = await supabase.from(TABLE_NAME).insert(payload).select().single()

    if (error) {
        throw error
    }

    return data as User
}

export async function updateUser(id: string, updates: Partial<NewUser>): Promise<User> {
    const { data, error } = await supabase.from(TABLE_NAME).update(updates).eq('id', id).select().single()

    if (error) {
        throw error
    }

    return data as User
}

export async function deleteUser(id: string): Promise<void> {
    const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id)

    if (error) {
        throw error
    }
}


