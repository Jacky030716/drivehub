<script setup>
  import LinkLists from '@/components/LinkLists.vue';
  import { reactive, onMounted } from 'vue'
  import { useRoute, RouterLink, useRouter } from 'vue-router'
  import axios from 'axios'

  const route = useRoute()

  const categoryId = route.params.categoryId

  const state = reactive({
    hub: {},
    isLoading: true
  })


  let categoryName = ""

  onMounted(async () => {
  try {
    state.hub = (await axios({
      url: "/api/hubs",
    })).data;
    
    [state.hub] = state.hub.filter(item => item.categoryId === categoryId)
    categoryName = state.hub.categoryName
    
    
  } catch (error) {
    console.log("Error fetching data:", error);
  } finally {
    state.isLoading = false;
  }
});

</script>
<template>  
  <!-- Loading state -->
  <div v-if="state.isLoading" class="text-center py-4">
    <PulseLoader />
  </div>
  <div v-else class="bg-gray-100 shadow p-4 w-full flex flex-col ">
    <h1 class="text-lg font-semibold text-center">{{ categoryName }} Lists</h1>
    <div class="mt-2 max-h-[580px] overflow-y-auto">
      <LinkLists :categoryId="`${categoryId}`"/>
    </div>
  </div>
</template>