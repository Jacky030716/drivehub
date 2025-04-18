<script setup>
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { RouterLink, useRoute } from "vue-router";
import { navlinks } from "@/constant/navlinks.js";
import { LayoutPanelLeft, Menu } from "lucide-vue-next";

const overviewLinks = navlinks.slice(0, 3);
const resourcesLinks = navlinks.slice(3);

const route = useRoute()
const isActive = (link) => {
  const linkPath = link.href || link;
  const currentPath = route.path;

  if (linkPath === "/") {
    return currentPath === linkPath;
  }

  const regex = new RegExp(`^${linkPath}(/|$)`);
  return regex.test(currentPath);
}

const username = localStorage.getItem("name");
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" class="lg:hidden block">
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="w-[250px] h-full">
      <div class="flex w-full h-full flex-col">
        <div class="py-8">
          <h1 class="text-2xl text-primary font-bold">DriveHub</h1>
          <p class="text-lg">Welcome Back, <br> <span class="font-semibold">{{ username }}</span></p>
        </div>

        <!-- Navbar Body -->
        <div class="flex flex-col h-full gap-6">
          <!-- Overview Section -->
          <div class="flex flex-col gap-y-3.5">
            <h4 class="text-secondary-600 font-bold text-xl">Overview</h4>
            <div class="flex flex-col items-start gap-3.5 text-secondary-500">
              <RouterLink v-for="(link, index) in overviewLinks" :key="index" :to="link.href" @click="closeNav">
                <SheetClose
                  class="flex items-center gap-3 text-secondary-500 hover:font-medium transition-colors ease-in-out hover:text-primary-500 cursor-pointer p-0.5">
                  <img :src="link.icon" :alt="link.name" class="w-5 h-5" />
                  {{ link.name }}
                </SheetClose>
              </RouterLink>
              <RouterLink @click="closeNav" to="/admin">
                <SheetClose
                  class="flex items-center gap-3 text-secondary-500 hover:font-medium transition-colors ease-in-out hover:text-primary-500 cursor-pointer p-0.5"
                >
                  <LayoutPanelLeft class="w-5 h-5" />
                  Admin Panel
                </SheetClose>
              </RouterLink>
            </div>
          </div>

          <!-- Separator -->
          <Separator />

          <!-- Resources Section -->
          <div class="flex flex-col gap-3.5">
            <h4 class="text-secondary-600 font-bold text-xl">Resources</h4>
            <div class="flex flex-col items-start gap-3.5 text-secondary-500">
              <RouterLink v-for="(link, index) in resourcesLinks" :key="index" :to="link.href">
                <SheetClose
                  class="flex items-center gap-3 text-secondary-500 hover:font-medium transition-colors ease-in-out hover:text-primary-500 cursor-pointer p-0.5">
                  <img :src="link.icon" :alt="link.name" class="w-5 h-5" />
                  {{ link.name }}
                </SheetClose>
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Logout Button -->
        <div class="w-full">
          <Button onclick="localStorage.clear(); 
            window.location.href = '/sign-in'" class="w-full">
            Logout
          </Button>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>