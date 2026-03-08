import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

const BUCKET_TRANSCRIPT = 'Transcript'

/**
 * Auth
 */
export async function signUpWithEmail(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  return { data, error }
}

export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

export async function signOut() {
  return supabase.auth.signOut()
}

export function getSession() {
  return supabase.auth.getSession()
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback)
}

/**
 * Profile: create after signup (RLS: INSERT with auth.uid() = id)
 */
export async function createProfile({ id, full_name, email, graduation_year, phone, transcript_url }) {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id,
      full_name,
      email,
      graduation_year: Number(graduation_year),
      phone,
      role: 'student',
      status: 'pending',
      transcript_url: transcript_url || '',
    })
    .select()
    .single()
  return { data, error }
}

/**
 * Update current user's profile (RLS: UPDATE with auth.uid() = id).
 * Uses session user id so RLS policies are satisfied.
 */
export async function updateMyProfile(updates) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    return { data: null, error: userError || { message: 'غير مصادق' } }
  }
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single()
  return { data, error }
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}

export async function updateProfileStatus(userId, status) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ status })
    .eq('id', userId)
    .select()
    .single()
  return { data, error }
}

/**
 * Pending students (for admin)
 */
export async function getPendingProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
  return { data, error }
}

/**
 * Announcements
 */
export async function getAnnouncements() {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

/**
 * Storage: upload transcript (PDF or image) to public bucket.
 * Returns public URL on success. Uses current auth so storage RLS can allow upload.
 */
export async function uploadTranscript(file) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    return { data: null, error: userError || { message: 'يجب تسجيل الدخول أولاً' } }
  }
  const userId = user.id
  const ext = (file.name && file.name.split('.').pop()) || 'bin'
  const safeExt = ext.replace(/[^a-zA-Z0-9]/g, '') || 'file'
  const path = `${userId}/${Date.now()}.${safeExt}`

  const { error } = await supabase.storage.from(BUCKET_TRANSCRIPT).upload(path, file, {
    upsert: false,
  })
  if (error) return { data: null, error }

  const { data: urlData } = supabase.storage.from(BUCKET_TRANSCRIPT).getPublicUrl(path)
  const publicUrl = urlData?.publicUrl ?? null
  return { data: publicUrl, error: null }
}
