<script setup>
import { reactive, onMounted, ref, defineProps } from 'vue';
import axios from 'axios';
import PulseLoader from "vue-spinner/src/PulseLoader.vue"
import LinkList from './LinkList.vue';

const props = defineProps({
  categoryId: String
})

const state = reactive({
  links: [],
  isLoading: true
});

// Color mapping logic
const colorPalette = [
  'text-blue-500',
  'text-purple-500',
  'text-green-500',
  'text-red-500',
  'text-yellow-500',
  'text-indigo-500',
  'text-pink-500',
  'text-teal-500',
  'text-orange-500',
  'text-cyan-500'
];

const categoryColorMap = ref(new Map());

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const result = ref(null);

onMounted(async () => {
  try {
    state.links = (await axios({
      url: "/api/hubs",
    })).data;
    
    // Find the category that matches the categoryId
    const foundCategory = state.links.find(item => item.categoryId === props.categoryId);
    if (foundCategory) {
      result.value = foundCategory;
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <div class="mt-4 p-2 w-full">
    <!-- Loading state -->
    <div v-if="state.isLoading" class="text-center py-4">
      <PulseLoader />
    </div>
    
    <!-- Content -->
    <div v-else-if="result">
      <!-- Link List Items -->
      <LinkList 
        v-for="link in result.links" 
        :key="link.id" 
        :link="link" 
      />
    </div>
  </div>
</template>