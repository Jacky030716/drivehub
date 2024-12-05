<script setup>
// import { RouterView } from 'vue-found'
import Button from '@/components/ui/button/Button.vue';
import { RouterLink } from 'vue-router' 
</script>

<template>
  <section class="w-full max-w-7xl mx-auto text-center flex flex-col justify-center items-center h-[calc(100vh-80px)] gap-10">
    <!-- <i class="pi pi-exclamation-triangle text-yellow-500 text-7xl mb-5"></i> -->
    <div class="">
      <img src="/src/assets/404.png" class="w-[800px] h-auto" />
      <div class="space-y-2">
        <h1 class="text-5xl font-bold">OPPS! Page Not Found</h1>
        <p class="text-xl">This page does not exist</p>
      </div>
    </div>
      

    <Button as-child class="text-white rounded-full w-[200px] h-[40px]">
      <RouterLink to="/">
        Back To Home
      </RouterLink>
    </Button>
  </section>
</template>