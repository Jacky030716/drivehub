<script setup>
import { ref } from "vue";
import { useDeleteBookmark } from "@/features/bookmark/api/use-delete-bookmark";
import {
  Bookmark,
  Link2,
  FileText,
  CalendarDays,
  Mail,
  Folder,
  Trash2,
  Edit,
} from "lucide-vue-next";

// Local bookmark state
const isBookmarked = ref(false);
const currentBookmarkId = ref(null);

const props = defineProps({
  link: Object,
});

const deleteBookmarkMutation = useDeleteBookmark();

const handleDelete = async (bookmarkId) => {
  if (!bookmarkId) return;

  const confirmed = confirm("Are you sure you want to remove this link from the bookmark?");
  if (confirmed) {
    try {
      await deleteBookmarkMutation.mutateAsync(bookmarkId);
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  }
};

</script>

<template>
  <div class="bg-white p-4 mb-2 rounded-lg shadow relative pr-6 hover:shadow-md transition-shadow duration-200 hover:bg-gray-300 ">

    <!-- Link URL -->
    <div class="block mb-2 text-blue-500 cursor-default">
      <div class="flex items-center">
        <Link2 class="text-blue-500 w-4 h-4 mr-2 flex-shrink-0" />
        <a :href="link.link.url" target="_blank" class="text-sm font-semibold line-clamp-1 pr-6 hover:underline cursor-pointer">{{
          link.link.url
        }}</a>
      </div>
    </div>
    <!-- <div class="flex items-center mb-2">
        <Link2 :class="['text-blue-500', 'w-4 h-4 mr-2']" />
        <a :href="link.link.url" target="_blank" class="text-blue-500 hover:underline text-sm font-semibold">
          {{ link.link.url }}
        </a>
      </div> -->

    <!-- Details -->
    <div class="space-y-2">
      <!-- Description -->
      <div class="flex items-start text-xs text-gray-600">
        <FileText class="w-3 h-3 mr-2 mt-1 flex-shrink-0" />
        <span class="flex-grow">
          {{ link.link.description }}
        </span>
      </div>

      <!-- Session and Semester -->
      <div class="flex items-center text-xs text-gray-600">
        <CalendarDays class="w-3 h-3 mr-2" />
        <span>{{ link.link.session }} - {{ link.link.semester }}</span>
      </div>

      <!-- Email -->
      <div class="flex items-center text-xs text-gray-600">
        <Mail class="w-3 h-3 mr-2" />
        <span>{{ link.link.email }}</span>
      </div>

      <!-- Additional Info -->
      <div class="flex items-center text-xs text-gray-600">
        <Folder class="w-3 h-3 mr-2" />
        <span>{{ link.link.category }}</span>
      </div>

      <!-- Delete Buttons -->
      <!-- <div class="absolute bottom-4 right-4">
        <button
          class="p-2 text-xs text-white bg-red-500 rounded-full hover:bg-red-600 flex items-center"
          @click="handleDelete(link.id)"
        >
          <Trash2 class="w-5 h-5" />
        </button>
      </div> -->
      <div class="absolute top-1 right-3 cursor-pointer group" @click="handleDelete(link.id)">
        <Bookmark :class="[
          'w-6 h-6',
          isBookmarked
            ? 'group-hover:text-red-700 group-hover:fill-red-700 text-red-900 fill-red-900'
            : 'group-hover:text-gray-700 group-hover:fill-gray-500 text-red-700 fill-red-700'
        ]" />
      </div>
    </div>
  </div>
</template>
