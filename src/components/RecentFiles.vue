<script setup>
import drivehub from "../assets/drive.png"
import { defineProps, onMounted } from 'vue';

const props = defineProps({
  files: {
    type: Array,
    required: true,
    default: []
  }
})

const handleClick = (link) => {
  if (link) {
    window.location.href = link;
  } else {
    alert('File link is missing');
  }
};
</script>

<template>
  <div 
    class="md:w-[240px] w-full h-[160px] flex flex-col items-center justify-center gap-2.5 bg-neutral-300/20 hover:bg-neutral-300/40 rounded-xl p-6 cursor-pointer transition-colors ease-in-out"
    v-for="file in files.slice(0, 5)"
    :key="file.id"
    @click="file.link && handleClick(file.link)"
  >
    <img :src="drivehub" alt="Drive Logo" class="w-14"/>
    <div class="w-full flex flex-col items-center text-center">
      <h4 class="line-clamp-3 w-full font-medium leading-tight">{{ file.name }}</h4>
      <div class="w-full line-clamp-5">
        <p class="text-sm text-sky-700">{{ file.link }}</p>
      </div>
    </div>
  </div>  
</template>