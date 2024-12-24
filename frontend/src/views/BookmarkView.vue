<script setup>
import { useGetBookmark } from "@/features/bookmark/api/use-get-bookmark";
import BookmarkList from "@/components/BookmarkList.vue";
import NotFound from "@/components/NotFound.vue";

const { data, isLoading, error } = useGetBookmark();
</script>

<template>
  <div class="w-full py-4 h-full bg-gray-100">
    <h3 class="pl-4 text-xl font-semibold mt-3 mb-5">Bookmarked Links</h3>

    <div v-if="isLoading" class="text-center">Loading...</div>
    <section v-else-if="data.data.length === 0" class="sec-container">
      <NotFound message="No bookmarked link!" redirectUrl="/" buttonText="Back to homepage" />
    </section>
    <div v-else-if="error" class="text-center text-red-500">Error loading bookmarks</div>
    <div v-else class="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-full overflow-y-auto">
      <BookmarkList v-for="link in data.data" :key="link.id" :link="link" />
    </div>
  </div>
</template>
