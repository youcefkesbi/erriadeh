<template>
  <div class="min-h-screen bg-slate-50">
    <header class="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <img
          :src="logo"
          alt="شعار الريادة"
          class="h-8 w-auto object-contain"
        />
        <h1 class="text-xl font-bold text-slate-800">رابطة خريجي الريادة</h1>
      </div>
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
        <div v-else class="grid gap-4 sm:grid-cols-2">
          <AnnouncementCard
            v-for="a in announcements"
            :key="a.id"
            :announcement="a"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { signOut } from '../supabase'
import { useAnnouncements } from '../composables/useAnnouncements'
import AnnouncementCard from '../components/AnnouncementCard.vue'
import logo from '../assets/logo.png'

const router = useRouter()
const auth = useAuthStore()
const { announcements, loading } = useAnnouncements({ autoLoad: true })

async function handleLogout() {
  await signOut()
  auth.clearSession()
  router.push({ name: 'Home' })
}
</script>
