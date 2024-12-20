<script setup>
import LinkLists from '@/components/LinkLists.vue';
import { reactive, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useGetHub } from '@/features/hubs/api/use-get-hub';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import NotFound from '@/components/NotFound.vue';

const route = useRoute();

const state = reactive({
  hub: {},
  isLoading: true,
});

const groupId = computed(() => route.params.groupId);

const hubQuery = useGetHub(groupId.value);

// Computed properties for reactivity
const isDisabled = computed(() => hubQuery.isLoading.value);
const hub = computed(() => hubQuery.data?.value?.data || {});

onMounted(() => {
  if (!hubQuery.data.value) {
    hubQuery.refetch();
  }
});

watch(groupId, (newGroupId) => {
  state.isLoading = true;
  hubQuery.refetch({ queryKey: ["group", newGroupId] }).finally(() => {
    state.isLoading = false;
  });
});

watch(() => hubQuery.data, (newData) => {
  if (newData) {
    state.hub = newData.data;
  }
});
</script>

<template>
  <!-- Loading state -->
  <div v-if="isDisabled" class="min-h-screen w-full flex justify-center items-center">
    <PulseLoader color="#882C4C"/>
  </div>
  <section v-else-if="hub.links.length === 0" class="sec-container">
    <NotFound 
      message="No link found for this hub!" 
      redirectUrl="/share"
      buttonText="Share a link"
    />
  </section>
  <section v-else class="bg-gray-100 shadow p-4 w-full flex flex-col">
    <h1 class="text-lg font-semibold text-center">{{ hub.name }} Lists</h1>
    <div class="mt-2 max-h-[580px] overflow-y-auto">
      <LinkLists :links="hub.links" :isLoading="isDisabled" />
    </div>
  </section>
</template>