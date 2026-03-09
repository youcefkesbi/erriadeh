<template>
  <div class="min-h-screen bg-slate-50">
    <header class="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <h1 class="text-xl font-bold text-slate-800">لوحة الإدارة - الريادة</h1>
      <div class="flex items-center gap-4">
        <span class="text-slate-600">{{ auth.profile?.full_name }} (مدير)</span>
        <button
          @click="handleLogout"
          class="text-sm text-slate-600 hover:text-slate-800"
        >
          تسجيل الخروج
        </button>
      </div>
    </header>

    <main class="max-w-4xl mx-auto p-6 space-y-8">
      <!-- Pending students -->
      <section class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 class="text-lg font-semibold text-slate-800 mb-4">الطلاب المعلّقون (بانتظار الموافقة)</h2>
        <div v-if="loadingPending" class="text-slate-500">جاري التحميل...</div>
        <div v-else-if="!pending.length" class="text-slate-500">لا يوجد طلاب معلّقون.</div>
        <ul v-else class="space-y-4">
          <li
            v-for="p in pending"
            :key="p.id"
            class="border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <p class="font-medium text-slate-800">{{ p.full_name }}</p>
              <p class="text-sm text-slate-600">{{ p.email }}</p>
              <p class="text-sm text-slate-500">سنة التخرج: {{ p.graduation_year }} | هاتف: {{ p.phone }}</p>
              <a
                v-if="p.transcript_url"
                :href="p.transcript_url"
                target="_blank"
                rel="noopener"
                class="text-sm text-slate-600 hover:underline mt-1 inline-block"
              >
                عرض كشف الدرجات
              </a>
            </div>
            <div class="flex gap-2">
              <button
                @click="approve(p.id)"
                :disabled="pendingActionId === p.id"
                class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
              >
                {{ pendingActionId === p.id ? 'جاري...' : 'موافقة' }}
              </button>
              <button
                @click="reject(p.id)"
                :disabled="pendingActionId === p.id"
                class="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50"
              >
                رفض
              </button>
            </div>
          </li>
        </ul>
      </section>

      <!-- Announcements management -->
      <section class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-slate-800">الإعلانات</h2>
        </div>

        <div class="grid gap-6 md:grid-cols-[1.3fr_minmax(0,1.7fr)]">
          <!-- Form -->
          <div>
            <h3 class="text-sm font-semibold text-slate-700 mb-3">
              {{ editingId ? 'تعديل إعلان' : 'إضافة إعلان جديد' }}
            </h3>
            <form @submit.prevent="saveAnnouncement" class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">عنوان الإعلان</label>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
                  placeholder="عنوان مختصر وواضح"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">نص الإعلان</label>
                <textarea
                  v-model="form.content"
                  rows="4"
                  required
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
                  placeholder="تفاصيل الإعلان..."
                ></textarea>
              </div>
              <p v-if="announcementError" class="text-sm text-red-600">{{ announcementError }}</p>
              <div class="flex items-center gap-2">
                <button
                  type="submit"
                  :disabled="savingAnnouncement"
                  class="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 disabled:opacity-50"
                >
                  {{ savingAnnouncement ? 'جاري الحفظ...' : (editingId ? 'تحديث الإعلان' : 'إضافة الإعلان') }}
                </button>
                <button
                  v-if="editingId"
                  type="button"
                  @click="resetForm"
                  class="px-3 py-2 text-sm text-slate-600 hover:text-slate-800"
                >
                  إلغاء التعديل
                </button>
              </div>
            </form>
          </div>

          <!-- List -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-semibold text-slate-700">قائمة الإعلانات</h3>
              <button
                type="button"
                @click="reloadAnnouncements"
                class="text-xs text-slate-500 hover:text-slate-700"
              >
                تحديث
              </button>
            </div>
            <div v-if="loadingAnnouncements" class="text-slate-500 text-sm">جاري تحميل الإعلانات...</div>
            <div v-else-if="!announcements.length" class="text-slate-500 text-sm">لا توجد إعلانات حالياً.</div>
            <ul v-else class="space-y-3 max-h-80 overflow-y-auto pr-1">
              <li
                v-for="a in announcements"
                :key="a.id"
                class="border border-slate-200 rounded-lg p-3 flex flex-col gap-2"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h4 class="font-medium text-slate-800 text-sm">{{ a.title }}</h4>
                    <p class="text-xs text-slate-500 mt-0.5">{{ formatDate(a.created_at) }}</p>
                  </div>
                  <div class="flex gap-2">
                    <button
                      type="button"
                      @click="startEdit(a)"
                      class="px-2 py-1 text-xs border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
                    >
                      تعديل
                    </button>
                    <button
                      type="button"
                      @click="removeAnnouncement(a.id)"
                      :disabled="deletingId === a.id"
                      class="px-2 py-1 text-xs border border-red-300 rounded-md text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      {{ deletingId === a.id ? 'جاري الحذف...' : 'حذف' }}
                    </button>
                  </div>
                </div>
                <p class="text-sm text-slate-600 whitespace-pre-wrap">{{ a.content }}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import {
  getPendingProfiles,
  updateProfileStatus,
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  signOut,
} from '../supabase'

