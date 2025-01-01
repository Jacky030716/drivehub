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
import NotFound from "@/components/NotFound.vue";
import { useGetHubs } from "@/features/hubs/api/use-get-hubs";

// Fetch the data
const categoriesQuery = useGetCategories();
const linksQuery = useGetLinks();
const hubsQuery = useGetHubs();

// Computed properties for reactivity
const isDisabled = computed(() => categoriesQuery.isLoading.value || linksQuery.isLoading.value || hubsQuery.isLoading.value);
const links = computed(() => linksQuery.data?.value?.data || []);
const hubs = computed(() => hubsQuery.data?.value?.data || []);

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

  <div v-else class="sec-container font-sans px-0 pt-0 gap-2">
    <!-- Header -->
    <div class="bg-white shadow py-6 w-full flex-shrink-0 h-fit">
      <h1 class="text-2xl font-semibold text-center">
        Welcome to
        <span class="font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500">
          DriveHub
        </span>
      </h1>
      <!-- Recent Files Section -->
      <div v-if="links.length > 0" class="w-full flex flex-col items-start gap-2.5">
        <h3 class="font-semibold px-4">Recent Shared Links</h3>
        <div class="w-full h-[160px] overflow-y-auto">
          <div class="px-4 grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 ">
            <RecentFiles :links="links" />
          </div>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="h-[calc(100vh-180px)] overflow-y-auto">
      <!-- Links details -->
      <div class="w-full grid grid-cols-3 gap-4 p-4 bg-white">
        <div class="rounded-md flex flex-col gap-4">
          <h4 class="text-xl font-semibold">Quick Links</h4>
          <div class="flex gap-3 flex-col flex-1 w-full justify-between">
            <RouterLink to="/share"
              class="flex flex-col items-center justify-center text-center h-auto border rounded-xl shadow-md p-4 flex-1 gap-2.5 hover:bg-slate-100 ease-in-out">
              <img src="../assets/share.png" alt="Share icon" class="w-14" />
              <h3 class="font-semibold">Share a link</h3>
            </RouterLink>
            <RouterLink to="/shared"
              class="flex flex-col items-center justify-center text-center h-auto border rounded-xl shadow-md p-4 flex-1 gap-2.5 hover:bg-slate-100 ease-in-out">
              <img src="../assets/link.png" alt="Share icon" class="w-14" />
              <h3 class="font-semibold">Views all links</h3>
            </RouterLink>
            <RouterLink to="/group"
              class="flex flex-col items-center justify-center text-center h-auto border rounded-xl shadow-md p-4 flex-1 gap-2.5 hover:bg-slate-100 ease-in-out">
              <img src="../assets/hubs.png" alt="Share icon" class="w-14" />
              <h3 class="font-semibold">View all groups</h3>
            </RouterLink>
          </div>
        </div>

        <div class="col-span-2 w-full flex flex-col gap-4">
          <h4 class="text-xl font-semibold">Sharing Details</h4>
          <!-- Links details -->
           <div class="w-full flex-1 flex gap-4">
            <div
              class="w-full h-full flex flex-col justify-center border shadow-md items-center gap-3.5 bg-white rounded-xl px-2 py-4">
              <img src="../assets/google-drive.png" alt="Share Icon" class="w-16 h-auto">
              <p class="w-[200px] text-center">You had shared <span class="font-bold text-primary">{{ links.length
                  }}</span> link(s) using DriveHub</p>
            </div>
            <div
              class="w-full h-full flex flex-col justify-center border shadow-md  items-center gap-3.5 bg-white rounded-xl px-2 py-4">
              <img src="../assets/folder.png" alt="Share Icon" class="w-16 h-auto">
              <p class="w-[200px] text-center">You had joined <span class="font-bold text-primary">{{ hubs.length
                  }}</span> group(s) using DriveHub</p>
            </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>
