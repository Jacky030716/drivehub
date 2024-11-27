<script setup>
  import RecentFiles from './RecentFiles.vue';
  import LinkList from './LinkList.vue';

  import axios from 'axios';
  import { reactive, onMounted, ref } from 'vue';
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

  const state = reactive({
    files: [],
    isLoading: true
  });

  const myFiles = ref([]);

  onMounted(async () => {
    try{
      state.files = (await axios({
        url: '/api/hubs'
      })).data;

      const allFiles = [...state.files];

      const sharedFiles = allFiles.filter(item => item.categoryCreator.includes('Mohd Razak')).flatMap(item => item.links)
      myFiles.value = sharedFiles;

    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      state.isLoading = false;
    }
  })
</script>

<template>
  <div class="w-full flex flex-col gap-6 items-start">
    <!-- Recent Files Section -->
    <div class="w-full flex flex-col items-start gap-2.5">
      <h3 class="font-semibold">Recent Shared Files</h3>
      <div class="w-full flex flex-wrap gap-4">
        <RecentFiles 
          :files="myFiles"
        />
      </div>
    </div>

    <!-- All Files Section -->
    <div class="w-full space-y-2">
      <h3 class="font-semibold">All Files</h3>
      <div class="w-full flex flex-col gap-2">
        <LinkList 
          v-for="link in myFiles" 
          :key="link.id" 
          :link="link" 
        />
      </div>
    </div>
  </div>
</template>