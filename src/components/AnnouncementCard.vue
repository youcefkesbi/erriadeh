<template>
  <router-link
    :to="`/announcements/${announcement.id}`"
    class="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-xl"
  >
    <article
      class="bg-white border border-brand-blue-100 rounded-xl overflow-hidden flex flex-col h-full transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-0.5"
    >
    <div v-if="announcement.image_url" class="relative">
      <span
        class="absolute top-3 left-3 z-10 rounded-full bg-brand-blue-500/90 px-3 py-1.5 text-xs font-semibold text-white"
      >
        انتهى
      </span>
      <img
        :src="announcement.image_url"
        alt="صورة الإعلان"
        class="w-full h-400 object-cover"
      />
    </div>
    <div v-else class="px-3 pt-3">
      <span class="inline-flex rounded-full bg-brand-blue-500/90 px-3 py-1.5 text-xs font-semibold text-white">
        انتهى
      </span>
    </div>
    <div class="p-3 sm:p-4 flex flex-col flex-1">
      <h3 class="font-medium text-brand-blue-800 text-sm sm:text-base line-clamp-2 mb-1 group-hover:text-brand-blue transition-colors">
        {{ announcement.title }}
      </h3>
      <p v-if="formattedDate" class="text-xs text-brand-blue-500 mb-2">
        {{ formattedDate }}
      </p>
      <p
        class="text-sm text-brand-blue-600 whitespace-pre-wrap"
        :class="compact ? 'line-clamp-3' : ''"
      >
        {{ announcement.content }}
      </p>
    </div>
    </article>
  </router-link>
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

