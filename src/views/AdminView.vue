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

    <main class="max-w-3xl mx-auto p-6">
      <section class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 class="text-lg font-semibold text-slate-800 mb-4">الطلاب المعلّقون (بانتظار الموافقة)</h2>
        <div v-if="loading" class="text-slate-500">جاري التحميل...</div>
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
                :disabled="actionId === p.id"
                class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
              >
                {{ actionId === p.id ? 'جاري...' : 'موافقة' }}
              </button>
              <button
                @click="reject(p.id)"
                :disabled="actionId === p.id"
                class="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50"
              >
                رفض
              </button>
            </div>
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
import { getPendingProfiles, updateProfileStatus } from '../supabase'
import { signOut } from '../supabase'

const router = useRouter()
const auth = useAuthStore()
const pending = ref([])
const loading = ref(true)
const actionId = ref(null)

async function loadPending() {
  loading.value = true
  const { data } = await getPendingProfiles()
  pending.value = data || []
  loading.value = false
}

async function approve(userId) {
  actionId.value = userId
  const { error } = await updateProfileStatus(userId, 'active')
  actionId.value = null
  if (!error) pending.value = pending.value.filter((p) => p.id !== userId)
}

async function reject(userId) {
  actionId.value = userId
  const { error } = await updateProfileStatus(userId, 'rejected')
  actionId.value = null
  if (!error) pending.value = pending.value.filter((p) => p.id !== userId)
}

async function handleLogout() {
  await signOut()
  auth.clearSession()
  router.push({ name: 'Home' })
}

onMounted(() => {
  loadPending()
})
</script>
