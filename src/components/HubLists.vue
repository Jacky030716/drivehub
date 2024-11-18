<script setup>
import { reactive, onMounted, ref, computed } from 'vue';
import { ChevronRight } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import PulseLoader from "vue-spinner/src/PulseLoader.vue"
import HubList from './HubList.vue';

const props = defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false
  },
  query: {
    type: String,
    default: ""
  }
})

const state = reactive({
  hubs: [],
  isLoading: true
});

// Color mapping logic moved here
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

onMounted(async () => {
  try {
    state.hubs = (await axios({
      url: "/api/hubs",
    })).data;

    // Set up category colors after loading hubs
    const uniqueCategories = [...new Set(state.hubs.map(item => item.categoryName))];
    const shuffledColors = shuffleArray([...colorPalette]);

    uniqueCategories.forEach((category, index) => {
      const colorIndex = index % shuffledColors.length;
      categoryColorMap.value.set(category, shuffledColors[colorIndex]);
    });
  } catch (error) {
    console.log("Error fetching data:", error);
  } finally {
    state.isLoading = false;
  }
});

const getCategoryColor = (category) => {
  return categoryColorMap.value.get(category) || 'text-gray-500';
}

// Computed property to filter hubs based on query
const filteredHubs = computed(() => {
  if (!props.query) return state.hubs;
  const searchTerm = props.query.toLowerCase().trim();
  return state.hubs.filter(hub => 
    hub.categoryName.toLowerCase().includes(searchTerm)
  );
});
</script>

<template>
  <div class="mt-4 p-2 w-full">
    <!-- Loading state -->
    <div v-if="state.isLoading" class="text-center py-4">
      <PulseLoader />
    </div>

    <!-- Content -->
    <template v-else>

      <!-- Link List Items -->
      <HubList v-for="hub in filteredHubs" :key="hub.id"
        :hub="hub" :categoryColor="getCategoryColor(hub.categoryName)" />

      <!-- View More Link -->
      <div v-if="showButton" class="text-center mt-4">
        <RouterLink to="/hub"
          class="text-blue-500 text-sm hover:text-blue-600 hover:underline transition-colors duration-200 flex items-center justify-center">
          <span>View more</span>
          <ChevronRight class="w-4 h-4 ml-1" />
        </RouterLink>
      </div>
    </template>
  </div>
</template>