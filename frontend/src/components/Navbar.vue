<script setup>
import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator'
import { navlinks } from "../constant/navlinks.js"
import { RouterLink, useRoute } from 'vue-router'

const overviewLinks = navlinks.slice(0, 3)
const resourcesLinks = navlinks.slice(3)

const route = useRoute()
const isActive = (link) => route.path === link.href && route.path.includes(link.href)
</script>

<template>
  <nav class="px-5 py-8 md:flex hidden flex-col justify-between gap-10 min-w-[250px] border min-h-screen shadow-lg">
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
        <div class="flex flex-col items-start gap-2.5 text-secondary-500">
          <RouterLink v-for="(link, index) in overviewLinks" :key="index" :to="link.href"
            class="flex w-full items-center gap-3 text-secondary-500 hover:font-medium transition-colors ease-in-out hover:text-primary-500 cursor-pointer p-2"
            :class="{ 'font-medium bg-secondary-300/20 rounded-md': isActive(link) }">
            <img :src="link.icon" :alt="link.name" class="w-5 h-5" />
            {{ link.name }}
          </RouterLink>
        </div>
      </div>

      <!-- Separator -->
      <Separator />

      <!-- Resources Section -->
      <div class="flex flex-col gap-3.5">
        <h4 class="text-secondary-600 font-bold text-xl">Resources</h4>
        <div class="flex flex-col items-start gap-2.5 text-secondary-500">
          <RouterLink v-for="(link, index) in resourcesLinks" :key="index" :to="link.href"
            class="flex w-full items-center gap-3 text-secondary-500 hover:font-medium transition-colors ease-in-out hover:text-primary-500 cursor-pointer p-2"
            :class="{ 'font-medium bg-secondary-300/20 rounded-md': isActive(link) }">
            <img :src="link.icon" :alt="link.name" class="w-5 h-5" />
            {{ link.name }}
          </RouterLink>
        </div>
      </div>
    </div>

    <Button>
      Logout
    </Button>
  </nav>
</template>