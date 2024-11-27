<script setup>
import { reactive, onMounted, ref, computed, watchEffect } from 'vue';
import HubList from './HubList.vue';
import { ChevronRight } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import PulseLoader from "vue-spinner/src/PulseLoader.vue"

import { shuffleArray } from '@/lib/utils';
import { colorPalette } from '@/constant';
import { useFetchData } from '@/hooks/useFetchData';

const props = defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false
  },
  query: {
    type: String,
    default: ""
  },
  selectedCategory: {
    type: String,
    default: "reset"
  },
  selectedSession: {
    type: String,
    default: "reset"
  }
});

const categoryColorMap = ref(new Map());
const { data, isLoading, error } = useFetchData('/api/hubs');

// Watch for changes in the fetched data and update state accordingly
watchEffect(() => {
  if (data.value) {
    // Normalize the data, combine the session and semester
    const normalizedHubs = data.value.map(hub => ({
      ...hub,
      categoryCreatedSessem: `${hub.categoryCreatedSession}-${hub.categoryCreatedSemester}`
    }));

    // Set up category colors
    const uniqueCategories = [...new Set(normalizedHubs.map(item => item.categoryName))];
    const shuffledColors = shuffleArray([...colorPalette]);

    uniqueCategories.forEach((category, index) => {
      const colorIndex = index % shuffledColors.length;
      categoryColorMap.value.set(category, shuffledColors[colorIndex]);
    });

    // Update the data
    data.value = normalizedHubs;
  }
});

const getCategoryColor = (category) => {
  return categoryColorMap.value.get(category) || 'text-gray-500';
};

// Computed property to filter hubs based on query
const filteredHubs = computed(() => {
  if (!data.value) return [];
  if (!props.query && props.selectedCategory === "reset" && props.selectedSession === "reset") 
    return data.value;

  // Filter by search query
  const searchTerm = props.query.toLowerCase().trim();

  // Filter by selected category
  const selectedCategory = props.selectedCategory === "reset" ? "" : props.selectedCategory.toLowerCase().trim();

  // Filter by selected session
  const selectedSession = props.selectedSession === "reset" ? "" : props.selectedSession.toLowerCase().trim();

  // Filter by all three conditions
  return data.value.filter(hub => 
    hub.categoryName.toLowerCase().includes(selectedCategory) &&
    hub.categoryCreatedSessem.toLowerCase().includes(selectedSession) && 
    hub.categoryName.toLowerCase().includes(searchTerm)
  );
});
</script>

<template>
  <div class="mt-4 p-2 w-full">
    <!-- Loading state -->
    <div v-if="isLoading" class="text-center py-4">
      <PulseLoader />
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-4 text-red-500">
      Failed to load hubs. Please try again later.
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Link List Items -->
      <HubList 
        v-for="hub in filteredHubs" 
        :key="hub.id"
        :hub="hub" 
        :categoryColor="getCategoryColor(hub.categoryName)" 
      />

      <!-- View More Link -->
      <div v-if="showButton" class="text-center mt-4">
        <RouterLink 
          to="/hub"
          class="text-blue-500 text-sm hover:text-blue-600 hover:underline transition-colors duration-200 flex items-center justify-center"
        >
          <span>View more</span>
          <ChevronRight class="w-4 h-4 ml-1" />
        </RouterLink>
      </div>
    </template>
  </div>
</template>