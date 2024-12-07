<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router';
import Toaster from './components/ui/toast/Toaster.vue';
// import { useToast } from 'vue-toastification';
import Navbar from "./components/Navbar.vue"
import Header from './components/Header.vue';
import { computed } from 'vue';

const route = useRoute()
const router = useRouter()
const isSignInRoute = computed(() => route.path === '/sign-in')

// Extract user information
const email = localStorage.getItem('email');

if (!isSignInRoute.value){
  if (!email){
    router.push('/sign-in');
  }
}

</script>

<template>
  <Toaster />
  <div class="w-full flex max-h-screen overflow-hidden">
    <Navbar v-if="route.path !== '/sign-in'"/>
    <div class="flex flex-col w-full h-full">
      <Header v-if="route.path !== '/sign-in'"/>
      <div :class="{'h-[calc(100vh-80px)]' : !isSignInRoute}">
        <RouterView />
      </div>
    </div>
  </div>
</template>