const router = useRouter()
const auth = useAuthStore()

// Pending students
const pending = ref([])
const loadingPending = ref(true)
const pendingActionId = ref(null)

async function loadPending() {
  loadingPending.value = true
  const { data } = await getPendingProfiles()
  pending.value = data || []
  loadingPending.value = false
}

async function approve(userId) {
  pendingActionId.value = userId
  const { error } = await updateProfileStatus(userId, 'active')
  pendingActionId.value = null
  if (!error) pending.value = pending.value.filter((p) => p.id !== userId)
}

async function reject(userId) {
  pendingActionId.value = userId
  const { error } = await updateProfileStatus(userId, 'rejected')
  pendingActionId.value = null
  if (!error) pending.value = pending.value.filter((p) => p.id !== userId)
}

// Announcements
const announcements = ref([])
const loadingAnnouncements = ref(true)
const savingAnnouncement = ref(false)
const deletingId = ref(null)
const editingId = ref(null)
const announcementError = ref('')

const form = ref({
  title: '',
  content: '',
})

function resetForm() {
  form.value = {
    title: '',
    content: '',
  }
  editingId.value = null
  announcementError.value = ''
}

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

async function loadAnnouncements() {
  loadingAnnouncements.value = true
  const { data } = await getAnnouncements()
  announcements.value = data || []
  loadingAnnouncements.value = false
}

async function reloadAnnouncements() {
  await loadAnnouncements()
}

function startEdit(announcement) {
  editingId.value = announcement.id
  form.value = {
    title: announcement.title,
    content: announcement.content,
  }
  announcementError.value = ''
}

async function saveAnnouncement() {
  if (!form.value.title.trim() || !form.value.content.trim()) return
  savingAnnouncement.value = true
  announcementError.value = ''
  try {
    if (editingId.value) {
      const { data, error } = await updateAnnouncement(editingId.value, {
        title: form.value.title,
        content: form.value.content,
      })
      if (error) {
        announcementError.value = error.message || 'تعذر تحديث الإعلان.'
        return
      }
      const idx = announcements.value.findIndex((a) => a.id === editingId.value)
      if (idx !== -1 && data) announcements.value[idx] = data
      resetForm()
    } else {
      const { data, error } = await createAnnouncement({
        title: form.value.title,
        content: form.value.content,
      })
      if (error) {
        announcementError.value = error.message || 'تعذر إنشاء الإعلان.'
        return
      }
      if (data) announcements.value.unshift(data)
      resetForm()
    }
  } finally {
    savingAnnouncement.value = false
  }
}

async function removeAnnouncement(id) {
  if (!confirm('هل أنت متأكد من حذف هذا الإعلان؟')) return
  deletingId.value = id
  const { error } = await deleteAnnouncement(id)
  deletingId.value = null
  if (!error) {
    announcements.value = announcements.value.filter((a) => a.id !== id)
  } else {
    announcementError.value = error.message || 'تعذر حذف الإعلان.'
  }
}

async function handleLogout() {
  await signOut()
  auth.clearSession()
  router.push({ name: 'Home' })
}

onMounted(() => {
  loadPending()
  loadAnnouncements()
})
</script>
