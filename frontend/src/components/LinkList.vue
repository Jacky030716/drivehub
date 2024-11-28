<script setup>
import { CalendarDays, Link2, Mail, User, FileText, Folder } from "lucide-vue-next";

const props = defineProps({
  link: {
    type: Object,
    required: true,
  }
});
</script>

<template>
  <div class="bg-white p-4 mb-2 rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer hover:bg-gray-300 hover:border-5">
    <div class="flex-1">
      <!-- Title with link icon -->
      <a :href="link.url">
        <div class="flex items-center mb-2">
        <Link2 :class="['text-blue-500', 'w-4 h-4 mr-2']" />
        <a
          :href="link.url"
          target="_blank"
          class="text-blue-500 hover:underline text-sm font-semibold"
        >
          {{ link.url }}
        </a>
      </div>

      <!-- Details section -->
      <div class="space-y-1">
        <!-- Name -->
        <div class="flex items-center text-xs text-gray-500">
          <i class="pi pi-info-circle w-3 h-3 mr-1" />
          <span>{{ link.name }}</span>
        </div>

        <!-- Session/Semester -->
        <div class="flex items-center text-xs text-gray-500">
          <CalendarDays class="w-3 h-3 mr-1" />
          <span>{{ link.session }}-{{ link.semester }}</span>
        </div>

        <!-- Description -->
        <div class="flex items-center text-xs text-gray-500">
          <FileText class="w-3 h-3 mr-1" />
          <span>{{ link.description }}</span>
        </div>

        <!-- Email -->
        <div class="flex items-center text-xs text-gray-500">
          <Mail class="w-3 h-3 mr-1" />
          <span>{{ link.email }} fixed this</span>
        </div>
      </div>
      </a>
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
