<script setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { defineProps, defineEmits, onMounted, reactive, computed } from 'vue';

const props = defineProps({
  buttonName: {
    type: String,
    default: '-'
  },
  modelValue: {
    type: String,
    default: 'reset'
  }
});

const emit = defineEmits(['update:modelValue']);

import axios from "axios"

const state = reactive({
    sessions_semesters: ['2024/2025-2', '2024/2025-1', '2023/2024-2', '2023/2024-1',
                         '2022/2023-2', '2022/2023-1', '2021/2022-2', '2021/2022-1',
                         '2020/2021-2', '2020/2021-1'],
    categories: [],
    isLoading: true
});

onMounted(async() => {
  try {
    const response = await axios({
      url: "/api/hubs",
    });
    
    state.categories = Array.from(new Set(response.data.map(item => item.categoryName))).sort();
  } catch (error) {
    console.log("Error fetching data ", error);
  } finally {
    state.isLoading = false;
  }
});

const getLabel = computed(() => {
  switch(props.buttonName) {
    case 'categories':
      return 'Categories';
    case 'sessions_semesters':
      return 'Academic Sessions';
    default:
      return 'Select Option';
  }
});

const getItems = computed(() => {
  switch(props.buttonName) {
    case 'categories':
      return state.categories;
    case 'sessions_semesters':
      return state.sessions_semesters;
    default:
      return [];
  }
});
</script>

<template>
  <Select v-model="props.modelValue" @update:modelValue="(value) => $emit('update:modelValue', value)">
    <SelectTrigger class="w-[180px]">
      <SelectValue :placeholder="getLabel" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <template v-if="!state.isLoading">
          <SelectItem key="reset" value="reset" class="font-bold">
            {{ getLabel }}
          </SelectItem>
          <SelectItem
             v-for="item in getItems"
             :key="item"
             :value="item"
          >
            {{ item }}
          </SelectItem>
        </template>
        <SelectItem v-else value="loading">Loading...</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>