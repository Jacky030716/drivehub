<script setup>
import EditResourceForm from '@/components/EditResourceForm.vue';
import { useGetHubs } from '@/features/hubs/api/use-get-hubs';
import { computed, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

// Fetch hubs using Vue Query
const hubsQuery = useGetHubs();

// Computed properties for reactivity
const isDisabled = computed(() => hubsQuery.isLoading.value);
const hubs = computed(() => hubsQuery.data?.value?.data || []);

const route = useRoute()
const router = useRouter()

const linkId = route.params.linkId

const state = reactive({
  link: {},
  isLoading: true
})

onMounted(async ()=> {
  try {
    const response = await axios.get(`api/link/${linkId}`)
    state.link = response.data
  } catch (error) {
    console.error("Error fetching link details")
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <div v-if="isDisabled" class="min-h-screen w-full flex justify-center items-center">
    <PulseLoader />
  </div>

  <div v-else class="max-w-7xl mx-auto justify-center items-center flex flex-col py-12 px-8 gap-8">
    <div class="w-full flex flex-col items-center text-center space-y-4">
        <img src="../assets/drive.jpg" alt="Drive Logo" width="60"/>
        <div>
            <h2 class="text-2xl font-bold">Edit Link</h2>
            <p class="text-muted-foreground leading-tight text-base">Organize, categorize and upload the link by simply fill and click</p>
        </div>
    </div>
    <!-- Resource Form -->
    <EditResourceForm 
      :hubs="hubs"
      :link="state.link" 
    />
  </div>
</template>