<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { columns } from '@/features/category/components/column';
import DataTable from '@/features/category/components/DataTable.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useGetAllLinks } from '@/features/links/api/use-get-all-links';

const linksQuery = useGetAllLinks();

const isDisabled = computed(() => linksQuery.isLoading.value);
const links = computed(() => linksQuery.data.value || []);

// Ensure data is refetched on mount if not already present
onMounted(() => {
  if (!linksQuery.data.value && !linksQuery.isLoading.value) {
    linksQuery.refetch();
  }
});
</script>

<template>
  <div v-if="isDisabled" class="min-h-screen w-full flex justify-center items-center">
    <PulseLoader color="#882C4C" />
  </div>
  <section v-else class="sec-container overflow-y-auto">
    <DataTable :columns="columns" :data="links" />
  </section>
</template>