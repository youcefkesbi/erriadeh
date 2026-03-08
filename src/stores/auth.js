import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  supabase,
  getSession,
  onAuthStateChange,
  getProfile,
} from '../supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const profile = ref(null)
  const loading = ref(true)

  const isAuthenticated = computed(() => !!user.value)
  const isActive = computed(() => profile.value?.status === 'active')
  const isAdmin = computed(() => profile.value?.role === 'admin')
  const isPending = computed(() => profile.value?.status === 'pending')

  async function fetchUser() {
    const { data: { session } } = await getSession()
    user.value = session?.user ?? null
    if (user.value) {
      const { data: p } = await getProfile(user.value.id)
      profile.value = p ?? null
    } else {
      profile.value = null
    }
    loading.value = false
  }

  function setSession(sessionUser, profileData) {
    user.value = sessionUser
    profile.value = profileData
  }

  function clearSession() {
    user.value = null
    profile.value = null
  }

  function initAuthListener() {
    onAuthStateChange(async (event, session) => {
      if (session?.user) {
        user.value = session.user
        const { data: p } = await getProfile(session.user.id)
        profile.value = p ?? null
      } else {
        clearSession()
      }
    })
  }

  return {
    user,
    profile,
    loading,
    isAuthenticated,
    isActive,
    isAdmin,
    isPending,
    fetchUser,
    setSession,
    clearSession,
    initAuthListener,
  }
})
