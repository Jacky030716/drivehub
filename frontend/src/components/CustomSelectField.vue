<script setup>
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  options: { type: Array, required: true },
  placeholder: { type: String, required: false, default: '' },
  span: { type: Number, required: false, default: 4 },
});
</script>

<template>
  <div :class="['col-span-full']">
    <!-- Bind the field using FormField -->
    <FormField v-slot="{ field, componentField }" :name="name">
      <FormItem>
        <!-- Label -->
        <SelectLabel class="text-primary font-bold text-left">{{ label }}</SelectLabel>
        <FormControl>
          <!-- Bind the Select to the field value -->
          <Select v-bind="componentField" v-model="field.value">
            <SelectTrigger>
              <SelectValue :placeholder="placeholder" />
            </SelectTrigger>
            <SelectContent>
              <!-- Dynamically render options -->
              <SelectItem
                v-for="option in options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <!-- Display validation message -->
        <FormMessage class="text-xs" />
      </FormItem>
    </FormField>

  </div>
</template>
