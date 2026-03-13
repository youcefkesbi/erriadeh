<template>
  <article class="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col h-full">
    <div v-if="announcement.image_url" class="relative">
      <img
        :src="announcement.image_url"
        alt="صورة الإعلان"
        class="w-full h-40 object-cover"
      />
    </div>
    <div class="p-3 sm:p-4 flex flex-col flex-1">
      <h3 class="font-medium text-slate-800 text-sm sm:text-base line-clamp-2 mb-1">
        {{ announcement.title }}
      </h3>
      <p v-if="formattedDate" class="text-xs text-slate-500 mb-2">
        {{ formattedDate }}
      </p>
      <p
        class="text-sm text-slate-600 whitespace-pre-wrap"
        :class="compact ? 'line-clamp-3' : ''"
      >
        {{ announcement.content }}
      </p>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  announcement: {
    type: Object,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})

const formattedDate = computed(() => {
  const iso = props.announcement?.created_at
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})
</script>

