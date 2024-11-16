<script setup>
import ResourceForm from '@/components/ResourceForm.vue';
</script>

<template>
  <div class="max-w-7xl mx-auto flex flex-col p-6 gap-8">
    <div class="w-full flex flex-col items-center text-center">
        <h2 class="text-xl font-semibold">Share Resource</h2>
        <p class="text-muted-foreground leading-tight text-sm">Organize and categorize and share the resources by simply fill and click</p>
    </div>
    <ResourceForm />
  </div>
</template>