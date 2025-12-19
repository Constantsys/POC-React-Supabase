import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jsvmkednkvawsfewpzdx.supabase.co'
// const supabaseUrl = 'https://ynztxblzcauhvzfuzyjo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzdm1rZWRua3Zhd3NmZXdwemR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTQ1NjQsImV4cCI6MjA4MTUzMDU2NH0.l0FbfBdNeZzrrc40naiZQQG1DppDnKc5iAtkGw-19vg'
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluenR4Ymx6Y2F1aHZ6ZnV6eWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTI4NDEsImV4cCI6MjA4MTUyODg0MX0.Pm1nND5nulEyoDI-h8LccIz4oYxONZjFu1Jhmc3_3Nw'

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail fast in development if env vars are missing
  console.warn(
    '[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
    'Create a `.env` file based on `.env.example` and restart the dev server.',
  )
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')


