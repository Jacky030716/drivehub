<script setup>
import { RouterView } from 'vue-router';
import Navbar from "./components/Navbar.vue"
import Header from './components/Header.vue';
</script>

<template>
  <div class="w-full flex">
    <Navbar />
    <div class="w-full">
      <Header />
      <RouterView />
    </div>
  </div>
</template>
