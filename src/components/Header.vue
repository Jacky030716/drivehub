<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import MobileNav from './MobileNav.vue';

// Get the current route
const route = useRoute();

// Compute the page title reactively
const pageTitle = computed(() => route.meta.title || 'Page');
</script>

<template>
  <header class="w-full h-20 bg-primary">
    <nav class="w-full mx-auto px-6 flex items-center justify-between h-full text-white">
      <MobileNav />

      <!-- Dynamic Page Title -->
      <h2 class="text-xl font-semibold">
        {{ pageTitle }}
      </h2>

      <!-- Avatar -->
      <div class="w-10 h-10 bg-white rounded-full flex justify-center items-center">
        <span class="text-black">Hi</span>
      </div>
    </nav>
  </header>
</template>
