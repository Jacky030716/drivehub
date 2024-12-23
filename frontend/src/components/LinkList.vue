<script setup>
import { useDeleteLink } from "@/features/links/api/use-delete-link";
import { useCreateBookmark } from "@/features/bookmark/api/use-create-bookmark";
import { useDeleteBookmark } from "@/features/bookmark/api/use-delete-bookmark"; 
import {
  CalendarDays,
  Link2,
  Mail,
  FileText,
  Folder,
  EditIcon,
  Trash,
  Bookmark,
} from "lucide-vue-next";
import { RouterLink } from "vue-router";
import Button from "./ui/button/Button.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
  link: {
    type: Object,
    required: true,
  },
});

// Local bookmark state
const isBookmarked = ref(false);
const currentBookmarkId = ref(null);

// Create and Delete Bookmark Mutations
const createBookmarkMutation = useCreateBookmark();
const deleteBookmarkMutation = useDeleteBookmark();

// Check bookmark status (isBookmarked.value)
onMounted(async () => {
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("email");
  
  if (!token || !userEmail) return;

  try {
    const response = await axios.get(`http://localhost:3000/api/bookmarks`, {
      params: { userEmail },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Bookmarks fetched:", response.data.data); // Debugging log
    
    // Find the bookmark for this link if it exists
    const bookmark = response.data.data.find(
      bookmark => bookmark.link.id === props.link.id
    );
    
    if (bookmark) {
      isBookmarked.value = true;
      currentBookmarkId.value = bookmark.id; // Store the bookmark ID
    }
  } catch (error) { 
    console.error('Error checking bookmark status:', error);
  }
});

// Handle Bookmark Toggle
const handleBookmarkToggle = async () => {
  if (!isBookmarked.value) {
    const confirmed = confirm("Are you sure to mark this link as favorite?");
    if (confirmed) {
      try {
        const response = await createBookmarkMutation.mutateAsync({
          linkId: props.link.id,
          userEmail: localStorage.getItem("email")
        });
        
        isBookmarked.value = true;
        currentBookmarkId.value = response.data.id; // Store the new bookmark ID
      } catch (error) {
        console.error("Error adding bookmark:", error);
      }
    }
  } else {
    const confirmed = confirm("Are you sure to unmark this link as favorite?");
    if (confirmed && currentBookmarkId.value) {
      try {
        // Pass the bookmarkId directly, not as an object
        await deleteBookmarkMutation.mutateAsync(currentBookmarkId.value);
        isBookmarked.value = false;
        currentBookmarkId.value = null;
      } catch (error) {
        console.error("Error removing bookmark:", error);
      }
    }
  }
};
const handleEdit = () => {
  alert("Edit functionality triggered for: " + props.link.id);
};

const deleteMutation = useDeleteLink(props.link.id);

const handleDelete = async () => {
  const confirm = window.confirm("Do you really want to delete this link?");
  if (confirm) {
    deleteMutation.mutate();
  }
};

const isOwner = localStorage.getItem("email") === props.link.email;

</script>

<template>
  <div
    class="bg-white p-4 mb-2 rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer hover:bg-slate-100 relative">
    <!-- Bookmark Icon -->
    <div
      class="absolute top-3 right-3 cursor-pointer group"
      @click="handleBookmarkToggle()"
    >
      <Bookmark
        :class="[ 
          'w-6 h-6',
          isBookmarked
            ? 'text-red-800 fill-red-800 group-hover:text-red-900 group-hover:fill-red-900'
            : 'text-gray-300 group-hover:text-gray-500'
        ]"
      />
    </div>

    <!-- Content -->
    <div>
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
          <span>{{ link.email }}</span>
        </div>
        <div class="flex items-center text-xs text-gray-500">
          <Folder class="w-3 h-3 mr-1" />
          <span>{{ link.category }}</span>
        </div>
      </div>
    </div>

    <!-- Edit and Delete Buttons -->
    <div v-if="isOwner" class="absolute bottom-2 right-2 flex space-x-2">
      <RouterLink :to="`/share/edit/${link.id}`">
        <Button size="sm" variant="outline" class="flex items-center gap-2">
          <EditIcon />
          Edit Link
        </Button>
      </RouterLink>
      <Button
        size="sm"
        variant="destructive"
        @click.prevent="handleDelete"
        :disabled="deleteMutation.isLoading"
      >
        <Trash />
        {{ deleteMutation.isLoading ? "Deleting..." : "Delete Link" }}
      </Button>
    </div>
  </div>
</template>

<style scoped>
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
