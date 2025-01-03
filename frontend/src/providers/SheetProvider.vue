<script setup>
import { provide, reactive } from 'vue'
import NewCategorySheet from '@/features/category/components/NewCategorySheet.vue'

const state = reactive({
  isOpen: false,
  id: undefined
})

const onOpen = () => {
  state.isOpen = true
}

const onClose = () => {
  state.isOpen = false
  state.id = undefined
}

provide('sheet', {
  state,
  onOpen,
  onClose
})
</script>

<template>
  <div>
    <slot />
    <NewCategorySheet />
  </div>
</template>