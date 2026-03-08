<template>
  <div class="min-h-screen bg-slate-50">
    <header class="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <h1 class="text-xl font-bold text-slate-800">الريادة</h1>
      <div class="flex items-center gap-4">
        <span class="text-slate-600">{{ auth.profile?.full_name }}</span>
        <button
          @click="handleLogout"
          class="text-sm text-slate-600 hover:text-slate-800"
        >
          تسجيل الخروج
        </button>
      </div>
    </header>

    <main class="max-w-2xl mx-auto p-6">
      <section class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h2 class="text-lg font-semibold text-slate-800 mb-4">ملفي الشخصي</h2>
        <dl class="space-y-2">
          <div>
            <dt class="text-sm text-slate-500">الاسم</dt>
            <dd class="font-medium text-slate-800">{{ auth.profile?.full_name }}</dd>
          </div>
          <div>
            <dt class="text-sm text-slate-500">سنة التخرج</dt>
            <dd class="font-medium text-slate-800">{{ auth.profile?.graduation_year }}</dd>
          </div>
        </dl>
      </section>

      <section class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 class="text-lg font-semibold text-slate-800 mb-4">الإعلانات</h2>
        <div v-if="loading" class="text-slate-500">جاري التحميل...</div>
        <div v-else-if="!announcements.length" class="text-slate-500">لا توجد إعلانات حالياً.</div>
        <ul v-else class="space-y-4">
          <li
            v-for="a in announcements"
            :key="a.id"
            class="border-b border-slate-100 pb-4 last:border-0 last:pb-0"
          >
            <h3 class="font-medium text-slate-800">{{ a.title }}</h3>
            <p class="text-slate-600 text-sm mt-1 whitespace-pre-wrap">{{ a.content }}</p>
            <p class="text-xs text-slate-400 mt-2">{{ formatDate(a.created_at) }}</p>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { getAnnouncements } from '../supabase'
import { signOut } from '../supabase'

const router = useRouter()
const auth = useAuthStore()
const announcements = ref([])
const loading = ref(true)

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
  const { data } = await getAnnouncements()
  announcements.value = data || []
  loading.value = false
}

async function handleLogout() {
  await signOut()
  auth.clearSession()
  router.push({ name: 'Home' })
}

onMounted(() => {
  loadAnnouncements()
})
</script>
