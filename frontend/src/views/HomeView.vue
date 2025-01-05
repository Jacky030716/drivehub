<script setup>
import { computed, onMounted } from "vue";
import { useGetCategories } from "@/features/category/use-get-categories";
import { useGetLinks } from "@/features/links/api/use-get-links";
import { RouterLink, useRouter } from "vue-router";
import RecentFiles from "@/components/RecentFiles.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { useGetHubs } from "@/features/hubs/api/use-get-hubs";
import { getCategoryImage } from "@/lib/utils";

// Fetch the data
const categoriesQuery = useGetCategories();
const linksQuery = useGetLinks();

// Router
const router = useRouter();

// Computed properties for reactivity
const isDisabled = computed(() => categoriesQuery.isLoading.value || linksQuery.isLoading.value);
const links = computed(() => linksQuery.data?.value?.data || []);
const categories = computed(() => categoriesQuery.data?.value || []);

// Group links by category in object
const groupedLinks = computed(() => {
  const grouped = {};
  links.value.forEach((link) => {
    if (!grouped[link.category]) {
      grouped[link.category] = [];
    }
    grouped[link.category].push(link);
  });
  return grouped;
});

const handleNavigation = (categoryName) => {
  router.push({ name: "Shared Links", query: { category: categoryName } });
};

onMounted(() => {
  if (!categoriesQuery.data) {
    categoriesQuery.refetch();
  }
});
</script>

<template>
  <div v-if="isDisabled" class="min-h-screen w-full flex justify-center items-center">
    <PulseLoader color="#882C4C" />
  </div>

  <div v-else class="sec-container font-sans px-0 py-0 gap-2">
    <!-- Header -->
    <div class="bg-white shadow py-6 w-full flex-shrink-0 space-y-6 h-fit">
      <h1 class="text-2xl font-semibold text-center">
        Welcome to
        <span class="font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500">
          DriveHub
        </span>
      </h1>
      <!-- Recent Files Section -->
      <div v-if="links.length > 0" class="w-full flex flex-col items-start gap-2.5">
        <h3 class="font-semibold px-4 text-xl">Recent Shared Links</h3>
        <div class="w-full h-[160px] overflow-y-auto">
          <div class="px-4 grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 ">
            <RecentFiles :links="links" />
          </div>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="h-[calc(100vh-180px)] flex flex-col overflow-y-auto">
      <!-- Links details -->
      <div class="w-full flex-1 grid md:grid-cols-3 grid-cols-1 gap-8 p-4 bg-white">
        <div class="w-full rounded-md flex flex-col gap-4">
          <h4 class="text-xl font-semibold">Quick Links</h4>
          <div class="flex gap-3 md:flex-col flex-row flex-1 w-full justify-between">
            <RouterLink to="/share"
              class="flex flex-col items-center justify-center text-center h-auto border rounded-xl shadow-md p-4 flex-1 gap-2.5 hover:bg-slate-100 ease-in-out">
              <img src="../assets/share.png" alt="Share icon" class="md:w-14 w-10" />
              <h3 class="font-semibold md:text-base text-sm">Share a link</h3>
            </RouterLink>
            <RouterLink to="/shared"
              class="flex flex-col items-center justify-center text-center h-auto border rounded-xl shadow-md p-4 flex-1 gap-2.5 hover:bg-slate-100 ease-in-out">
              <img src="../assets/link.png" alt="Share icon" class="md:w-14 w-10" />
              <h3 class="font-semibold md:text-base text-sm">Views all links</h3>
            </RouterLink>
            <RouterLink to="/group"
              class="flex flex-col items-center justify-center text-center h-auto border rounded-xl shadow-md p-4 flex-1 gap-2.5 hover:bg-slate-100 ease-in-out">
              <img src="../assets/hubs.png" alt="Share icon" class="md:w-14 w-10" />
              <h3 class="font-semibold md:text-base text-sm">View all groups</h3>
            </RouterLink>
          </div>
        </div>         

        <div class="md:col-span-2 w-full flex flex-col gap-4">
          <div class="w-full space-y-4">
            <h4 class="text-xl font-semibold">Links Sharing Overview</h4>
            <div 
              class="w-full grid xl:grid-cols-3 grid-cols-2 auto-rows-auto gap-4"
            
            >
              <div 
                v-for="category in categories.data" 
                :key="category.id"
                class="w-full flex items-center gap-4 border rounded-md p-4  cursor-pointer hover:bg-gray-100"
                @click="handleNavigation(category.name)"
              >
                <img 
                  :src="getCategoryImage(category.name)"
                  :alt="category.name"
                  class="w-[40px] h-[40px] object-cover"
                />
                <div>
                  <h5 class="font-semibold md:text-base text-sm">{{category.name}}</h5>
                  <p class="md:text-sm text-xs text-gray-400">Total links: {{ groupedLinks[category.name]?.length || 0 }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
