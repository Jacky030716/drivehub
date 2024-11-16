<script setup>
import { RouterLink } from "vue-router"
import { Calendar, Folder, Mail, ChevronRight } from 'lucide-vue-next';

const props = defineProps({
  resource: {
    type: Object,
    required: true
  },
  categoryColor: {
    type: String,
    default: 'text-gray-500'
  }
})

const truncateText = (text, limit = 80) => {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + '...';
}
</script>

<template>
  <div class="bg-white p-4 mb-2 rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer hover:bg-gray-300">
    <div class="flex-1">
      <!-- Title with icon based on category -->
      <div class="flex items-center mb-2">
        <Folder :class="[categoryColor, 'w-4 h-4 mr-2']" />
        <p class="text-sm font-semibold">{{ resource.name }}</p>
      </div>

      <!-- Details section -->
      <div class="space-y-1">
        <!-- Category -->
        <div class="flex items-center text-xs text-gray-500">
          <ChevronRight class="w-3 h-3 mr-1" />
          <span>{{ resource.category }}</span>
        </div>

        <!-- Session/Semester -->
        <div class="flex items-center text-xs text-gray-500">
          <Calendar class="w-3 h-3 mr-1" />
          <span>{{ resource.session }}/{{ resource.semester }}</span>
        </div>

        <!-- Description -->
        <p class="text-xs text-gray-600 mt-1">
          {{ truncateText(resource.description) }}
        </p>

        <!-- Email -->
        <div class="flex items-center text-xs text-gray-500">
          <Mail class="w-3 h-3 mr-1" />
          <span>{{ resource.email }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.cursor-pointer:hover .text-sm {
  color: #4F46E5;
  text-decoration: underline;
}
</style>