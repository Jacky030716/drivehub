<script setup>
import RecentFiles from './RecentFiles.vue';
import LinkList from './LinkList.vue';

import { computed, onMounted, ref, watch } from 'vue';
import { useGetLinks } from '@/features/links/api/use-get-links';

// Fetch links using Vue Query
const linksQuery = useGetLinks();

// Computed properties for reactivity
const isDisabled = computed(() => linksQuery.isLoading.value);
const links = computed(() => linksQuery.data?.value?.data || []);

// Ensure data is refetched on mount if not already present
onMounted(() => {
  if (!linksQuery.data) {
    linksQuery.refetch();
  }
});

// Watch for changes in linksQuery.data and update links accordingly
watch(() => linksQuery.data, (newData) => {
  if (newData) {
    links.value = newData.data;
  }
});
</script>


<template>
  <div>
    <!-- Loading State -->
    <div v-if="isDisabled">
      {{ links }}
    </div>

    <!-- Data Render -->
    <div v-else class="w-full flex flex-col gap-6 items-start">
      <!-- Recent Files Section -->
      <div class="w-full flex flex-col items-start gap-2.5">
        <h3 class="font-semibold">Recent Shared Files</h3>
        <div class="w-full flex flex-wrap gap-4">
          <RecentFiles :files="links" />
        </div>
      </div>

      <!-- All Files Section -->
      <div class="w-full space-y-2">
        <h3 class="font-semibold">All Files</h3>
        <div class="w-full flex flex-col gap-2">
          <LinkList 
            v-for="link in links" 
            :key="link.id" 
            :link="link" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

