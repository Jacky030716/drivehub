<script setup>
import HomePageSelect from "@/components/HomePageSelect.vue";
import HubLists from "@/components/HubLists.vue";
import { ref } from "vue";
import { FileText } from 'lucide-vue-next';

const searchQuery = ref("");
const selectedCategory = ref("reset");
const selectedSession = ref("reset");

const handleCategoryChange = (value) => {
  selectedCategory.value = value;
};

const handleSessionChange = (value) => {
  selectedSession.value = value;
};
</script>

<template>
  <div class="w-full mx-auto bg-gray-100 text-gray-800 font-sans p-0">
    <!-- Header -->
    <div class="bg-white shadow p-4 w-full">
      <h1 class="text-2xl font-semibold text-center">Welcome to <span
          class="font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500">DriveHub</span>
      </h1>
      <div class="mt-2">
        <div class="w-full relative">
          <i class="pi pi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input type="text" v-model="searchQuery" placeholder="Search in DriveHub"
            class="w-full p-2 pl-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
      </div>
      <div class="flex justify-center mt-3 space-x-2">
        <HomePageSelect buttonName="categories" v-model="selectedCategory" @update:modelValue="handleCategoryChange" />
        <HomePageSelect buttonName="sessions_semesters" v-model="selectedSession" @update:modelValue="handleSessionChange" />
      </div>
    </div>

    <!-- Suggested Files -->
    <div class="max-h-[440px] overflow-y-scroll">
      <h2 class="text-sm font-semibold text-gray-600 mb-2 mt-5 flex items-center px-4">
        <FileText class="w-4 h-4 mr-2"/>
        Suggested Hubs
      </h2>
      <div class="w-full px-4 overflow-y-auto">
        <HubLists :limit="3" 
          :showButton="true" 
          :query="searchQuery" 
          :selectedCategory="selectedCategory"
          :selectedSession="selectedSession" 
         />
      </div>
    </div>
  </div>
</template>