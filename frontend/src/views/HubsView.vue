<script setup>
import HubLists from "@/components/HubLists.vue";
import HubForm from "@/features/hubs/components/HubForm.vue";
</script>

<template>
  <section class="sec-container">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-semibold text-center">Your Groups</h1>
      <HubForm />
    </div>
    <div class="overflow-y-auto">
      <HubLists />
    </div>
  </section>
</template>