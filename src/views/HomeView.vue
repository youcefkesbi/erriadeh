<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
    <div class="max-w-md w-full text-center">
      <h1 class="text-3xl font-bold text-slate-800 mb-2">رابطة خريجي مدرسة الريادة</h1>
      <p class="text-slate-600 mb-8">منصة تواصل خريجي المدرسة</p>

      <div v-if="$route.query.message === 'pending'" class="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
        طلبك قيد المراجعة. سيتم إبلاغك عند الموافقة على حسابك.
      </div>

      <div class="flex flex-col gap-3">
        <router-link
          to="/login"
          class="block w-full py-3 px-4 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition"
        >
          تسجيل الدخول
        </router-link>
        <router-link
          to="/signup"
          class="block w-full py-3 px-4 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition"
        >
          إنشاء حساب
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
