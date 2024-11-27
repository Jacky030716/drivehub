<script setup>
import { RouterLink } from "vue-router";
import { User, Folder, CalendarDays, FileText, Mail } from "lucide-vue-next";

const props = defineProps({
  hub: {
    type: Object,
    required: true,
  },
  categoryColor: {
    type: String,
    default: "text-gray-500",
  },
});
</script>

<template>
  <RouterLink :to="`/hub/${hub.categoryId}`">
    <div class="bg-white p-4 mb-2 rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer hover:bg-gray-300 hover:border-5">
      <div class="flex-1">
        <!-- Title with category icon -->
        <div class="flex items-center mb-2">
          <Folder :class="[categoryColor, 'w-4 h-4 mr-2']" />
          <p class="text-sm font-semibold">{{ hub.categoryName }}</p>
        </div>

        <!-- Details section -->
        <div class="space-y-1">
          <!-- Creator -->
          <div class="flex items-center text-xs text-gray-500">
            <User class="w-3 h-3 mr-1" />
            <span>{{ hub.categoryCreator }}</span>
          </div>

          <!-- Session/Semester -->
          <div class="flex items-center text-xs text-gray-500">
            <CalendarDays class="w-3 h-3 mr-1" />
            <span>{{ hub.categoryCreatedSession }}-{{ hub.categoryCreatedSemester }}</span>
          </div>

          <!-- Description -->
          <div class="flex items-center text-xs text-gray-500">
            <FileText class="w-3 h-3 mr-1" />
            <span>{{ hub.categoryDescription }}</span>
          </div>

          <!-- Email -->
          <div class="flex items-center text-xs text-gray-500">
            <Mail class="w-3 h-3 mr-1" />
            <span>{{ hub.categoryCreatorEmail }}</span>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
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
