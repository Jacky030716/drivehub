<script setup>
import { computed, onMounted, ref } from "vue";
import { FileText } from 'lucide-vue-next';
import { useGetCategories } from "@/features/category/use-get-categories";
import { useGetLinks } from "@/features/links/api/use-get-links";
import LinkList from "@/components/LinkList.vue";
import Button from "@/components/ui/button/Button.vue";
import { RouterLink } from "vue-router";
import RecentFiles from "@/components/RecentFiles.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

// Fetch the data
const categoriesQuery = useGetCategories();
const linksQuery = useGetLinks();

// Computed properties for reactivity
const isDisabled = computed(() => categoriesQuery.isLoading.value || linksQuery.isLoading.value);
const links = computed(() => linksQuery.data?.value?.data || []);

onMounted(() => {
  if (!categoriesQuery.data) {
    categoriesQuery.refetch();
  }
});
</script>

<template>
  <div v-if="isDisabled" class="min-h-screen w-full flex justify-center items-center">
    <PulseLoader color="#882C4C"/>
  </div>

  <div v-else class="sec-container font-sans px-0 pt-0">
    <!-- Header -->
    <div class="bg-white shadow px-4 py-6 w-full flex-shrink-0 h-fit">
      <h1 class="text-2xl font-semibold text-center">
        Welcome to
        <span class="font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500">
          DriveHub
        </span>
      </h1>
      <!-- Recent Files Section -->
      <div class="w-full flex flex-col items-start gap-2.5">
        <h3 class="font-semibold">Recent Shared Links</h3>
        <div class="w-full grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          <RecentFiles :links="links" />
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="max-h-[calc(100vh-180px)] overflow-y-auto">
      <div class="w-full flex items-center justify-between px-8 pb-6">
        <h2 class="font-semibold text-gray-600 flex items-center px-4">
          <FileText class="w-4 h-4 mr-2" />
          Suggested Links
        </h2>
        <!-- <HubForm /> -->
      </div>
      <div class="w-full px-4 pb-4">
        <LinkList v-for="item in links.slice(0, Math.min(links.length, 8))" :key="item.id" :link="item" />
        <Button as-child class="flex justify-center mt-4 w-fit mx-auto">
          <RouterLink to="/shared">
            View All
          </RouterLink>
        </Button>
      </div>
    </div>
  </div>
</template>
