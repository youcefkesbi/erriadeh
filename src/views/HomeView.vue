<template>
  <div class="relative overflow-hidden bg-slate-950 text-slate-100">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/25 blur-3xl"></div>
      <div class="absolute top-32 -right-20 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl"></div>
      <div class="absolute bottom-0 -left-16 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"></div>
    </div>

    <main class="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
      <section class="grid gap-5 lg:grid-cols-12">
        <div class="lg:col-span-8 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-indigo-950/85 to-sky-900/85 p-6 shadow-2xl sm:p-8">
          <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p class="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-300/10 px-3 py-1 text-xs font-semibold text-sky-100">
              <span>🏫</span>
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
            اكتشف آخر الإعلانات، تابع الأنشطة، وابن شبكة علاقات قوية مع خريجي مدرسة الريادة. صُممت المنصة لتكون مركزاً واحداً للفرص، الدعم، والتعاون المجتمعي.
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

        <div class="lg:col-span-4 space-y-5">
          <article class="rounded-3xl border border-white/10 bg-white/95 p-5 text-slate-800 shadow-xl">
            <div class="flex items-center justify-between">
              <p class="text-sm font-semibold text-slate-700">هوية الرابطة</p>
              <span class="rounded-full bg-sky-100 px-2 py-1 text-xs text-sky-700">official</span>
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
            <p class="text-xs font-semibold text-emerald-700">ميزة هذا الأسبوع</p>
            <h3 class="mt-2 text-lg font-bold text-slate-800">مجموعات الخريجين حسب سنة التخرج</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600">
              اربط دفعتك مع الدفعات الأخرى بسهولة لتوسيع العلاقات المهنية ومشاركة الفرص.
            </p>
          </article>
        </div>
      </section>

      <section class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="feature in platformFeatures"
          :key="feature.title"
          class="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/30 transition-all duration-200 hover:-translate-y-1 hover:bg-white/10"
        >
          <div class="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-fuchsia-400 text-lg">
            {{ feature.icon }}
          </div>
          <h3 class="text-base font-semibold text-white">{{ feature.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-300">{{ feature.description }}</p>
        </article>
      </section>

      <section class="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
        <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 class="text-xl font-bold text-white sm:text-2xl">مسارات المشاركة</h2>
          <span class="rounded-full bg-indigo-500/25 px-3 py-1 text-xs font-medium text-indigo-100">
            تصميم كثيف بالمعلومات
          </span>
        </div>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="track in serviceTracks"
            :key="track.title"
            class="rounded-2xl border border-white/10 bg-slate-900/65 p-5 transition-all duration-200 hover:border-sky-300/30 hover:shadow-lg hover:shadow-sky-900/20"
          >
            <div class="flex items-start justify-between gap-3">
              <h3 class="text-base font-semibold text-white">{{ track.title }}</h3>
              <span class="text-xl">{{ track.icon }}</span>
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
    </main>
  </div>
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
  { label: 'خريجون نشطون', value: '+1,250' },
  { label: 'فرص مهنية', value: '+180' },
  { label: 'مبادرات مجتمعية', value: '+45' },
]

const platformFeatures = [
  {
    icon: '⚡',
    title: 'تجربة استخدام سريعة',
    description: 'وصول مباشر للخدمات الأساسية مع واجهة حديثة وواضحة على كل الأجهزة.',
  },
  {
    icon: '🧭',
    title: 'تنقل ذكي',
    description: 'أقسام مصممة لتسهيل العثور على الإعلانات والخدمات والبرامج الأكثر أهمية.',
  },
  {
    icon: '🛡️',
    title: 'مجتمع موثوق',
    description: 'آلية مراجعة للحسابات للحفاظ على بيئة آمنة تعزز التفاعل البنّاء.',
  },
  {
    icon: '📣',
    title: 'تحديثات مستمرة',
    description: 'تنبيهات وإعلانات جديدة تساعدك على متابعة كل ما يخص الرابطة بشكل يومي.',
  },
]

const serviceTracks = [
  {
    icon: '🎓',
    title: 'شبكة الخريجين',
    description: 'التعارف بين الخريجين وتبادل الخبرات والدعم المهني بين مختلف الدفعات.',
  },
  {
    icon: '💼',
    title: 'الفرص المهنية',
    description: 'الإعلان عن فرص العمل والتدريب بالتعاون مع الخريجين والشركاء المهنيين.',
  },
  {
    icon: '📚',
    title: 'التوجيه الأكاديمي',
    description: 'لقاءات معرفية وخبرات عملية تساعد الطلاب والخريجين الجدد على التطور.',
  },
  {
    icon: '🤝',
    title: 'المبادرات التطوعية',
    description: 'تنظيم حملات وأنشطة مجتمعية تعكس روح الانتماء والمسؤولية.',
  },
  {
    icon: '🌐',
    title: 'شراكات استراتيجية',
    description: 'فتح قنوات تعاون مع مؤسسات تعليمية ومهنية لدعم مسار الخريجين.',
  },
  {
    icon: '🏆',
    title: 'قصص نجاح',
    description: 'إبراز إنجازات خريجي المدرسة لتكون مصدر إلهام للأجيال القادمة.',
  },
]
</script>
