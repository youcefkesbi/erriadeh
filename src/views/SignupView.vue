<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
    <div class="max-w-sm w-full">
      <router-link to="/" class="inline-block text-slate-600 hover:text-slate-800 mb-6">← الرئيسية</router-link>
      <h1 class="text-2xl font-bold text-slate-800 mb-6">إنشاء حساب</h1>

      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">البريد الإلكتروني</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder="example@email.com"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">كلمة المرور</label>
          <input
            v-model="password"
            type="password"
            required
            minlength="6"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">الاسم الكامل</label>
          <input
            v-model="fullName"
            type="text"
            required
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder="الاسم الكامل"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">سنة التخرج</label>
          <input
            v-model="graduationYear"
            type="number"
            required
            min="1990"
            max="2030"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder="مثال: 2020"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">رقم الهاتف الذي يحتوي على الواتساب</label>
          <input
            v-model="phone"
            type="tel"
            required
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder="05xxxxxxxx"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">صورة لقسم المعلومات في كشف الدرجات (Transcript)</label>
          <input
            type="file"
            accept="image/*,.pdf"
            required
            @change="onFileChange"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-slate-100 file:text-slate-700"
          />
          <p class="text-xs text-slate-500 mt-1">صورة أو PDF </p>
        </div>
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
        <p v-if="loading && step" class="text-sm text-slate-500 mt-1">{{ step }}</p>
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 disabled:opacity-50 transition"
        >
          {{ loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import {
  signUpWithEmail,
  createProfile,
  uploadTranscript,
  updateMyProfile,
} from '../supabase'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const fullName = ref('')
const graduationYear = ref('')
const phone = ref('')
const transcriptFile = ref(null)
const error = ref('')
const loading = ref(false)
const step = ref('')
const SIGNUP_TIMEOUT_MS = 20000
const STEP_TIMEOUT_MS = 15000

function onFileChange(e) {
  const file = e.target.files?.[0]
  transcriptFile.value = file || null
}

function timeoutPromise(ms, message) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), ms)
  })
}

function withTimeout(promise, ms, message) {
  return Promise.race([promise, timeoutPromise(ms, message)])
}

async function handleSignup() {
  error.value = ''
  step.value = ''
  if (!transcriptFile.value) {
    error.value = 'يرجى رفع صورة كشف الدرجات'
    return
  }
  loading.value = true
  try {
    const signupFlow = (async () => {
      step.value = 'جاري إنشاء الحساب...'
      const { data: signUpData, error: signUpErr } = await withTimeout(
        signUpWithEmail(email.value, password.value),
        STEP_TIMEOUT_MS,
        'انتهت المهلة عند إنشاء الحساب. تحقق من اتصالك.'
      )
      if (signUpErr) {
        throw new Error(signUpErr.message || 'فشل إنشاء الحساب. تحقق من البريد وكلمة المرور.')
      }
      const userId = signUpData.user?.id
      if (!userId) {
        throw new Error('لم يتم إنشاء الحساب. جرّب مرة أخرى أو تواصل مع الإدارة.')
      }
      if (!signUpData.session) {
        throw new Error('يبدو أن تفعيل البريد مطلوب. تحقق من بريدك واضغط الرابط ثم سجّل الدخول.')
      }
      // Supabase sets the session automatically on signUp; no manual setSession.

      step.value = 'جاري حفظ الملف الشخصي...'
      const { error: profileErr } = await withTimeout(
        createProfile({
          id: userId,
          full_name: fullName.value.trim(),
          email: email.value.trim(),
          graduation_year: graduationYear.value,
          phone: phone.value.trim(),
          transcript_url: '',
        }),
        STEP_TIMEOUT_MS,
        'انتهت المهلة عند حفظ الملف الشخصي. تحقق من اتصالك وإعدادات RLS في Supabase.'
      )
      if (profileErr) {
        throw new Error(profileErr.message || 'فشل حفظ الملف الشخصي. تواصل مع الإدارة.')
      }

      step.value = 'جاري رفع الملف...'
      const { data: publicUrl, error: uploadErr } = await withTimeout(
        uploadTranscript(transcriptFile.value),
        STEP_TIMEOUT_MS,
        'انتهت المهلة عند رفع الملف. تحقق من اتصالك وإعدادات Storage في Supabase.'
      )
      if (uploadErr) {
        throw new Error('فشل رفع الملف: ' + (uploadErr.message || 'تحقق من اتصالك وجرّب لاحقاً.'))
      }
      if (!publicUrl) {
        throw new Error('لم نتمكن من الحصول على رابط الملف بعد الرفع.')
      }

      step.value = 'جاري حفظ الرابط...'
      const { error: updateErr } = await withTimeout(
        updateMyProfile({ transcript_url: publicUrl }),
        STEP_TIMEOUT_MS,
        'انتهت المهلة عند حفظ الرابط. تحقق من اتصالك.'
      )
      if (updateErr) {
        throw new Error('تم رفع الملف لكن حدث خطأ في حفظ الرابط. تواصل مع الإدارة.')
      }

      auth.setSession(signUpData.user, {
        id: userId,
        full_name: fullName.value.trim(),
        email: email.value.trim(),
        graduation_year: Number(graduationYear.value),
        phone: phone.value.trim(),
        role: 'student',
        status: 'pending',
        transcript_url: publicUrl,
      })
      router.push({ name: 'Home', query: { message: 'pending' } })
    })()

    await Promise.race([
      signupFlow,
      timeoutPromise(SIGNUP_TIMEOUT_MS, 'انتهت المهلة. تحقق من اتصالك وجرّب مرة أخرى.'),
    ])
  } catch (err) {
    error.value = err?.message || 'حدث خطأ غير متوقع. جرّب مرة أخرى.'
  } finally {
    loading.value = false
    step.value = ''
  }
}
</script>
