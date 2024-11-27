<script setup>
 import SharedResourceList from '@/components/SharedResourceList.vue';
</script>

<template>
  <div class="bg-gray-100 shadow p-4 w-full flex flex-col items-center gap-6">
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold text-center">Shared Resources Lists</h1>
      <p class="text-muted-foreground leading-tight text-sm">Here are the list of resources that you've shared with others before</p>
    </div>
    <div class="w-full mt-2 max-h-[530px] overflow-y-auto">
      <SharedResourceList />
    </div>
  </div>
</template>