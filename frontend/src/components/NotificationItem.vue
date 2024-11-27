<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: String,
  description: String,
  fileName: String,
  category: String
});

const emit = defineEmits(['action-click', 'mark-as-read']);

const onActionClick = () => {
  emit('action-click');
};

</script>

<template>
  <div
    class="flex justify-between items-center bg-white shadow-sm rounded-md p-4 hover:bg-gray-100 transition cursor-pointer" 
  >
    <div>
      <p class="text-sm text-gray-800 font-semibold">{{ title }}</p>
      <p class="text-xs text-gray-500 mt-1">{{ description }}</p>
      <div class="flex items-center text-xs text-blue-600 mt-2">
        <span class="mr-2">
          <i class="pi pi-file"></i>
        </span>
        <span class="font-medium">{{ fileName }}</span>
        <span class="ml-2 text-gray-400"> - {{ category }}</span>
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <button
        class="text-gray-400 hover:text-gray-600 focus:outline-none"
        @click="onActionClick"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
