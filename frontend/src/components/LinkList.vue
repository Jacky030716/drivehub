<script setup>
import { useDeleteLink } from "@/features/links/api/use-delete-link";
import { CalendarDays, Link2, Mail, FileText, Folder } from "lucide-vue-next";
import { RouterLink } from 'vue-router'

const props = defineProps({
  link: {
    type: Object,
    required: true,
  },
});

const handleEdit = () => {
  alert("Edit functionality triggered for: " + props.link.id);
}

const mutation = useDeleteLink(props.link.id)

const handleDelete = async () => {
  const confirm = window.confirm("Do you really want to delete this link?")
  if (confirm) {
    mutation.mutate()
  }
};

</script>

<template>
  <div
    class="bg-white p-4 mb-2 rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer hover:bg-gray-300 relative">
    <!-- Content -->
    <div>
      <!-- Title with link icon -->
      <a :href="link.url">
        <div class="flex items-center mb-2">
          <Link2 :class="['text-blue-500', 'w-4 h-4 mr-2']" />
          <a :href="link.url" target="_blank" class="text-blue-500 hover:underline text-sm font-semibold">
            {{ link.url }}
          </a>
        </div>
      </a>

        <!-- Details -->
        <div class="space-y-1">
          <div class="flex items-center text-xs text-gray-500">
            <FileText class="w-3 h-3 mr-1" />
            <span>{{ link.description }}</span>
          </div>
          <div class="flex items-center text-xs text-gray-500">
            <CalendarDays class="w-3 h-3 mr-1" />
            <span>{{ link.session }}-{{ link.semester }}</span>
          </div>
          <div class="flex items-center text-xs text-gray-500">
            <Mail class="w-3 h-3 mr-1" />
            <span>{{ link.email }} </span>
          </div>
          <div class="flex items-center text-xs text-gray-500">
            <Folder class="w-3 h-3 mr-1" />
            <span>{{ link.category }} </span>
          </div>
        </div>
      </div>

    <!-- Edit and Delete Buttons -->
    <div class="absolute bottom-2 right-2 flex space-x-2">
      <RouterLink :to="`/share/edit/${link.id}`" class="px-3 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600">
        Edit
      </RouterLink>
      <button class="px-3 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600" @click="handleDelete">
        Delete
      </button>
    </div>
  </div>
  
</template>

<style scoped>
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
