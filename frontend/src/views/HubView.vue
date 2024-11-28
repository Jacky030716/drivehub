<script setup>
import LinkLists from '@/components/LinkLists.vue';
import { reactive, onMounted, watch, computed } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import { useGetHub } from '@/features/hubs/api/use-get-hub';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const route = useRoute()

const hubId = route.params.hubId

const state = reactive({
  hub: {},
  isLoading: true
})

const hubQuery = useGetHub(hubId);

// Computed properties for reactivity
const isDisabled = computed(() => hubQuery.isLoading.value);
const hub = computed(() => hubQuery.data?.value?.data || []);

let categoryName = ""

onMounted(async () => {
    if (!hubQuery.data.value) {
      hubQuery.refetch();
    }
});

watch(() => hubQuery.data, (newData) => {
  if (newData) {
    hub.value = newData.data;
  }
});


</script>
<template>
  <!-- Loading state -->
  <div v-if="isDisabled" class="text-center py-4">
    <PulseLoader />
  </div>
  <div v-else class="bg-gray-100 shadow p-4 w-full flex flex-col ">
    <h1 class="text-lg font-semibold text-center">{{ categoryName }} Lists</h1>
    <div class="mt-2 max-h-[580px] overflow-y-auto">
      <LinkLists :hub="hub" :isLoading="isDisabled"/>
    </div>
  </div>
</template>