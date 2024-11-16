<script setup lang="ts">
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

// Combine both API calls into one
onMounted(async() => {
  try {
    const response = await axios({
      url: "http://localhost:8000/resources",
    });
    state.categories = response.data.map(item => item.category);
    state.emails = response.data.map(item => item.email);
  } catch (error) {
    console.log("Error fetching data ", error);
  } finally {
    state.isLoading = false;
  }
});

// Computed property to get the appropriate label based on buttonName
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

// Computed property to get the appropriate items array based on buttonName
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
          <!-- "reset" is used to allow user to make error -->
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