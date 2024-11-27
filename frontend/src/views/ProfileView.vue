<script setup>
import CustomInputField from '@/components/CustomInputField.vue';
</script>

<template>
  <div class="w-full flex items-center justify-center min-h-screen">
    <form @submit="onSubmit" class="w-full grid md:grid-cols-4 grid-cols-1 gap-5">
      <!-- First Name -->
      <div class="col-span-full border border-neutral-500 rounded-full p-2">
        input 1
      </div>
      <div class="md:col-span-3 col-span-full border border-neutral-500 rounded-full p-2">
        input 1
      </div>
      <div class="md:col-span-1 col-span-full border border-neutral-500 rounded-full p-2">
        input 1
      </div>
      <div class="md:col-span-2 col-span-full border border-neutral-500 rounded-full p-2">
        input 1
      </div>
      <div class="md:col-span-2 col-span-full border border-neutral-500 rounded-full p-2">
        input 1
      </div>
    </form>
  </div>
</template>