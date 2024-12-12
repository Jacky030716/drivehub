<script setup>
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ref, watch } from 'vue';

const props = defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  options: { type: Array, required: true },
  placeholder: { type: String, required: false, default: '' },
  span: { type: Number, required: false, default: 4 },
  modelValue: { type: String, required: false, default: 'reset' },
});

const emit = defineEmits(['update:modelValue']);

const selectedValue = ref(props.modelValue);

// Update `selectedValue` on parent changes
watch(() => props.modelValue, (newVal) => {
  selectedValue.value = newVal;
});

// Single selection handler
const handleValueChange = (value) => {
  selectedValue.value = value;
  emit('update:modelValue', value);
};

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
          <Select v-bind="componentField" v-model="field.value" :model-value="selectedValue" @update:model-value="handleValueChange">
            <SelectTrigger>
              <SelectValue :class="[selectedValue === 'reset' && 'text-muted-foreground']">
                {{ selectedValue === 'reset' ? placeholder : selectedValue }}
              </SelectValue>
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
