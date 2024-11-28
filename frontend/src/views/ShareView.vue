<script setup>
import ResourceForm from '@/components/ResourceForm.vue';
import { useGetHubs } from '@/features/hubs/api/use-get-hubs';
import { computed } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

// Fetch hubs using Vue Query
const hubsQuery = useGetHubs();

// Computed properties for reactivity
const isDisabled = computed(() => hubsQuery.isLoading.value);
const hubs = computed(() => hubsQuery.data?.value?.data || []);

</script>

<template>
  <div v-if="isDisabled" class="min-h-screen w-full flex justify-center items-center">
    <PulseLoader />
  </div>

  <div v-else class="max-w-7xl mx-auto justify-center items-center flex flex-col py-12 px-8 gap-8">
    <div class="w-full flex flex-col items-center text-center space-y-4">
        <img src="../assets/drive.jpg" alt="Drive Logo" width="60"/>
        <div>
            <h2 class="text-2xl font-bold">Upload Link</h2>
            <p class="text-muted-foreground leading-tight text-base">Organize, categorize and upload the link by simply fill and click</p>
        </div>
    </div>
    <!-- Resource Form -->
    <ResourceForm 
      :hubs="hubs"
    />
  </div>
</template>