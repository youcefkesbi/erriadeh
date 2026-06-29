<template>
  <div class="min-h-screen flex flex-col bg-brand-blue-50">
    <header class="bg-white border-b border-brand-blue-100">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-2">
          <img
            :src="logo"
            alt="شعار الريادة"
            class="h-8 w-auto object-contain"
          />
          <span class="hidden sm:inline text-sm font-semibold text-brand-blue-800">
            رابطة خريجي مدرسة الريادة
          </span>
        </router-link>
        <nav class="flex items-center gap-4 text-xs sm:text-sm text-brand-blue-600">
          <router-link
            to="/"
            class="hover:text-brand-blue-900"
            :class="{ 'font-semibold text-brand-blue-900': $route.name === 'Home' }"
          >
            الرئيسية
          </router-link>
          <router-link
            to="/about"
            class="hover:text-brand-blue-900"
            :class="{ 'font-semibold text-brand-blue-900': $route.name === 'About' }"
          >
            من نحن
          </router-link>
          <router-link
            to="/services"
            class="hover:text-brand-blue-900"
            :class="{ 'font-semibold text-brand-blue-900': $route.name === 'Services' }"
          >
            الخدمات
          </router-link>
          <router-link
            :to="{ name: primaryLink.name }"
            class="px-3 py-1.5 rounded-lg bg-brand-blue text-white font-medium hover:bg-brand-blue-600"
          >
            {{ primaryLink.label }}
          </router-link>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <HomepageLayout>
        <div class="page-transition-shell relative w-full">
          <router-view v-slot="{ Component, route }">
            <Transition name="page" appear>
              <div v-if="Component" :key="route.path" class="page-view w-full">
                <component :is="Component" />
              </div>
            </Transition>
          </router-view>
        </div>
      </HomepageLayout>
    </main>

    <footer class="border-t border-brand-blue-100 bg-white">
      <div class="max-w-5xl mx-auto px-6 py-6 grid gap-6 md:grid-cols-3 text-sm text-brand-blue-600">
        <div>
          <h2 class="font-semibold text-brand-blue-800 mb-3">روابط سريعة</h2>
          <ul class="space-y-1">
            <li><router-link to="/" class="hover:text-brand-blue-900">الرئيسية</router-link></li>
            <li><router-link to="/about" class="hover:text-brand-blue-900">من نحن</router-link></li>
            <li><router-link to="/services" class="hover:text-brand-blue-900">الخدمات</router-link></li>
            <li><a href="#" class="hover:text-brand-blue-900">تواصل معنا</a></li>
          </ul>
        </div>
        <div>
          <h2 class="font-semibold text-brand-blue-800 mb-3">تابعنا</h2>
          <ul class="space-y-1">
            <li><a href="#" class="hover:text-brand-blue-900">Facebook</a></li>
            <li><a href="#" class="hover:text-brand-blue-900">Instagram</a></li>
          </ul>
        </div>
        <div class="md:text-left text-center md:flex md:flex-col md:items-end">
          <p class="text-brand-blue-500">© 2026</p>
          <p class="font-semibold text-brand-blue-800 mt-1">رابطة خريجي مدرسة الريادة</p>
          <p class="text-brand-blue-500 mt-1">جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from './stores/auth'
import HomepageLayout from './components/HomepageLayout.vue'
import logo from './assets/new/new-logo.PNG'

const auth = useAuthStore()

const isActive = computed(() => auth.isAuthenticated && auth.isActive)
const isAdmin = computed(() => auth.isAdmin)

const primaryLink = computed(() => {
  if (isAdmin.value) return { name: 'Admin', label: 'لوحة الإدارة' }
  if (isActive.value) return { name: 'Dashboard', label: 'لوحة الطالب' }
  return { name: 'Login', label: 'تسجيل الدخول' }
})
</script>
