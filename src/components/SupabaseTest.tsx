import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthContext'

export default function SupabaseTest() {
  const { user } = useAuth()
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Try to get the current time from Supabase
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)

        if (error) throw error
        
        setStatus('connected')
        console.log('Supabase connection successful', { data })
      } catch (err) {
        setStatus('error')
        setErrorMessage(err instanceof Error ? err.message : 'Unknown error occurred')
        console.error('Supabase connection error:', err)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4 rounded-md bg-secondary/50 max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold mb-2">Supabase Connection Status</h2>
      <div className="space-y-2">
        <p>Status: {status}</p>
        {errorMessage && (
          <p className="text-red-500">{errorMessage}</p>
        )}
        <p>User: {user ? 'Logged in' : 'Not logged in'}</p>
      </div>
    </div>
  )
} 