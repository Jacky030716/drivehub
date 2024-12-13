<script setup>
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { computed, ref, watch } from 'vue';

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

// Compute the display label based on the selected value
const selectedLabel = computed(() => {
  if (selectedValue.value === 'reset') return props.placeholder;
  
  const selectedOption = props.options.find(option => option.value === selectedValue.value);
  return selectedOption ? selectedOption.label : selectedValue.value;
});

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
                {{ selectedLabel }}
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
