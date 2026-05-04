<template>
  <section class="grid gap-5 lg:grid-cols-12">
        <div class="lg:col-span-8 lg:order-2 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-indigo-950/85 to-sky-900/85 p-6 shadow-2xl sm:p-8">
          <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p class="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-300/10 px-3 py-1 text-xs font-semibold text-sky-100">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 10.5 12 6l9 4.5-9 4.5-9-4.5Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12.5v4.25a1 1 0 0 0 .55.9l5 2.5a1 1 0 0 0 .9 0l5-2.5a1 1 0 0 0 .55-.9V12.5" />
              </svg>
              <span>منصة خريجي مدرسة الريادة</span>
            </p>
            <span class="rounded-full border border-fuchsia-300/40 bg-fuchsia-300/15 px-3 py-1 text-xs font-medium text-fuchsia-100">
              تواصل، فرص، مبادرات
            </span>
          </div>

          <h1 class="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
            مجتمع رقمي متكامل يجمع الخريجين ويدعم مسيرتهم المهنية
          </h1>
          <p class="mt-4 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
            اكتشف آخر الإعلانات، تابع الأنشطة، وتواصل مع خريجي مدرسة الريادة. صُممت المنصة لتكون مركزاً للفرص، الدعم، والتعاون الأكاديمي.
          </p>

          <div
            v-if="isPendingMessage"
            class="mt-5 rounded-2xl border border-amber-300/35 bg-amber-100/15 p-4 text-sm text-amber-100"
          >
            طلبك قيد المراجعة حالياً. سيتم إشعارك فور الموافقة على الحساب.
          </div>

          <div class="mt-6 flex flex-col gap-3 sm:flex-row">
            <router-link
              to="/signup"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/25 transition-transform duration-200 hover:-translate-y-0.5 hover:from-sky-400 hover:to-indigo-400"
            >
              <span>ابدأ الآن</span>
              <span>→</span>
            </router-link>
            <router-link
              to="/login"
              class="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-100 transition-colors duration-200 hover:bg-white/20"
            >
              تسجيل الدخول
            </router-link>
          </div>

          <div class="mt-7 grid gap-3 sm:grid-cols-3">
            <article
              v-for="metric in keyMetrics"
              :key="metric.label"
              class="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm"
            >
              <p class="text-xs text-slate-300">{{ metric.label }}</p>
              <p class="mt-1 text-lg font-bold text-white">{{ metric.value }}</p>
            </article>
          </div>
        </div>

        <div class="lg:col-span-4 lg:order-1 space-y-5">
          <article class="rounded-3xl border border-white/10 bg-white/95 p-5 text-slate-800 shadow-xl">
            <div class="flex items-center justify-between">
              <p class="text-sm font-semibold text-slate-700">هوية الرابطة</p>
            </div>
            <img
              :src="logoImage"
              alt="شعار مدرسة الريادة"
              class="mx-auto mt-4 h-auto w-40 object-contain sm:w-44"
            />
            <p class="mt-4 text-sm leading-relaxed text-slate-600">
              منصتنا تجمع الخريجين في واجهة واحدة حديثة للوصول السريع إلى الإعلانات، المبادرات، والخدمات.
            </p>
          </article>

          <article class="rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-sky-50 p-5 shadow-lg">
            <p class="text-xs font-semibold text-emerald-700">الحدث القادم</p>
            <h3 class="mt-2 text-lg font-bold text-slate-800">اللقاء الأول لرابطة خريجي مدرسة الريادة</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600">
              مبرمج أن يكون في صيف 2026.
            </p>
          </article>
        </div>
  </section>

  <section class="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
        <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 class="text-xl font-bold text-white sm:text-2xl">مسارات المشاركة</h2>
        </div>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="track in serviceTracks"
            :key="track.title"
            class="rounded-2xl border border-white/10 bg-slate-900/65 p-5 transition-all duration-200 hover:border-sky-300/30 hover:shadow-lg hover:shadow-sky-900/20"
          >
            <div class="flex items-start justify-between gap-3">
              <h3 class="text-base font-semibold text-white">{{ track.title }}</h3>
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-sky-300/30 bg-sky-400/10 text-sky-100">
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  aria-hidden="true"
                >
                  <path :d="track.iconPath" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
            <p class="mt-3 text-sm leading-relaxed text-slate-300">{{ track.description }}</p>
          </article>
        </div>
  </section>

  <section class="mt-10">
        <div class="mb-5 flex items-center justify-between">
          <h2 class="text-xl font-bold text-white sm:text-2xl">آخر الإعلانات</h2>
          <span class="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-slate-200" v-if="announcements.length">
            إجمالي: {{ announcements.length }}
          </span>
        </div>

        <div
          v-if="loading"
          class="rounded-2xl border border-white/15 bg-white/10 px-4 py-8 text-center text-sm text-slate-200"
        >
          جاري تحميل الإعلانات...
        </div>
        <div
          v-else-if="!visibleAnnouncements.length"
          class="rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-8 text-center text-sm text-slate-300"
        >
          لا توجد إعلانات حالياً.
        </div>
        <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnnouncementCard
            v-for="announcement in visibleAnnouncements"
            :key="announcement.id"
            :announcement="announcement"
            :compact="true"
          />
        </div>
  </section>

  <section class="mt-10 rounded-3xl border border-fuchsia-300/20 bg-gradient-to-r from-sky-600/20 via-indigo-600/20 to-fuchsia-600/20 p-6 text-center shadow-xl sm:p-8">
        <h2 class="text-xl font-extrabold text-white sm:text-2xl">كن جزءاً من شبكة الخريجين المؤثرة</h2>
        <p class="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
          من خلال حساب واحد، يمكنك الوصول إلى فرص عمل، مبادرات تطوعية، ومحتوى معرفي يطوّر مسارك المهني.
        </p>
        <div class="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <router-link
            to="/signup"
            class="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-transform duration-200 hover:-translate-y-0.5"
          >
            إنشاء حساب جديد
          </router-link>
          <router-link
            to="/login"
            class="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/20"
          >
            دخول الأعضاء
          </router-link>
        </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAnnouncements } from '../composables/useAnnouncements'
