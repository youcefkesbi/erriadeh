import { ref, onMounted } from 'vue'
import { getAnnouncements } from '../supabase'

/**
 * Reusable announcements loader for both guests and authenticated users.
 * Handles loading state and basic error message.
 */
export function useAnnouncements(options = { autoLoad: true }) {
  const announcements = ref([])
  const loading = ref(false)
  const error = ref('')

  function formatDate(iso) {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  async function loadAnnouncements() {
    loading.value = true
    error.value = ''
    try {
      const { data, error: err } = await getAnnouncements()
      if (err) {
        error.value = err.message || 'تعذر تحميل الإعلانات.'
        announcements.value = []
      } else {
        announcements.value = data || []
      }
    } finally {
      loading.value = false
    }
  }

  if (options.autoLoad) {
    onMounted(loadAnnouncements)
  }

  return {
    announcements,
    loading,
    error,
    loadAnnouncements,
    formatDate,
  }
}

