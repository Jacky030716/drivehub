<script setup>
import { reactive, onMounted, ref, computed, watch } from 'vue';
import HubList from './HubList.vue';
import { ChevronRight } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import PulseLoader from "vue-spinner/src/PulseLoader.vue"

import { shuffleArray } from '@/lib/utils';
import { colorPalette } from '@/constant';
import { useGetHubs } from '@/features/hubs/api/use-get-hubs';
import NotFound from './NotFound.vue';


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
  selectedSemester: {
    type: String,
    default: "reset"
  },
  selectedSession: {
    type: String,
    default: "reset"
  }
});

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
    return props.limit ? hubs.value.slice(0, props.limit) : hubs.value;

  // Filter by search query
  const searchTerm = props.query.toLowerCase().trim();

  // Filter by selected session
  const selectedSession = props.selectedSession === "reset" ? "" : props.selectedSession.toLowerCase().trim();

  // Filter by selected semester
  const selectedSemester = props.selectedSemester === "reset" ? "" : props.selectedSemester.toLowerCase().trim();

  // Filter by all three conditions
  const filtered = hubs.value.filter(hub =>
    //   hub.categoryName.toLowerCase().includes(selectedCategory) &&
    hub.session.includes(selectedSession) &&
    hub.semester.includes(selectedSemester) &&
    hub.name.toLowerCase().includes(searchTerm)
  );

  // Apply limit if passed
  return props.limit ? filtered.slice(0, props.limit) : filtered;

  // return props.limit ? hubs.value.slice(0, props.limit) : hubs.value;
});
</script>

<template>
  <div class="h-full w-full flex flex-col space-y-4">
    <!-- Loading State -->
    <div v-if="isDisabled" class="min-h-screen w-full flex justify-center items-center">
      <PulseLoader color="#882C4C" />
    </div>

    <div class="h-screen flex justify-center items-center overflow-hidden" v-else-if="hubs.length === 0">
      <NotFound message="No hub found for this hub!" />
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Hubs List -->
      <div class="grid grid-cols-1 lg:grid-cols-2 auto-rows-auto gap-3 overflow-y-auto">
        <HubList v-for="hub in filteredHubs" :key="hub.id" :hub="hub"
          :categoryColor="getCategoryColor(hub.categoryName)" />
      </div>

      <!-- View More Link -->
      <div v-if="showButton" class="text-center mt-6">
        <RouterLink to="/hub"
          class="inline-flex items-center justify-center text-blue-600 text-sm font-medium hover:text-blue-800 hover:underline transition-colors duration-200">
          <span>View More</span>
          <ChevronRight class="w-5 h-5 ml-1" />
        </RouterLink>
      </div>
    </template>
  </div>
</template>