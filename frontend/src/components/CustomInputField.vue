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
  type: { type: String, required: false, default: 'text' },
})
</script>

<template>
  <div class="col-span-full">
    <FormField v-slot="{ field, componentField }" :name="name">
      <FormItem >
        <FormLabel class="text-primary font-bold">{{ label }}</FormLabel>
        <FormControl>
          <Input :type="type" :placeholder="placeholder" v-model="field.value" v-bind="componentField" class="focus:border-primary"/>
        </FormControl>
        <FormMessage class="text-xs" />
      </FormItem>
    </FormField>
  </div>
</template>