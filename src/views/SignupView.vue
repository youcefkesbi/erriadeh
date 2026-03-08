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
          <label class="block text-sm font-medium text-slate-700 mb-1">رقم الهاتف</label>
          <input
            v-model="phone"
            type="tel"
            required
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder="05xxxxxxxx"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">صورة كشف الدرجات (Transcript)</label>
          <input
            type="file"
            accept="image/*,.pdf"
            required
            @change="onFileChange"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-slate-100 file:text-slate-700"
          />
          <p class="text-xs text-slate-500 mt-1">صورة أو PDF لكشف الدرجات</p>
        </div>
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
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
import { signUpWithEmail, createProfile, uploadTranscript, updateMyProfile } from '../supabase'

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

function onFileChange(e) {
  const file = e.target.files?.[0]
  transcriptFile.value = file || null
}

async function handleSignup() {
  error.value = ''
  if (!transcriptFile.value) {
    error.value = 'يرجى رفع صورة كشف الدرجات'
    return
  }
  loading.value = true
  try {
    const { data: signUpData, error: signUpErr } = await signUpWithEmail(email.value, password.value)
    if (signUpErr) {
      error.value = signUpErr.message || 'فشل إنشاء الحساب'
      loading.value = false
      return
    }
    const userId = signUpData.user.id

    // Create profile first (transcript_url empty); RLS: auth.uid() = id on INSERT
    const { error: profileErr } = await createProfile({
      id: userId,
      full_name: fullName.value.trim(),
      email: email.value.trim(),
      graduation_year: graduationYear.value,
      phone: phone.value.trim(),
      transcript_url: '',
    })
    if (profileErr) {
      error.value = profileErr.message || 'فشل حفظ الملف الشخصي'
      loading.value = false
      return
    }

    // Upload to public bucket (session already set after signUp)
    const { data: publicUrl, error: uploadErr } = await uploadTranscript(transcriptFile.value)
    if (uploadErr) {
      error.value = 'فشل رفع الملف. تأكد من اتصالك أو جرّب لاحقاً.'
      loading.value = false
      return
    }
    if (!publicUrl) {
      error.value = 'لم نتمكن من الحصول على رابط الملف بعد الرفع.'
      loading.value = false
      return
    }

    // Save transcript URL via RLS-safe update (auth.uid() = id)
    const { error: updateErr } = await updateMyProfile({ transcript_url: publicUrl })
    if (updateErr) {
      error.value = 'تم رفع الملف لكن حدث خطأ في حفظ الرابط. تواصل مع الإدارة.'
      loading.value = false
      return
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
  } finally {
    loading.value = false
  }
}
</script>
