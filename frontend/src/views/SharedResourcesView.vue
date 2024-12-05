<script setup>
 import SharedResourceList from '@/components/SharedResourceList.vue';
import { useGetCategories } from '@/features/category/use-get-categories';
import { useGetLinks } from '@/features/links/api/use-get-links';
import { computed, onMounted, watch } from 'vue';

 // Fetch links using Vue Query
const linksQuery = useGetLinks();
const categoriesQuery = useGetCategories();

// Computed properties for reactivity
const isDisabled = computed(() => linksQuery.isLoading.value || categoriesQuery.isLoading.value);
const categories = computed(() => categoriesQuery.data?.value?.data || []);
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

  <section v-else class="sec-container">
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold text-center">Shared Resources Lists</h1>
      <p class="text-muted-foreground leading-tight text-sm">Here are the list of resources that you've shared with others before</p>
    </div>
    <div class="w-full h-full pb-20">
      <SharedResourceList 
        :links="links"
        :categories="categories"
      />
    </div>
  </section>
</template>