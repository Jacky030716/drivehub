<script setup>
import { useRouter } from 'vue-router';
import Button from './ui/button/Button.vue';

defineProps({
  message: {
    type: String,
    default: 'Not Found',
  },
  redirectUrl: {
    type: String,
    default: '/',
  },
  buttonText: {
    type: String,
    default: 'Go back',
  }
})

const router = useRouter()

</script>

<template>
  <div class="max-w-7xl mx-auto w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-2">
    <img src="/src/assets/drive.png" class="aspect-auto w-28" />
    <div class="space-y-6 flex flex-col items-center">
      <h1 class="text-3xl font-bold uppercase">{{ message }}</h1>
      <div class="flex gap-4">
        <!-- <Button
            type="button"
            @click="router.go(-1)"
            class="uppercase rounded-full w-[150px] h-[40px]"
            variant="outline"
          >
            Go To Last Page
          </Button> -->
        <Button type="button" @click="router.push(redirectUrl)" class="uppercase rounded-full w-[250px] h-[40px]">
          {{ buttonText }}
        </Button>
      </div>
    </div>
  </div>
</template>