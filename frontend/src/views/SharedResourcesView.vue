<script setup>
 import SharedResourceList from '@/components/SharedResourceList.vue';
import { useGetCategoriesByUser } from '@/features/category/use-get-categories-by-user';
import { useGetLinks } from '@/features/links/api/use-get-links';
import { computed, onMounted, watch } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

 // Fetch links using Vue Query
const linksQuery = useGetLinks();
const categoriesQuery = useGetCategoriesByUser();

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
  <div v-if="isDisabled" class="min-h-screen w-full flex justify-center items-center">
    <PulseLoader
     color="#882C4C"/>
  </div>

  <section v-else class="sec-container px-0">
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold text-center">Shared Links List</h1>
      <p class="text-muted-foreground leading-tight text-sm">Here are the list of links that you have in DriveHub</p>
    </div>
    <div class="w-full h-full pb-20">
      <SharedResourceList 
        :links="links"
        :categories="categories"
      />
    </div>
  </section>
</template>