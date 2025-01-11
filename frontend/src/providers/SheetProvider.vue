<script setup>
import { provide, reactive } from 'vue'
import NewCategorySheet from '@/features/category/components/NewCategorySheet.vue'
import EditCategorySheet from '@/features/category/components/EditCategorySheet.vue'

const state = reactive({
  isOpen: false,
  isEditOpen: false,
  id: undefined
})

const onOpen = () => {
  state.isOpen = true
}

const onClose = () => {
  state.isOpen = false
  state.id = undefined
}

const onEditOpen = (id) => {
  state.isEditOpen = true
  state.id = id
}

const onEditClose = () => {
  state.isEditOpen = false
  state.id = undefined
}

provide('sheet', {
  state,
  onOpen,
  onClose,
  onEditOpen,
  onEditClose
})
</script>

<template>
  <div>
    <slot />
    <NewCategorySheet />
    <EditCategorySheet />
  </div>
</template>