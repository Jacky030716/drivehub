<script setup>
import Navbar from "@/components/Navbar.vue"
import SelectList from "@/components/SelectHub.vue";
import HubLists from "@/components/HubLists.vue";
</script>

<template>
  <div class="w-full mx-auto bg-gray-100 text-gray-800 font-sans h-screen">
    <!-- Header -->
    <div class="bg-white shadow p-4 w-full">
      <h1 class="text-lg font-semibold text-center">Welcome to DriveHub</h1>
      <div class="mt-2">
        <div class="w-full relative">
        <i class="pi pi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        <input 
          type="text" 
          placeholder="Search in DriveHub" 
          class="w-full p-2 pl-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>
    </div>
      <div class="flex justify-center mt-3 space-x-2">
        <SelectList :buttonName="'categories'"/>
        <SelectList :buttonName="'sessions_semesters'"/>
        <SelectList :buttonName="'emails'"/>
      </div>
    </div>
    
    <h2 class="text-sm font-semibold text-gray-600 mb-2 mt-5 flex items-center">
      <FileText class="w-4 h-4 mr-2" />
      Suggested Hubs
    </h2>

    <!-- Suggested Files -->
     <div class="w-full px-4">
       <HubLists :limit="3" showButton="true"/>
     </div>
  </div>
</template>
