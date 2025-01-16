<script setup>
import drivehub from "../assets/drive.png"

const props = defineProps({
  links: {
    type: Array,
    required: true,
    default: []
  }
})

const handleClick = (link) => {
  if (link) {
    window.location.href = link;
  } else {
    alert('Link is missing');
  }
};
</script>

<template>
  <div 
    class="xl:flex-1 w-full h-[160px] flex flex-col items-center justify-center gap-2.5 bg-neutral-300/20 hover:bg-neutral-300/40 rounded-xl p-6 cursor-pointer transition-colors ease-in-out"
    v-if="links.length"
    v-for="link in links.slice(0, Math.min(links.length, 4))"
    :key="link.id"
    @click="link.url && handleClick(link.url)"
  >
    <img :src="drivehub" alt="Drive Logo" class="w-14"/>
    <div class="w-full flex flex-col items-center text-center">
      <h4 class="line-clamp-3 w-full font-medium leading-tight">{{ link.ref_name }}</h4>
      <div class="w-full line-clamp-1">
        <p class="text-sm text-sky-700">{{ link.url }}</p>
      </div>
    </div>
  </div>  
</template>