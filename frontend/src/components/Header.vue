<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import MobileNav from './MobileNav.vue';

// Get the current route
const route = useRoute();
const email = localStorage.getItem('email');
const formattedUsername = localStorage.getItem('name')?.split(' ').slice(1, 3).map((name) => name.slice(0, 1)).join('');

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


      <div class="flex gap-2 items-center">
        <p class="lg:block hidden">{{ email }}</p>
        <!-- Avatar -->
        <div class="w-10 h-10 bg-white rounded-full flex justify-center items-center">
          <span class="text-black font-medium">{{ formattedUsername }}</span>
        </div>
      </div>
    </nav>
  </header>
</template>
