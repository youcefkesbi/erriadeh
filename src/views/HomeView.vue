<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6">
    <div class="w-full max-w-xl">
      <div class="text-center">
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
    </div>
  </div>
</template>

<script setup>
import logo from '../assets/logo.png'
// صفحة الهبوط بسيطة: الاسم + زر إنشاء حساب + زر تسجيل الدخول.
// الإعلانات تظهر فقط داخل لوحة الطالب / لوحة الإدارة للمستخدمين المصادقين.
</script>
