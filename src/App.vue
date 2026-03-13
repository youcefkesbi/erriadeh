<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <div class="flex-1">
      <router-view />
    </div>
    <footer class="border-t border-slate-200 bg-white">
      <div class="max-w-5xl mx-auto px-6 py-6 grid gap-6 md:grid-cols-3 text-sm text-slate-600">
        <div>
          <h2 class="font-semibold text-slate-800 mb-3">روابط سريعة</h2>
          <ul class="space-y-1">
            <li><router-link to="/" class="hover:text-slate-900">الرئيسية</router-link></li>
            <li><router-link to="/about" class="hover:text-slate-900">من نحن</router-link></li>
            <li><router-link to="/services" class="hover:text-slate-900">الخدمات</router-link></li>
            <li><a href="#" class="hover:text-slate-900">تواصل معنا</a></li>
          </ul>
        </div>
        <div>
          <h2 class="font-semibold text-slate-800 mb-3">تابعنا</h2>
          <ul class="space-y-1">
            <li><a href="#" class="hover:text-slate-900">Facebook</a></li>
            <li><a href="#" class="hover:text-slate-900">Instagram</a></li>
          </ul>
        </div>
        <div class="md:text-left text-center md:flex md:flex-col md:items-end">
          <p class="text-slate-500">© 2026</p>
          <p class="font-semibold text-slate-800 mt-1">رابطة خريجي مدرسة Erriadeh</p>
          <p class="text-slate-500 mt-1">جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>
