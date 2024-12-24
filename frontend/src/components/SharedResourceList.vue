<script setup>
import RecentFiles from './RecentFiles.vue';
import LinkList from './LinkList.vue';
import HomePageSelect from './HomePageSelect.vue';
import { computed, ref } from 'vue';
import { semesterOptions, sessionOptions } from '@/constant/options';
import NotFound from './NotFound.vue';

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
    const matchesSearchQuery = link.description.toLowerCase().includes(searchQuery.value.toLowerCase()) || link.ref_name.toLowerCase().includes(searchQuery.value.toLowerCase());

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
    <div class="h-full w-full space-y-2">
      <div class="w-full flex items-center justify-between px-6">
        <h3 class="font-semibold">All Links</h3>
        <span class="text-sm text-gray-800 font-medium">{{ filteredLinks.length }} link(s) found</span>
      </div>
      <div v-if="filteredLinks.length > 0" class="w-full h-full flex flex-col gap-2 px-4 overflow-y-auto shadow-t">
        <LinkList v-for="link in filteredLinks" :key="link.id" :link="link" />
      </div>

      <!-- Show no links found -->
      <div v-else class="flex-1 mx-auto h-full w-full flex justify-center items-center">
        <NotFound
          message="No link found in your page!"
          redirectUrl="/share"
          buttonText="Share a link"
        />
      </div>
    </div>
  </div>
</template>
<style>
.shadow-t {
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.04);
}
</style>