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
import { defineProps, onMounted, reactive, computed } from 'vue';

const props = defineProps({
  buttonName: {
    type: String,
    default: '-'
  }
})

import axios from "axios"

const state = reactive({
    sessions_semesters: ['2024/2025-2', '2024/2025-1', '2023/2024-2', '2023/2024-1',
                         '2022/2023-2', '2022/2023-1', '2021/2022-2', '2021/2022-1',
                         '2020/2021-2', '2020/2021-1'],
    categories: [],
    emails: [],
    isLoading: true
})

onMounted(async() => {
  try {
    const response = await axios({
      url: "/api/links",
    });
    
    state.categories = Array.from(new Set(response.data.map(item => item.category))).sort();
    state.emails = Array.from(new Set(response.data.map(item => item.email))).sort();
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
    case 'emails':
      return 'Email Lists';
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
    case 'emails':
      return state.emails;
    default:
      return [];
  }
});
</script>

<template>
  <Select>
    <SelectTrigger class="w-[180px]">
      <SelectValue :placeholder="buttonName" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <template v-if="!state.isLoading">
          <SelectItem key="reset" value="reset" class="font-bold">{{ buttonName }}</SelectItem>
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