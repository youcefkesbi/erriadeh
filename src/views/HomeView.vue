<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6">
    <div class="w-full max-w-2xl">
      <div class="text-center mb-8">
        <div class="flex flex-col items-center gap-4 mb-4">
          <img
            :src="logo"
            alt="شعار الريادة"
            class="h-24 w-auto object-contain"
          />
          <h1 class="text-3xl font-bold text-slate-800">رابطة خريجي مدرسة الريادة</h1>
        </div>
        <p class="text-slate-600 mb-4">منصة تواصل خريجي المدرسة</p>
        <div
          v-if="$route.query.message === 'pending'"
          class="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm"
        >
          طلبك قيد المراجعة. سيتم إبلاغك عند الموافقة على حسابك.
        </div>
        <div class="flex flex-col sm:flex-row justify-center gap-3 mt-6">
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

      <!-- Landing announcements for guests and users (top 3) -->
      <section class="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-lg font-semibold text-slate-800">آخر الإعلانات</h2>
          <span class="text-xs text-slate-400" v-if="announcements.length">إجمالي: {{ announcements.length }}</span>
        </div>
        <div v-if="loading" class="text-slate-500 text-sm">جاري تحميل الإعلانات...</div>
        <div v-else-if="!visibleAnnouncements.length" class="text-slate-500 text-sm">
          لا توجد إعلانات حالياً.
        </div>
        <ul v-else class="space-y-3">
          <li
            v-for="a in visibleAnnouncements"
            :key="a.id"
            class="border-b border-slate-100 pb-3 last:border-0 last:pb-0"
          >
            <h3 class="font-medium text-slate-800 text-sm">{{ a.title }}</h3>
            <p class="text-xs text-slate-500 mt-0.5">{{ formatDate(a.created_at) }}</p>
            <div v-if="a.image_url" class="mt-2">
              <img
                :src="a.image_url"
                alt="صورة الإعلان"
                class="w-full max-h-40 object-cover rounded-md border border-slate-100"
              />
            </div>
            <p class="text-sm text-slate-600 mt-1 whitespace-pre-wrap line-clamp-3">
              {{ a.content }}
            </p>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import logo from '../assets/logo.png'
import { useAnnouncements } from '../composables/useAnnouncements'

const { announcements, loading, formatDate } = useAnnouncements({ autoLoad: true })

// لا نعرض سوى أول 3 إعلانات لتبقى الصفحة نظيفة.
const visibleAnnouncements = computed(() => announcements.value.slice(0, 3))
</script>
