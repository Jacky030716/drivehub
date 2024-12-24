<script setup>
import LinkLists from '@/components/LinkLists.vue';
import { reactive, onMounted, watch, computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useGetHub } from '@/features/hubs/api/use-get-hub';
import Button from "@/components/ui/button/Button.vue";
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
    <PulseLoader color="#882C4C" />
  </div>
  <section v-else-if="hub.links.length === 0" class="sec-container">
    <NotFound message="No link found for this group!" redirectUrl="/share" buttonText="Share a link" />
  </section>
  <section v-else class="bg-gray-100 shadow py-4 w-full h-full flex flex-col">
    <div class="flex flex-col items-center mt-4">
      <h1 class="text-2xl font-bold text-center">Shared Links in {{ hub.name }}</h1>
      <p class="text-muted-foreground leading-tight text-sm">Explore the collection of links shared by members of the {{
        hub.name }} group</p>
    </div>
    <div class="mt-2 h-full px-4 overflow-y-auto">
      <LinkLists :links="hub.links" :isLoading="isDisabled" />
      <Button class="flex justify-center mt-4 w-fit mx-auto">
        <RouterLink to="/share">
          Share a Link Now
        </RouterLink>
      </Button>
    </div>

  </section>
</template>