<script setup>
 import SharedResourceList from '@/components/SharedResourceList.vue';
import { useGetLinks } from '@/features/links/api/use-get-links';
import { computed, onMounted, watch } from 'vue';

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
  <div v-if="isDisabled">loading...</div>

  <div v-else class="bg-gray-100 shadow p-4 w-full flex flex-col items-center gap-6">
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold text-center">Shared Resources Lists</h1>
      <p class="text-muted-foreground leading-tight text-sm">Here are the list of resources that you've shared with others before</p>
    </div>
    <div class="w-full overflow-y-auto">
      <SharedResourceList 
        :links="links"
      />
    </div>
  </div>
</template>