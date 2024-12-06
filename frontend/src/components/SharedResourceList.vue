<script setup>
import RecentFiles from './RecentFiles.vue';
import LinkList from './LinkList.vue';
import HomePageSelect from './HomePageSelect.vue';
import { computed, ref } from 'vue';
import { semesterOptions, sessionOptions } from '@/constant/options';

const props = defineProps({
  links: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
});

const searchQuery = ref('');
const selectedSession = ref('reset');
const selectedSemester = ref('reset');
const selectedCategory = ref('reset');

const handleCategoryChange = (value) => {
  selectedCategory.value = value;
};

const handleSessionChange = (value) => {
  selectedSession.value = value;
};

const handleSemesterChange = (value) => {
  selectedSemester.value = value;
};

// Category Options
const categoryOptions = computed(() => {
  return props.categories.map((category) => {
    return {
      label: category.name,
      value: category.name,
    };
  });
});

// Filter the options
const filteredLinks = computed(() => {
  if (selectedCategory.value === "reset" && selectedSession.value === "reset" && selectedSemester.value === "reset" && searchQuery.value === "") {
    return props.links;
  }

  return props.links.filter((link) => {
    const matchesSession = selectedSession.value === "reset" || link.session.includes(selectedSession.value.trim());
    const matchesSemester = selectedSemester.value === "reset" || link.semester.includes(selectedSemester.value.trim());
    const matchesCategory = selectedCategory.value === "reset" || link.category.includes(selectedCategory.value.trim());
    const matchesSearchQuery = link.description.toLowerCase().includes(searchQuery.value.trim().toLowerCase());

    return matchesSession && matchesSemester && matchesCategory && matchesSearchQuery;
  });
});
</script>

<template>
  <!-- Data Render -->
  <div class="w-full h-full flex flex-col gap-6 items-start">
    <div class="p-4 w-full flex-shrink-0 h-fit ">
      <div>
        <div class="w-full relative">
          <i class="pi pi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search in DriveHub"
            class="w-full p-2 pl-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div class="flex justify-center mt-3 space-x-2">
        <HomePageSelect
          buttonName="category"
          :options="categoryOptions"
          v-model="selectedCategory"
          @update:modelValue="handleCategoryChange"
        />
        <HomePageSelect
          buttonName="session"
          :options="sessionOptions"
          v-model="selectedSession"
          @update:modelValue="handleSessionChange"
        />
        <HomePageSelect
          buttonName="semester"
          :options="semesterOptions"
          v-model="selectedSemester"
          @update:modelValue="handleSemesterChange"
        />
      </div>
    </div>

    <!-- All Files Section -->
    <div class="w-full space-y-2 overflow-y-auto">
      <h3 class="font-semibold">All Files</h3>
      <div class="w-full h-full flex flex-col gap-2">
        <LinkList v-for="link in filteredLinks" :key="link.id" :link="link" />
      </div>
    </div>
  </div>
</template>
