<script setup>
import { RouterView } from 'vue-router';
import Navbar from "./components/Navbar.vue"
</script>

<template>
  <div class="flex">
      <Navbar />
      <RouterView />
  </div>
</template>
