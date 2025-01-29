export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  image_url: string | null
  user_id: string
  created_at: string
  tags: string[]
} 