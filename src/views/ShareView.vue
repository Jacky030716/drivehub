<script setup>
import ResourceForm from '@/components/ResourceForm.vue';
</script>

<template>
  <div class="max-w-7xl mx-auto min-h-screen justify-center items-center flex flex-col p-6 gap-8">
    <div class="w-full flex flex-col items-center text-center space-y-4">
        <img src="../assets/drive.jpg" alt="Drive Logo" width="60"/>
        <div>
            <h2 class="text-2xl font-bold">Share Resource</h2>
            <p class="text-muted-foreground leading-tight text-base">Organize and categorize and share the resources by simply fill and click</p>
        </div>
    </div>
    <!-- Resource Form -->
    <ResourceForm />
  </div>
</template>