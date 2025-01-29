import { createClient } from '@supabase/supabase-js';

// Default to null if environment variables are not set
let supabase = null;

try {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    // Validate URL format
    new URL(supabaseUrl);
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    console.warn('Missing Supabase environment variables - some features may be unavailable');
  }
} catch (error) {
  console.warn('Invalid Supabase configuration - some features may be unavailable');
}

export { supabase };

// Get current user session
export async function getCurrentSession() {
  if (!supabase) return null;
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error('Error getting session:', error.message);
    return null;
  }
}

// Sign out user
export async function signOut() {
  if (!supabase) throw new Error('Supabase client not initialized');
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
}

// Upload image to Supabase storage
export async function uploadImage(file, bucket, filename) {
  if (!supabase) throw new Error('Supabase client not initialized');
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('Authentication required');
    }

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: true
      });
    if (error) throw error;
    return filename;
  } catch (error) {
    console.error('Error uploading image:', error.message);
    throw error;
  }
}

// Delete image from Supabase storage
export async function deleteImage(bucket, filename) {
  if (!supabase) throw new Error('Supabase client not initialized');
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filename]);
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting image:', error.message);
    throw error;
  }
}

// Get public URL for an image
export async function getImageUrl(bucket, filename) {
  if (!supabase) throw new Error('Supabase client not initialized');
  try {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filename);
    return data.publicUrl;
  } catch (error) {
    console.error('Error getting image URL:', error.message);
    throw error;
  }
}