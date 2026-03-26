import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

const BUCKET_TRANSCRIPT = 'Transcript'
const BUCKET_ANNOUNCEMENTS = 'announcements'

/**
 * Auth
 */
export async function signUpWithEmail(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  return { data, error }
}

/**
 * Wait for Supabase Auth to confirm the session before doing .select() or other RLS calls.
 * Call after signUp/setSession or signIn. Tries getSession() first, then onAuthStateChange, then timeout fallback.
 * @param timeoutMs - max wait before rejecting
 * @returns Promise<{ session }> resolves when session is confirmed
 */
export function waitForAuthSession(timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    let settled = false
    let subscription
    const finish = (session) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      if (subscription) subscription.unsubscribe()
      if (session) resolve({ session })
      else reject(new Error('Auth confirmation timeout'))
    }
    const { data: { subscription: sub } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) finish(session)
    })
    subscription = sub
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (session) finish(session)
      })
      .catch((err) => {
        if (!settled) {
          settled = true
          clearTimeout(timer)
          if (subscription) subscription.unsubscribe()
          reject(err)
        }
      })
    const timer = setTimeout(() => {
      supabase.auth
        .getSession()
        .then(({ data: { session } }) => finish(session))
        .catch((err) => {
          if (!settled) {
            settled = true
            if (subscription) subscription.unsubscribe()
            reject(err)
          }
        })
    }, timeoutMs)
  })
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
 * Profile: create after signup. RLS: INSERT allowed when auth.uid() = id.
 * Use transcript_url: '' for initial insert; set transcript_url after upload via updateMyProfile.
 */
export async function createProfile({ id, full_name, email, graduation_year, phone, transcript_url }) {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id,
      full_name: full_name?.trim() ?? '',
      email: email?.trim() ?? '',
      graduation_year: Number(graduation_year),
      phone: phone?.trim() ?? '',
      role: 'student',
      status: 'pending',
      transcript_url: transcript_url ?? '',
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
    .maybeSingle()
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

export async function getAnnouncementById(id) {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  return { data, error }
}

/**
 * Admin: create announcement
 */
export async function createAnnouncement({ title, content, image_url }) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    return { data: null, error: userError || { message: 'يجب تسجيل الدخول أولاً' } }
  }

  const { data, error } = await supabase
    .from('announcements')
    .insert({
      title: title?.trim() ?? '',
      content: content?.trim() ?? '',
      created_by: user.id,
      image_url: image_url ?? null,
    })
    .select()
    .single()
  return { data, error }
}

/**
 * Admin: update announcement
 */
export async function updateAnnouncement(id, { title, content, image_url }) {
  const { data, error } = await supabase
    .from('announcements')
    .update({
      title: title?.trim() ?? '',
      content: content?.trim() ?? '',
      image_url: image_url ?? null,
    })
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

/**
 * Admin: delete announcement
 */
export async function deleteAnnouncement(id) {
  const { error } = await supabase
    .from('announcements')
    .delete()
    .eq('id', id)
  return { error }
}

/** MIME fallback by extension when file.type is empty (e.g. some mobile browsers). */
const MIME_BY_EXT = {
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  heic: 'image/heic',
}

/**
 * Storage: upload announcement image to public \"announcements\" bucket.
 * Path: announcements/{user.id}/{timestamp}.{ext}
 * Returns public URL on success.
 */
export async function uploadAnnouncementImage(file) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    return { data: null, error: userError || { message: 'يجب تسجيل الدخول أولاً' } }
  }
  const userId = user.id

  const parts = file.name && file.name.trim().split('.')
  const rawExt = parts && parts.length > 1 ? parts.pop().toLowerCase() : ''
  const fileExtension = (rawExt && rawExt.replace(/[^a-z0-9]/g, '')) || 'bin'
  const path = `${userId}/${Date.now()}.${fileExtension}`

  const contentType =
    (file.type && file.type.trim()) || MIME_BY_EXT[fileExtension] || 'application/octet-stream'

  const { error } = await supabase.storage.from(BUCKET_ANNOUNCEMENTS).upload(path, file, {
    upsert: false,
    contentType,
  })
  if (error) return { data: null, error }

  const { data: urlData } = supabase.storage.from(BUCKET_ANNOUNCEMENTS).getPublicUrl(path)
  const publicUrl = urlData?.publicUrl ?? null
  return { data: publicUrl, error: null }
}

/**
 * Storage: upload transcript (PDF or image) to public bucket.
 * Path: Transcript/{user.id}/{user.id}.{file_extension} so RLS can allow by folder (storage.foldername(name))[1] = auth.uid().
 * Uses file's real extension and contentType to avoid 406 when serving.
 * Returns public URL on success.
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

  const parts = file.name && file.name.trim().split('.')
  const rawExt = parts && parts.length > 1 ? parts.pop().toLowerCase() : ''
  const fileExtension = (rawExt && rawExt.replace(/[^a-z0-9]/g, '')) || 'bin'
  const path = `${userId}/${userId}.${fileExtension}`

  const contentType =
    (file.type && file.type.trim()) || MIME_BY_EXT[fileExtension] || 'application/octet-stream'

  const { error } = await supabase.storage.from(BUCKET_TRANSCRIPT).upload(path, file, {
    upsert: true,
    contentType,
  })
  if (error) return { data: null, error }

  const { data: urlData } = supabase.storage.from(BUCKET_TRANSCRIPT).getPublicUrl(path)
  const publicUrl = urlData?.publicUrl ?? null
  return { data: publicUrl, error: null }
}
