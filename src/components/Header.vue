<script setup>
import MobileNav from './MobileNav.vue';

</script>

<template>
  <header class="w-full h-20 bg-primary">
    <nav class="w-full mx-auto px-6 flex items-center justify-between h-full text-white">
      <MobileNav />

      <h2 class="text-xl font-semibold">
        My Resources
      </h2>

      <!-- Avatar -->
      <div class="w-10 h-10 bg-white rounded-full flex justify-center items-center">
        <span class="text-black">Hi</span>
      </div>
    </nav>
  </header>
</template>