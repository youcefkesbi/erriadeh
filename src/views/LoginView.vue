<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
    <div class="max-w-sm w-full">
      <router-link to="/" class="inline-block text-slate-600 hover:text-slate-800 mb-6">← الرئيسية</router-link>
      <h1 class="text-2xl font-bold text-slate-800 mb-6">تسجيل الدخول</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">البريد الإلكتروني</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-2 text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder="example@email.com"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">كلمة المرور</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-2 text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          />
        </div>
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 disabled:opacity-50 transition"
        >
          {{ loading ? 'جاري الدخول...' : 'دخول' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { signInWithEmail, waitForAuthSession } from '../supabase'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    const { data, error: err } = await signInWithEmail(email.value, password.value)
    if (err) {
      error.value = err.message || 'فشل تسجيل الدخول'
      return
    }
    await waitForAuthSession()
    auth.setSession(data.user, null)
    await auth.fetchUser()
    if (auth.isAdmin) router.push({ name: 'Admin' })
    else if (auth.isActive) router.push({ name: 'Dashboard' })
    else router.push({ name: 'Home', query: { message: 'pending' } })
  } catch (e) {
    error.value = e?.message || 'حدث خطأ غير متوقع. جرّب مرة أخرى.'
  } finally {
    loading.value = false
  }
}
</script>
