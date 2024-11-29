<script setup>
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { Textarea } from '@/components/ui/textarea'

defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  placeholder: { type: String, required: true },
  type: { type: String, required: false, default: 'text' }
})
</script>

<template>
  <div class="col-span-full">
    <FormField v-slot="{ field, componentField }" :name="name">
      <FormItem >
        <FormLabel class="text-primary font-bold">{{ label }}</FormLabel>
        <FormControl>
          <Textarea :placeholder="placeholder" class="focus:border-primary" v-bind="componentField" v-model="field.value" />
        </FormControl>
        <FormMessage class="text-xs" />
      </FormItem>
    </FormField>
  </div>
</template>