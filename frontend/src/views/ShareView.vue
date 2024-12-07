<script setup>
import ResourceForm from '@/components/ResourceForm.vue';
import { useGetCategories } from '@/features/category/use-get-categories';
import { useGetHubs } from '@/features/hubs/api/use-get-hubs';
import { computed } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

// Fetch hubs using Vue Query
const hubsQuery = useGetHubs();
const categoriesQuery = useGetCategories()

// Computed properties for reactivity
const isDisabled = computed(() => hubsQuery.isLoading.value || categoriesQuery.isLoading.value);
const hubs = computed(() => hubsQuery.data?.value?.data || []);
const categories = computed(() => categoriesQuery.data?.value?.data || []);

</script>

<template>
  <div class="w-full h-full overflow-y-auto">
    <div v-if="isDisabled" class="min-h-screen w-full flex justify-center items-center">
    <PulseLoader color="#882C4C"/>
  </div>

    <div v-else class="mx-auto justify-center items-center flex flex-col px-8 py-12 gap-8">
      <div class="flex flex-col items-center text-center space-y-4 ">
        <img src="../assets/drive.jpg" alt="Drive Logo" class="w-16" />
        <div>
          <h2 class="text-2xl font-bold">Upload Link</h2>
          <p class="text-muted-foreground leading-tight text-base">Organize, categorize and upload the link by simply
            fill and click</p>
        </div>
      </div>
      <!-- Resource Form -->
      <ResourceForm :hubs="hubs" :categories="categories" />
    </div>
  </div>
</template>