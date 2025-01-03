<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import SheetProvider from './providers/SheetProvider.vue';
import { Toaster } from 'vue-sonner'
import Navbar from "./components/Navbar.vue"
import Header from './components/Header.vue';
import { useNotifications } from './composables/useNotifications';

const route = useRoute()
const router = useRouter()
const isSignInRoute = computed(() => route.path === '/sign-in')

const { setupNotifications, cleanupNotifications } = useNotifications();

// Extract user information
const email = localStorage.getItem('email');

if (!isSignInRoute.value) {
  if (!email) {
    router.push('/sign-in');
  }
}

onMounted(() => {
  setupNotifications();
});

onUnmounted(() => {
  cleanupNotifications();
});
</script>

<template>
  <Toaster rich-colors />
  <div class="w-full flex max-h-screen overflow-hidden">
    <Navbar v-if="route.path !== '/sign-in'" />
    <div class="flex flex-col w-full h-full">
      <Header v-if="route.path !== '/sign-in'" />
      <SheetProvider>
        <div :class="{ 'h-[calc(100vh-80px)]': !isSignInRoute }">
          <RouterView />
        </div>
      </SheetProvider>
    </div>
  </div>
</template>
