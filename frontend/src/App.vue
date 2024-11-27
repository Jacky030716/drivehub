<script setup>
import { RouterView, useRoute } from 'vue-router';
import Navbar from "./components/Navbar.vue"
import Header from './components/Header.vue';

const route = useRoute()
</script>

<template>
  <div class="w-full flex">
    <Navbar v-if="route.path !== '/sign-in'"/>
    <div class="w-full">
      <Header v-if="route.path !== '/sign-in'"/>
      <RouterView />
    </div>
  </div>
</template>
