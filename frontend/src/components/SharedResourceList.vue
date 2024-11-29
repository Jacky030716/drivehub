<script setup>
import RecentFiles from './RecentFiles.vue';
import LinkList from './LinkList.vue';

const props = defineProps({
  links: {
    type: Array,
    required: true,
  },
});
</script>


<template>
  <!-- Data Render -->
  <div class="w-full flex flex-col gap-6 items-start">
    <!-- Recent Files Section -->
    <div class="w-full flex flex-col items-start gap-2.5">
      <h3 class="font-semibold">Recent Shared Files</h3>
      <div class="w-full flex flex-wrap gap-4">
        <RecentFiles :files="links" />
      </div>
    </div>

    <!-- All Files Section -->
    <div class="w-full space-y-2">
      <h3 class="font-semibold">All Files</h3>
      <div class="w-full h-full flex flex-col gap-2">
        <LinkList v-for="link in links" :key="link.id" :link="link" />
      </div>
    </div>
  </div>
</template>
