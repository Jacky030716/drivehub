<script setup>
import { computed } from 'vue';
import { Calendar, Folder, Mail, FileText, ChevronRight } from 'lucide-vue-next';

// Sample data - replace this with your actual data
const links = [
  {
    name: "Knowledge Representation Introduction",
    category: "Artificial Intelligence",
    session_semester: "2023/2024-1",
    description: "This comprehensive guide covers the fundamental concepts of knowledge representation in AI, including semantic networks, frames, and logic-based representations. The material explores how machines can effectively store and manipulate information for reasoning tasks...",
    email: "ai.lecturer@university.edu"
  },
  {
    name: "AJAX Tutorial",
    category: "Web Development",
    session_semester: "2023/2024-2",
    description: "A complete guide to Asynchronous JavaScript and XML, covering modern approaches to building interactive web applications with practical examples and best practices...",
    email: "webdevvv.staff@university.edu"
  }
];

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
  <div class="mt-4 p-2 w-full">
    <h2 class="text-sm font-semibold text-gray-600 mb-2 flex items-center">
      <FileText class="w-4 h-4 mr-2" />
      Suggested Links
    </h2>
    <!-- Link List Items -->
    <div 
      v-for="link in links" 
      :key="link.name"
      class="bg-white p-4 mb-2 rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
    >
      <div class="flex-1">
        <!-- Title with icon based on category -->
        <div class="flex items-center mb-2">
          <Folder :class="[getCategoryColor(link.category), 'w-4 h-4 mr-2']" />
          <p class="text-sm font-semibold">{{ link.name }}</p>
        </div>
        <!-- Details section -->
        <div class="space-y-1">
          <!-- Category -->
          <div class="flex items-center text-xs text-gray-500">
            <ChevronRight class="w-3 h-3 mr-1" />
            <span>{{ link.category }}</span>
          </div>
          <!-- Session/Semester -->
          <div class="flex items-center text-xs text-gray-500">
            <Calendar class="w-3 h-3 mr-1" />
            <span>{{ link.session_semester }}</span>
          </div>
          <!-- Description -->
          <p class="text-xs text-gray-600 mt-1">
            {{ truncateText(link.description) }}
          </p>
          <!-- Email -->
          <div class="flex items-center text-xs text-gray-500">
            <Mail class="w-3 h-3 mr-1" />
            <span>{{ link.email }}</span>
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