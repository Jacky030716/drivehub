<script setup>
import HubLists from "@/components/HubLists.vue";
import EditHubForm from "@/features/hubs/components/EditHubForm.vue";
</script>

<template>
  <div class="bg-gray-100 shadow p-4 w-full flex flex-col ">
    <h1 class="text-lg font-semibold text-center">Hub Lists</h1>
    <div class="mt-2 max-h-[580px] overflow-y-auto">
      <HubLists />
    </div>
  </div>
</template>