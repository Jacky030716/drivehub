<script setup>
import { reactive, onMounted, ref, defineProps } from 'vue';
import axios from 'axios';
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import LinkList from './LinkList.vue';
import { generateCategoryColorMap } from '@/lib/colorUtils';

const props = defineProps({
  hub: {
    type: Object,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true
  }
});

const categoryColorMap = ref(null);

</script>

<template>
  <div class="mt-4 p-2 w-full">
    <!-- Loading state -->
    <div v-if="isLoading" class="text-center py-4">
      <PulseLoader />
    </div>
    
    <!-- Content -->
    <div v-else>
      <!-- Link List Items -->
      <LinkList 
        v-for="link in hub.links" 
        :key="link.id" 
        :link="link" 
        :email="hub.email"
      />
    </div>
  </div>
</template>
