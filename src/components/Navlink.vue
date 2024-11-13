<template>
  <li>
    <router-link 
      :to="href" 
      class="flex items-center gap-3 text-secondary-500 hover:font-medium transition-colors ease-in-out hover:text-primary-500 cursor-pointer">
      <img :src="icon" alt="" class="w-5 h-5" />
      {{ name }}
    </router-link>
  </li>
</template>

<script setup>
defineProps({
  name: String,
  href: String,
  icon: String
})
</script>
