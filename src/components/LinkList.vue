<script setup>
import { computed, reactive, onMounted } from 'vue';
import { Calendar, Folder, Mail, FileText, ChevronRight } from 'lucide-vue-next';
import axios from 'axios'

const state = reactive({
    resources: [],
    isLoading: true
})
onMounted(async() => {
  try {
    state.resources = (await axios({
      url: "http://localhost:8000/resources",
    })).data

    log(state.resources)
  } catch (error) {
    console.log("Error fetching data ", error);
  } finally {
    state.isLoading = false;
  }
});

// Function to truncate description
const truncateText = (text, limit = 40) => {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + '...';
}

// Function to get appropriate icon color based on category
const getCategoryColor = (category) => {
  const colors = {
    'Artificial Intelligence': 'text-purple-500',
    'Web Development': 'text-blue-500',
    'default': 'text-gray-500'
  };
  return colors[category] || colors.default;
}
</script>

<template>
  <div class="mt-4 p-2 w-full max-w-sm mx-auto">
    <h2 class="text-sm font-semibold text-gray-600 mb-2 flex items-center">
      <FileText class="w-4 h-4 mr-2" />
      Suggested links
    </h2>
    <!-- resource List Items -->
    <div 
      v-for="resource in state.resources" 
      :key="resource.id"
      class="bg-white p-4 mb-2 rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
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
    <!-- View More resource -->
    <div class="text-center mt-4">
      <a href="#" class="text-blue-500 text-sm hover:text-blue-600 transition-colors duration-200 flex items-center justify-center">
        <span>View more</span>
        <ChevronRight class="w-4 h-4 ml-1" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Optional: Add hover effect for interactive elements */
.cursor-pointer:hover .text-sm {
  color: #4F46E5; /* indigo-600 */
}
</style>