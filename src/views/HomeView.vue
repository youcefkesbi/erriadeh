<template>
  <div class="bg-gradient-to-b from-slate-50 via-sky-50 to-slate-100">
    <!-- 1. Authentication Section -->
    <section class="border-b border-slate-100">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div
          class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-sky-100 px-6 py-8 sm:px-10 sm:py-10 text-center"
        >
          <p class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-medium mb-4">
            <span>🎓</span>
            <span>منصة تجمع خريجي مدرسة الريادة</span>
          </p>
          <p class="text-slate-600 mb-4 text-sm sm:text-base">
            انضم إلى شبكة الخريجين، وابق على اتصال مع زملائك، واطّلع على أحدث الأخبار والفرص.
          </p>
          <div
            v-if="$route.query.message === 'pending'"
            class="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm max-w-md mx-auto"
          >
            طلبك قيد المراجعة. سيتم إبلاغك عند الموافقة على حسابك.
          </div>
          <div class="flex flex-col sm:flex-row justify-center gap-3 mt-2">
            <router-link
              to="/signup"
              class="flex-1 sm:flex-none sm:w-44 py-3 px-4 bg-sky-700 text-white rounded-xl font-semibold hover:bg-sky-800 transition-colors text-center shadow-sm"
            >
              إنشاء حساب
            </router-link>
            <router-link
              to="/login"
              class="flex-1 sm:flex-none sm:w-44 py-3 px-4 border border-sky-600 text-sky-700 rounded-xl font-semibold hover:bg-sky-50 transition-colors text-center bg-white/70"
            >
              تسجيل الدخول
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. About Section -->
    <section class="border-b border-slate-100">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10 text-center sm:text-right">
        <div class="bg-white/80 rounded-3xl shadow-sm border border-slate-200 px-6 py-8 sm:px-8">
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-3">عن الرابطة</h2>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto sm:mx-0">
            رابطة خريجي مدرسة الريادة هي مبادرة تهدف إلى جمع خريجي مدرسة الريادة وتعزيز التواصل بينهم،
            ودعم الطلاب الحاليين، والمساهمة في المبادرات التعليمية والاجتماعية.
          </p>
        </div>
      </div>
    </section>

    <!-- 4. Services Section -->
    <section class="border-b border-slate-100">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center sm:text-right">
          خدمات الرابطة
        </h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <div
            class="bg-white/90 rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <h3 class="font-semibold text-slate-800 mb-2">🎓 شبكة الخريجين</h3>
            <p class="text-sm text-slate-600">
              التعارف بين الخريجين وتبادل الفرص والخبرات، لبناء شبكة قوية تدعم الجميع.
            </p>
          </div>
          <div
            class="bg-white/90 rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <h3 class="font-semibold text-slate-800 mb-2">💼 فرص العمل والتدريب</h3>
            <p class="text-sm text-slate-600">
              نشر فرص العمل ومشاركة فرص التدريب المقدمة من الخريجين والشركات الشريكة.
            </p>
          </div>
          <div
            class="bg-white/90 rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <h3 class="font-semibold text-slate-800 mb-2">📚 الدعم الأكاديمي</h3>
            <p class="text-sm text-slate-600">
              نصائح دراسية ومحاضرات ولقاءات مع خريجين متميزين لدعم الطلبة الحاليين.
            </p>
          </div>
          <div
            class="bg-white/90 rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <h3 class="font-semibold text-slate-800 mb-2">🤝 المبادرات التطوعية</h3>
            <p class="text-sm text-slate-600">
              تنظيم حملات خيرية ونشاطات اجتماعية تعزز روح المسؤولية المجتمعية.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Announcements Section -->
    <section>
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl sm:text-2xl font-bold text-slate-800">آخر الإعلانات</h2>
          <span class="text-xs text-slate-400" v-if="announcements.length">
            إجمالي: {{ announcements.length }}
          </span>
        </div>
        <div
          v-if="loading"
          class="text-slate-500 text-sm bg-white/70 border border-slate-200 rounded-2xl px-4 py-6 text-center"
        >
          جاري تحميل الإعلانات...
        </div>
        <div v-else-if="!visibleAnnouncements.length" class="text-slate-500 text-sm">
          لا توجد إعلانات حالياً.
        </div>
        <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnnouncementCard
            v-for="a in visibleAnnouncements"
            :key="a.id"
            :announcement="a"
            :compact="true"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAnnouncements } from '../composables/useAnnouncements'
import AnnouncementCard from '../components/AnnouncementCard.vue'

const { announcements, loading } = useAnnouncements({ autoLoad: true })

// لا نعرض سوى أول 6 إعلانات لتبقى الصفحة نظيفة.
const visibleAnnouncements = computed(() => announcements.value.slice(0, 6))
</script>
