<template>
  <div class="bg-slate-50">
    <!-- 1. Authentication Section -->
    <section class="border-b">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10 text-center">
        <p class="text-slate-600 mb-4">مرحباً بك في رابطة خريجي مدرسة الريادة</p>
        <div
          v-if="$route.query.message === 'pending'"
          class="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm max-w-md mx-auto"
        >
          طلبك قيد المراجعة. سيتم إبلاغك عند الموافقة على حسابك.
        </div>
        <div class="flex flex-col sm:flex-row justify-center gap-3 mt-2">
          <router-link
            to="/signup"
            class="flex-1 sm:flex-none sm:w-44 py-3 px-4 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition text-center"
          >
            إنشاء حساب
          </router-link>
          <router-link
            to="/login"
            class="flex-1 sm:flex-none sm:w-44 py-3 px-4 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition text-center"
          >
            تسجيل الدخول
          </router-link>
        </div>
      </div>
    </section>

    <!-- 3. About Section -->
    <section class="border-b">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10 text-center sm:text-right">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-800 mb-3">عن الرابطة</h2>
        <p class="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto sm:mx-0">
          رابطة خريجي مدرسة الريادة هي مبادرة تهدف إلى جمع خريجي مدرسة الريادة وتعزيز التواصل بينهم،
          ودعم الطلاب الحاليين، والمساهمة في المبادرات التعليمية والاجتماعية.
        </p>
      </div>
    </section>

    <!-- 4. Services Section -->
    <section class="border-b">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center sm:text-right">
          خدمات الرابطة
        </h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="bg-white rounded-2xl border border-slate-200 p-4">
            <h3 class="font-semibold text-slate-800 mb-2">🎓 شبكة الخريجين</h3>
            <p class="text-sm text-slate-600">
              التعارف بين الخريجين وتبادل الفرص والخبرات، لبناء شبكة قوية تدعم الجميع.
            </p>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200 p-4">
            <h3 class="font-semibold text-slate-800 mb-2">💼 فرص العمل والتدريب</h3>
            <p class="text-sm text-slate-600">
              نشر فرص العمل ومشاركة فرص التدريب المقدمة من الخريجين والشركات الشريكة.
            </p>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200 p-4">
            <h3 class="font-semibold text-slate-800 mb-2">📚 الدعم الأكاديمي</h3>
            <p class="text-sm text-slate-600">
              نصائح دراسية ومحاضرات ولقاءات مع خريجين متميزين لدعم الطلبة الحاليين.
            </p>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200 p-4">
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
        <div v-if="loading" class="text-slate-500 text-sm">جاري تحميل الإعلانات...</div>
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
