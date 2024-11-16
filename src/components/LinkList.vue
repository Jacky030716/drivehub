<script setup>
import { computed, reactive, onMounted, ref } from 'vue';
import { Calendar, Folder, Mail, FileText, ChevronRight } from 'lucide-vue-next';
import axios from 'axios';

// predefined color template
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
const state = reactive({
  resources: [],
  isLoading: true
});

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

onMounted(async() => {
  try {
    state.resources = (await axios({
      // url: "http://localhost:8000/resources",
      url: "/api/resources",
    })).data;

    const uniqueCategories = [...new Set(state.resources.map(item => item.category))];
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

const truncateText = (text, limit = 80) => {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + '...';
}

const getCategoryColor = (category) => {
  return categoryColorMap.value.get(category) || 'text-gray-500';
}
</script>

<template>
  <div class="mt-4 p-2 w-full max-w-7xl mx-auto">
    <!-- Loading state -->
    <div v-if="state.isLoading" class="text-center py-4">
      Loading...
    </div>

    <!-- Content -->
    <template v-else>
      <h2 class="text-sm font-semibold text-gray-600 mb-2 flex items-center">
        <FileText class="w-4 h-4 mr-2" />
        Suggested Links
      </h2>

      <!-- Link List Items -->
      <div 
        v-for="resource in state.resources" 
        :key="resource.name"
        class="bg-white p-4 mb-2 rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer hover:bg-gray-300"
      >
        <div class="flex-1">
          <!-- Title with icon based on category -->
          <div class="flex items-center mb-2">
            <Folder :class="[getCategoryColor(resource.category), 'w-4 h-4 mr-2']" />
            <p class="text-sm font-semibold">{{ resource.name }}</p>
          </div>
          
          <!-- Details section -->
          <div class="space-y-1">
            <!-- Category -->
            <div class="flex items-center text-xs text-gray-500">
              <ChevronRight class="w-3 h-3 mr-1" />
              <span>{{ resource.category }}</span>
            </div>
            
            <!-- Session/Semester -->
            <div class="flex items-center text-xs text-gray-500">
              <Calendar class="w-3 h-3 mr-1" />
              <span>{{ resource.session_semester }}</span>
            </div>
            
            <!-- Description -->
            <p class="text-xs text-gray-600 mt-1">
              {{ truncateText(resource.description) }}
            </p>
            
            <!-- Email -->
            <div class="flex items-center text-xs text-gray-500">
              <Mail class="w-3 h-3 mr-1" />
              <span>{{ resource.email }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- View More Link -->
      <div class="text-center mt-4">
        <a href="#" class="text-blue-500 text-sm hover:text-blue-600 transition-colors duration-200 flex items-center justify-center">
          <span>View more</span>
          <ChevronRight class="w-4 h-4 ml-1" />
        </a>
      </div>
    </template>
  </div>
</template>

<style scoped>
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.cursor-pointer:hover .text-sm {
  color: #4F46E5;
}
</style>