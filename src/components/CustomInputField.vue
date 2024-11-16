<script setup>
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'

defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  placeholder: { type: String, required: true },
  span: { type: Number, required: false, default: 4 },
  type: { type: String, required: false, default: 'text' }
})
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem :class="`col-span-${span}`">
      <FormLabel class="text-primary font-bold">{{ label }}</FormLabel>
      <FormControl>
        <Input :type="type" :placeholder="placeholder" v-bind="componentField" class="focus:border-primary"/>
      </FormControl>
      <FormMessage class="text-xs" />
    </FormItem>
  </FormField>
</template>