import AnnouncementCard from '../components/AnnouncementCard.vue'

const route = useRoute()
const logoImage = new URL('../assets/logo.png', import.meta.url).href
const { announcements, loading } = useAnnouncements({ autoLoad: true })

const isPendingMessage = computed(() => route.query.message === 'pending')

const visibleAnnouncements = computed(() => announcements.value.slice(0, 6))

const keyMetrics = [
  { label: 'خريجون نشطون', value: '+145' },
  { label: 'محاضرات ومبادرات', value: '+10' },
]

const serviceTracks = [
  {
    iconPath: 'M3 10.5 12 6l9 4.5-9 4.5-9-4.5Z M6 12.5v4.25a1 1 0 0 0 .55.9l5 2.5a1 1 0 0 0 .9 0l5-2.5a1 1 0 0 0 .55-.9V12.5',
    title: 'شبكة الخريجين',
    description: 'التعارف بين الخريجين وتبادل الخبرات والدعم المهني بين مختلف الدفعات.',
  },
  {
    iconPath: 'M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7 M4 9h16v8.5A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5V9Z M4 12h16',
    title: 'الفرص المهنية',
    description: 'الإعلان عن فرص العمل والتدريب بالتعاون مع الخريجين والشركاء المهنيين.',
  },
  {
    iconPath: 'M5.5 5h5A2.5 2.5 0 0 1 13 7.5V19a2.5 2.5 0 0 0-2.5-2.5h-5V5Z M18.5 5h-5A2.5 2.5 0 0 0 11 7.5V19a2.5 2.5 0 0 1 2.5-2.5h5V5Z',
    title: 'التوجيه الأكاديمي',
    description: 'لقاءات معرفية وخبرات عملية تساعد الطلاب والخريجين الجدد على التطور.',
  },
  {
    iconPath: 'm8 12.5 2.1-2.1a2 2 0 0 1 2.8 0l.6.6a2 2 0 0 0 2.8 0l1.7-1.7 M6 14.5l-1.2 1.2a1.5 1.5 0 1 0 2.1 2.1l1-1 M9 17l-.8.8a1.5 1.5 0 0 0 2.1 2.1l.9-.9 M12 18.8a1.5 1.5 0 0 0 2.1 2.1l.8-.8 M15 18.1a1.5 1.5 0 1 0 2.1 2.1l1.1-1.1 M3.5 8.5h4.2l2-2a2 2 0 0 1 2.8 0l2.5 2.5h5.5',
    title: 'المبادرات التطوعية',
    description: 'تنظيم حملات وأنشطة مجتمعية تعكس روح الانتماء والمسؤولية.',
  },
  {
    iconPath: 'M3 12h18 M12 3a15.3 15.3 0 0 1 0 18 M12 3a15.3 15.3 0 0 0 0 18 M4.9 7.5h14.2 M4.9 16.5h14.2',
    title: 'شراكات استراتيجية',
    description: 'فتح قنوات تعاون مع مؤسسات تعليمية ومهنية لدعم مسار الخريجين.',
  },
  {
    iconPath: 'M8 5h8v2.5A4 4 0 0 1 12 11 4 4 0 0 1 8 7.5V5Z M16 6h2.5A2.5 2.5 0 0 1 16 8.5 M8 6H5.5A2.5 2.5 0 0 0 8 8.5 M10 13h4 M10 19h4 M11 13v6 M13 13v6',
    title: 'قصص نجاح',
    description: 'إبراز إنجازات خريجي المدرسة لتكون مصدر إلهام للأجيال القادمة.',
  },
]
</script>
