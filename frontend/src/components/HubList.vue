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

const handleEdit = () => {
  alert("Edit functionality triggered for: " + props.hub.categoryName);
};

const handleDelete = () => {
  alert("Delete functionality triggered for: " + props.hub.categoryName);
};
</script>

<template>
  <RouterLink :to="`/hub/${hub.categoryId}`" class="block">
    <div class="bg-white p-4 mb-2 rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer hover:bg-gray-300 relative">
      <!-- Content -->
      <div>
        <div class="flex items-center mb-2">
          <Folder :class="[categoryColor, 'w-4 h-4 mr-2']" />
          <p class="text-sm font-semibold">{{ hub.categoryName }}</p>
        </div>

        <div class="space-y-1">
          <div class="flex items-center text-xs text-gray-500">
            <User class="w-3 h-3 mr-1" />
            <span>{{ hub.categoryCreator }}</span>
          </div>
          <div class="flex items-center text-xs text-gray-500">
            <CalendarDays class="w-3 h-3 mr-1" />
            <span>{{ hub.categoryCreatedSession }}-{{ hub.categoryCreatedSemester }}</span>
          </div>
          <div class="flex items-center text-xs text-gray-500">
            <FileText class="w-3 h-3 mr-1" />
            <span>{{ hub.categoryDescription }}</span>
          </div>
          <div class="flex items-center text-xs text-gray-500">
            <Mail class="w-3 h-3 mr-1" />
            <span>{{ hub.categoryCreatorEmail }}</span>
          </div>
        </div>
      </div>

      <!-- Edit and Delete Buttons -->
      <div class="absolute bottom-2 right-2 flex space-x-2">
        <button
          class="px-3 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
          @click.prevent="handleEdit"
        >
          Edit
        </button>
        <button
          class="px-3 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
          @click.prevent="handleDelete"
        >
          Delete
        </button>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
