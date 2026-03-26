<template>
  <div class="bg-slate-50 min-h-[70vh]">
    <section class="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <router-link
        to="/"
        class="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6"
      >
        <span>←</span>
        <span>العودة إلى الرئيسية</span>
      </router-link>

      <div v-if="loading" class="bg-white border border-slate-200 rounded-2xl p-8 text-slate-500 text-center">
        جاري تحميل الإعلان...
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700 text-sm">
        {{ error }}
      </div>

      <article v-else-if="announcement" class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div v-if="announcement.image_url" class="border-b border-slate-100 bg-slate-50">
          <img
            :src="announcement.image_url"
            alt="صورة الإعلان"
            class="w-full max-h-[70vh] object-contain"
          />
        </div>
        <div class="p-6 sm:p-8">
          <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            {{ announcement.title }}
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 mb-6">
            {{ formatDate(announcement.created_at) }}
          </p>
          <p class="text-slate-700 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
            {{ announcement.content }}
          </p>
        </div>
      </article>

      <div v-else class="bg-white border border-slate-200 rounded-2xl p-8 text-slate-500 text-center">
        الإعلان غير موجود.
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getAnnouncementById } from '../supabase'

const route = useRoute()
const announcement = ref(null)
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

async function loadAnnouncement() {
  loading.value = true
  error.value = ''
  try {
    const { data, error: err } = await getAnnouncementById(route.params.id)
    if (err) {
      error.value = err.message || 'تعذر تحميل الإعلان.'
      announcement.value = null
      return
    }
    if (!data) {
      error.value = 'الإعلان غير موجود أو تم حذفه.'
      announcement.value = null
      return
    }
    announcement.value = data
  } finally {
    loading.value = false
  }
}

onMounted(loadAnnouncement)
</script>

