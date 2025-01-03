<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { columns } from '@/features/category/components/column';
import DataTable from '@/features/category/components/DataTable.vue';
import { useGetLinks } from '@/features/links/api/use-get-links';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const linksQuery = useGetLinks();

const isDisabled = computed(() => linksQuery.isLoading.value);
const links = computed(() => linksQuery.data.value?.data || []);

const data = ref([]);

// Update data reactively when links change
watch(links, (newLinks) => {
  data.value = newLinks.map(link => ({
    email: link.email,
    category: link.category,
    url: link.url,
    ref_name: link.ref_name,
  }));
});

// Ensure data is refetched on mount if not already present
onMounted(() => {
  if (!linksQuery.data.value) {
    linksQuery.refetch();
  }
});
</script>

<template>
  <div v-if="isDisabled" class="min-h-screen w-full flex justify-center items-center">
    <PulseLoader color="#882C4C" />
  </div>
  <section v-else class="sec-container overflow-y-auto">
    <DataTable :columns="columns" :data="data" />
  </section>
</template>