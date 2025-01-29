import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/AuthContext'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import type { Profile } from '@/lib/database.types'

export default function Profile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [fullName, setFullName] = useState('')
  const [avatar, setAvatar] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      if (!user) return
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!error && data) {
        setProfile(data)
        setFullName(data.full_name || '')
      }
      setLoading(false)
    }

    loadProfile()
  }, [user])

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return
    setAvatar(e.target.files[0])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      setSaving(true)

      let avatarUrl = profile?.avatar_url

      if (avatar) {
        const fileExt = avatar.name.split('.').pop()
        const filePath = `${user.id}/avatar.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatar, { upsert: true })

        if (!uploadError) {
          const { data } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath)
          
          avatarUrl = data.publicUrl
        }
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: fullName,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="section-padding">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-primary mb-8">
          Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-primary mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 bg-secondary border border-primary/20 rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label htmlFor="avatar" className="block text-primary mb-2">
              Avatar
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              className="w-full px-4 py-2 bg-secondary border border-primary/20 rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? 'Saving...' : 'Save Profile'}
          </Button>
        </form>
      </div>
    </div>
  )
} 