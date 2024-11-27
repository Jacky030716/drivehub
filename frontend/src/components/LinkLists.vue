<script setup>
import { reactive, onMounted, ref, defineProps } from 'vue';
import axios from 'axios';
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import LinkList from './LinkList.vue';
import { generateCategoryColorMap } from '@/lib/colorUtils';

const props = defineProps({
  categoryId: String
});

const state = reactive({
  links: [],
  isLoading: true
});

const categoryColorMap = ref(null);
const result = ref(null);

onMounted(async () => {
  try {
    // Fetch links
    state.links = (await axios({
      url: "/api/hubs",
    })).data;
    
    // Generate a color map for categories
    categoryColorMap.value = generateCategoryColorMap(state.links);

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
