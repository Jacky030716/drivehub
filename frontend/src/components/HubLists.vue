<script setup>
import { reactive, onMounted, ref, computed, watch } from 'vue';
import HubList from './HubList.vue';
import { ChevronRight } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import PulseLoader from "vue-spinner/src/PulseLoader.vue"

import { shuffleArray } from '@/lib/utils';
import { colorPalette } from '@/constant';
import { useGetHubs } from '@/features/hubs/api/use-get-hubs';
import { useHubForm } from '@/hooks/useHubForm';
import HubForm from './HubForm.vue';

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

// Hooks to open the dialog
const { open } = useHubForm()

// Fetch hubs using Vue Query
const hubsQuery = useGetHubs();

// Computed properties for reactivity
const isDisabled = computed(() => hubsQuery.isLoading.value);
const hubs = computed(() => hubsQuery.data?.value?.data || []);

// Ensure data is refetched on mount if not already present
onMounted(() => {
  if (!hubsQuery.data.value) {
    hubsQuery.refetch();
  }
});

// Watch for changes in hubsQuery.data and update hubs accordingly
watch(() => hubsQuery.data, (newData) => {
  if (newData) {
    hubs.value = newData.data;
    setupCategoryColors(newData.data);
  }
});

// Set up category colors
const categoryColorMap = ref(new Map());

const setupCategoryColors = (hubs) => {
  const uniqueCategories = [...new Set(hubs.map(item => item.categoryName))];
  const shuffledColors = shuffleArray([...colorPalette]);

  uniqueCategories.forEach((category, index) => {
    const colorIndex = index % shuffledColors.length;
    categoryColorMap.value.set(category, shuffledColors[colorIndex]);
  });
};

const getCategoryColor = (category) => {
  return categoryColorMap.value.get(category) || 'text-gray-500';
};

// Computed property to filter hubs based on query
const filteredHubs = computed(() => {
  if (!hubs.value) return [];
  if (!props.query && props.selectedCategory === "reset" && props.selectedSession === "reset") 
    return hubs.value;

  // Filter by search query
  const searchTerm = props.query.toLowerCase().trim();

  // Filter by selected category
  const selectedCategory = props.selectedCategory === "reset" ? "" : props.selectedCategory.toLowerCase().trim();

  // Filter by selected session
  const selectedSession = props.selectedSession === "reset" ? "" : props.selectedSession.toLowerCase().trim();

  // Filter by all three conditions
  return hubs.value.filter(hub => 
    hub.categoryName.toLowerCase().includes(selectedCategory) &&
    hub.categoryCreatedSessem.toLowerCase().includes(selectedSession) && 
    hub.categoryName.toLowerCase().includes(searchTerm)
  );
});
</script>

<template>
  <div class="mt-4 p-2 w-full">
    <!-- Loading state -->
    <div v-if="isDisabled" class="text-center py-4">
      <PulseLoader />
    </div>

    <!-- Error state -->
    <!-- <div v-else-if="error" class="text-center py-4 text-red-500">
      Failed to load hubs. Please try again later.
    </div> -->

    <!-- Content -->
    <template v-else>
      <!-- Link List Items -->
      <HubList 
        v-for="hub in filteredHubs" 
        :key="hub.id"
        :hub="hub" 
        :categoryColor="getCategoryColor(hub.categoryName)" 
      />

      <HubForm />

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