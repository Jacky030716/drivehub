<script setup>
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  options: { type: Array, required: true },
  placeholder: { type: String, required: false },
  span: { type: Number, required: false, default: 1 },
})
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem :class="`col-span-${span}`">
      <SelectLabel class="text-primary font-bold text-left">{{ label }}</SelectLabel>
      <FormControl>
        <Select v-bind="componentField">
          <SelectTrigger >
            <SelectValue :placeholder="placeholder" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="option in options" :key="option.value" :value="option.value">
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage class="text-xs" />
    </FormItem>
  </FormField>
</template>