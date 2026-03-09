<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center p-6">
    <div class="w-full max-w-4xl">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-slate-800 mb-2">رابطة خريجي مدرسة الريادة</h1>
        <p class="text-slate-600 mb-4">منصة تواصل خريجي المدرسة</p>
        <div
          v-if="$route.query.message === 'pending'"
          class="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm"
        >
          طلبك قيد المراجعة. سيتم إبلاغك عند الموافقة على حسابك.
        </div>
        <div class="flex flex-col sm:flex-row justify-center gap-3 mt-4">
          <router-link
            to="/login"
            class="flex-1 sm:flex-none sm:w-40 py-3 px-4 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition text-center"
          >
            تسجيل الدخول
          </router-link>
          <router-link
            to="/signup"
            class="flex-1 sm:flex-none sm:w-40 py-3 px-4 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition text-center"
          >
            إنشاء حساب
          </router-link>
        </div>
      </div>

      <!-- Public announcements -->
      <section class="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <h2 class="text-lg font-semibold text-slate-800 mb-3">إعلانات الرابطة</h2>
        <div v-if="loading" class="text-slate-500 text-sm">جاري تحميل الإعلانات...</div>
        <div v-else-if="!announcements.length" class="text-slate-500 text-sm">
          لا توجد إعلانات حالياً. تابعنا لاحقاً.
        </div>
        <ul v-else class="space-y-3">
          <li
            v-for="a in announcements"
            :key="a.id"
            class="border-b border-slate-100 pb-3 last:border-0 last:pb-0"
          >
            <h3 class="font-medium text-slate-800 text-sm">{{ a.title }}</h3>
            <p class="text-xs text-slate-500 mt-0.5">{{ formatDate(a.created_at) }}</p>
            <p class="text-sm text-slate-600 mt-1 whitespace-pre-wrap">
              {{ a.content }}
            </p>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAnnouncements } from '../supabase'

const announcements = ref([])
const loading = ref(true)

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

async function loadAnnouncements() {
  loading.value = true
  const { data } = await getAnnouncements()
  announcements.value = data || []
  loading.value = false
}

onMounted(() => {
  loadAnnouncements()
})
</script>
