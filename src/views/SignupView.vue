<template>
  <div class="min-h-screen bg-brand-blue-50 flex flex-col items-center justify-center p-6">
    <div class="max-w-md w-full">
      <router-link to="/" class="inline-block text-brand-blue-600 hover:text-brand-blue-800 mb-6">← الرئيسية</router-link>
      <h1 class="text-2xl font-bold text-brand-blue-800 mb-6">إنشاء حساب</h1>

      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-brand-blue-700 mb-1">
            البريد الإلكتروني <span class="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-2 text-brand-blue-900 border border-brand-blue-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            placeholder="example@email.com"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-brand-blue-700 mb-1">
            كلمة المرور <span class="text-red-500" aria-hidden="true">*</span>
          </label>
          <PasswordInput v-model="password" required :minlength="6" />
        </div>
        <div>
          <label class="block text-sm font-medium text-brand-blue-700 mb-1">
            الاسم الكامل <span class="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            v-model="fullName"
            type="text"
            required
            class="w-full px-4 py-2 text-brand-blue-900 border border-brand-blue-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            placeholder="الاسم الكامل"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-brand-blue-700 mb-1">
            تاريخ الميلاد <span class="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            v-model="birthDate"
            type="date"
            required
            class="w-full px-4 py-2 text-brand-blue-900 border border-brand-blue-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-brand-blue-700 mb-1">
            فصيلة الدم <span class="text-red-500" aria-hidden="true">*</span>
          </label>
          <select
            v-model="bloodType"
            required
            class="w-full px-4 py-2 text-brand-blue-900 border border-brand-blue-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="" disabled>اختر فصيلة الدم</option>
            <option v-for="type in bloodTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-brand-blue-700 mb-1">
            سنة التخرج <span class="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            v-model="graduationYear"
            type="number"
            required
            min="1990"
            max="2030"
            class="w-full px-4 py-2 text-brand-blue-900 border border-brand-blue-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            placeholder="مثال: 2020"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-brand-blue-700 mb-1">
            رقم الهاتف الذي يحتوي على الواتساب مع رمز الدولة <span class="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            v-model="phone"
            type="tel"
            required
            class="w-full px-4 py-2 text-brand-blue-900 border border-brand-blue-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            placeholder="+213xxxxxxxxx"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-brand-blue-700 mb-1">
            التخصص الجامعي <span class="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            v-model="uniSpecialization"
            type="text"
            required
            class="w-full px-4 py-2 text-brand-blue-900 border border-brand-blue-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            placeholder="مثال: طب"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-brand-blue-700 mb-1">
            السنة الدراسية الجامعية <span class="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            v-model="uniYear"
            type="text"
            required
            class="w-full px-4 py-2 text-brand-blue-900 border border-brand-blue-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            placeholder="مثال: السنة الثالثة"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-brand-blue-700 mb-1">
            مكان الجامعة <span class="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            v-model="uniPlace"
            type="text"
            required
            class="w-full px-4 py-2 text-brand-blue-900 border border-brand-blue-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            placeholder="مثال: جامعة الجزائر 1"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-brand-blue-700 mb-1">المسمى الوظيفي <span class="text-brand-blue-400">(اختياري)</span></label>
          <input
            v-model="jobTitle"
            type="text"
            class="w-full px-4 py-2 text-brand-blue-900 border border-brand-blue-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            placeholder="مثال: مهندس برمجيات"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-brand-blue-700 mb-1">مكان العمل <span class="text-brand-blue-400">(اختياري)</span></label>
          <input
            v-model="workplace"
            type="text"
            class="w-full px-4 py-2 text-brand-blue-900 border border-brand-blue-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            placeholder="مثال: شركة تقنية"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-brand-blue-700 mb-1">المهارات <span class="text-brand-blue-400">(اختياري)</span></label>
          <input
            v-model="skills"
            type="text"
            class="w-full px-4 py-2 text-brand-blue-900 border border-brand-blue-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            placeholder="مثال: برمجة، تصميم، رياضة.."
          />
          <p class="text-xs text-brand-blue-500 mt-1">افصل بين المهارات بفاصلة</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-brand-blue-700 mb-1">ملاحظات <span class="text-brand-blue-400">(اختياري)</span></label>
          <textarea
            v-model="notes"
            rows="3"
            class="w-full px-4 py-2 text-brand-blue-900 border border-brand-blue-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent resize-y"
            placeholder="أي معلومات إضافية تود مشاركتها"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-brand-blue-700 mb-1">
            صورة لقسم المعلومات في كشف الدرجات (Transcript) <span class="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            type="file"
            accept="image/*,.pdf"
            required
            @change="onFileChange"
            class="w-full px-4 py-2 border border-brand-blue-200 rounded-lg focus:ring-2 focus:ring-brand-blue file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-brand-blue-50 file:text-brand-blue-700"
          />
          <p class="text-xs text-brand-blue-500 mt-1">صورة أو PDF </p>
        </div>
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
        <p v-if="loading && step" class="text-sm text-brand-blue-500 mt-1">{{ step }}</p>
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-brand-blue text-white rounded-lg font-medium hover:bg-brand-blue-600 disabled:opacity-50 transition"
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
import PasswordInput from '../components/PasswordInput.vue'

const router = useRouter()
const auth = useAuthStore()

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const email = ref('')
const password = ref('')
const fullName = ref('')
const birthDate = ref('')
const bloodType = ref('')
const graduationYear = ref('')
const phone = ref('')
const uniSpecialization = ref('')
const uniYear = ref('')
const uniPlace = ref('')
const jobTitle = ref('')
const workplace = ref('')
const skills = ref('')
const notes = ref('')
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

function parseSkills(value) {
  return value
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean)
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
    const parsedSkills = skills.value ? parseSkills(skills.value) : []
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

      step.value = 'جاري حفظ الملف الشخصي...'
      const { error: profileErr } = await withTimeout(
        createProfile({
          id: userId,
          full_name: fullName.value.trim(),
          email: email.value.trim(),
          graduation_year: graduationYear.value,
          phone: phone.value.trim(),
          transcript_url: '',
          birth_date: birthDate.value,
          blood_type: bloodType.value,
          uni_specialization: uniSpecialization.value.trim(),
          uni_year: uniYear.value.trim(),
          uni_place: uniPlace.value.trim(),
          job_title: jobTitle.value.trim(),
          workplace: workplace.value.trim(),
          skills: parsedSkills,
          notes: notes.value.trim(),
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
        birth_date: birthDate.value,
        blood_type: bloodType.value,
        uni_specialization: uniSpecialization.value.trim(),
        uni_year: uniYear.value.trim(),
        uni_place: uniPlace.value.trim(),
        job_title: jobTitle.value.trim() || null,
        workplace: workplace.value.trim() || null,
        skills: parsedSkills.length ? parsedSkills : null,
        notes: notes.value.trim() || null,
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
