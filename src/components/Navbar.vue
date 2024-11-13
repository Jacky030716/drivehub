<script setup>
import Navlink from "./Navlink.vue"
import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator'
import { navlinks } from "../constant/navlinks.js"

const overviewLinks = navlinks.slice(0, 3)
const resourcesLinks = navlinks.slice(3)
</script>

<template>
  <nav class="px-5 py-8 flex flex-col justify-between gap-10 max-w-[250px] border h-screen rounded-xl shadow-secondary-600 shadow-lg">
    <!-- Welcome Text -->
    <div>
      <h1 class="text-2xl text-primary font-bold">DriveHub</h1>
      <p class="text-lg">Welcome Back, <span class="font-semibold">Teong Lee</span></p>
    </div>

    <!-- Navbar Body -->
    <div class="flex flex-col h-full w-full gap-6">
      <!-- Overview Section -->
      <div class="flex flex-col gap-y-3.5">
        <h4 class="text-secondary-600 font-bold text-xl">Overview</h4>
        <ul class="flex flex-col items-start gap-2.5 text-secondary-500">
          <Navlink 
            v-for="(link, index) in overviewLinks" 
            :key="index" 
            :name="link.name" 
            :href="link.href" 
            :icon="link.icon" 
          />
        </ul>
      </div>

      <!-- Separator -->
       <Separator />

      <!-- Resources Section -->
      <div class="flex flex-col gap-3.5">
        <h4 class="text-secondary-600 font-bold text-xl">Resources</h4>
        <ul class="flex flex-col items-start gap-2.5 text-secondary-500">
          <Navlink 
            v-for="(link, index) in resourcesLinks" 
            :key="index" 
            :name="link.name" 
            :href="link.href" 
            :icon="link.icon" 
          />
        </ul>
      </div>
    </div>

    <Button>
      Logout
    </Button>
  </nav>
</template>