<script setup>
import Navbar from "@/components/Navbar.vue"
import SelectList from "@/components/SelectList.vue";
import LinkList from "@/components/LinkList.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue"

/* <!-- show loading spinner while loading is true -->
       <div v-if="state.isLoading" class="text-center text-gray-500 py-6 ">
        <PulseLoader />
       </div> */
</script>

<template>
  <div class="bg-gray-100 text-gray-800 font-sans min-h-screen">
    <!-- Header -->
    <div class="bg-white shadow p-4 w-full max-w-7xl mx-auto">
      <h1 class="text-lg font-semibold text-center">Welcome to DriveHub</h1>
      <div class="mt-2">

        <div class="relative">
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

    <!-- Suggested Files -->
    <LinkList />
  </div>
</template>
