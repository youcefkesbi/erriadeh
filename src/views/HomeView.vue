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
    </div>
  </div>
</template>

<script setup>
// صفحة الهبوط بسيطة: الاسم + زر إنشاء حساب + زر تسجيل الدخول.
// الإعلانات تظهر فقط داخل لوحة الطالب / لوحة الإدارة للمستخدمين المصادقين.
</script>
