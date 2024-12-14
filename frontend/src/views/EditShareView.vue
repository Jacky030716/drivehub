<script setup>
import EditResourceForm from '@/components/EditResourceForm.vue';
import { useGetCategories } from '@/features/category/use-get-categories';
import { useGetHubs } from '@/features/hubs/api/use-get-hubs';
import { useGetLink } from '@/features/links/api/use-get-link';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const route = useRoute()
const linkId = route.params.linkId

// Fetch hubs using Vue Query
const hubsQuery = useGetHubs();
const linkQuery = useGetLink(linkId)
const categoriesQuery = useGetCategories()

// Computed properties for reactivity
const isDisabled = computed(() => hubsQuery.isLoading.value || linkQuery.isLoading.value);
const hubs = computed(() => hubsQuery.data?.value?.data || []);
const link = computed(() => linkQuery.data?.value?.data || {});
const categories = computed(() => categoriesQuery.data?.value?.data || []);

</script>

<template>
  <div class="w-full h-full overflow-y-auto">
    <div v-if="isDisabled" class="min-h-screen w-full flex justify-center items-center">
      <PulseLoader />
    </div>

    <div v-else class="mx-auto justify-center items-center flex flex-col py-12 px-8 gap-8">
      <div class="flex flex-col items-center text-center space-y-4">
        <img src="../assets/drive.jpg" alt="Drive Logo" width="60" />
        <div>
          <h2 class="text-2xl font-bold">Edit Link</h2>
          <p class="text-muted-foreground leading-tight text-base">Organize, categorize and upload the link by simply
            fill and click</p>
        </div>
      </div>
      <!-- Resource Form -->
      <EditResourceForm :hubs="hubs" :link="link" :categories="categories" />
    </div>
  </div>
</template>