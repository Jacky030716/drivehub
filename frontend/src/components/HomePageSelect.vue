<script setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { defineProps, defineEmits, computed, ref, watch } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  buttonName: {
    type: String,
    default: '-'
  },
  modelValue: {
    type: String,
    default: 'reset'
  }
})

const emit = defineEmits(['update:modelValue'])

const selectedValue = ref(props.modelValue)

// Update `selectedValue` on parent changes
watch(() => props.modelValue, (newVal) => {
  selectedValue.value = newVal
})

// Single selection handler
const handleValueChange = (value) => {
  selectedValue.value = value
  emit('update:modelValue', value)
}

const getLabel = computed(() => {
  const labels = {
    'category': 'Category',
    'semester': 'Semester',
    'session': 'Session'
  }
  return labels[props.buttonName] || 'Select Option'
})

const getItems = computed(() => props.options)
</script>

<template>
  <Select
    :model-value="selectedValue"
    @update:model-value="handleValueChange"
  >
    <SelectTrigger class="w-[180px]">
      <SelectValue :placeholder="getLabel" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="reset" class="font-bold">
          {{ getLabel }}
        </SelectItem>
        <SelectItem
          v-for="item in getItems"
          :key="item.id || item"
          :value="item.value || item"
        >
          {{ item.label || item }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
