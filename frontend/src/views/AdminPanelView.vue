<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { columns } from '@/features/category/components/column';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useGetAllLinks } from '@/features/links/api/use-get-all-links';
import Tabs from '@/components/ui/tabs/Tabs.vue';
import TabsList from '@/components/ui/tabs/TabsList.vue';
import TabsTrigger from '@/components/ui/tabs/TabsTrigger.vue';
import TabsContent from '@/components/ui/tabs/TabsContent.vue';
import LinksDataTable from '@/features/category/components/LinksDataTable.vue';
import CategoryDataTable from '@/features/category/components/CategoryDataTable.vue';
import { useGetCategories } from '@/features/category/use-get-categories';
import { categoryColumns } from '@/features/category/components/category-columns';

const linksQuery = useGetAllLinks();
const categoryQuery = useGetCategories()

const isDisabled = computed(() => linksQuery.isLoading.value || categoryQuery.isLoading.value);
const links = computed(() => linksQuery.data.value || []);
const categories = computed(() => categoryQuery.data.value || []);

// Ensure data is refetched on mount if not already present
onMounted(() => {
  if (!linksQuery.data.value && !linksQuery.isLoading.value) {
    linksQuery.refetch();
  }

  if (!categoryQuery.data.value && !categoryQuery.isLoading.value) {
    categoryQuery.refetch();
  }
});
</script>

<template>
  <div v-if="isDisabled" class="min-h-screen w-full flex justify-center items-center">
    <PulseLoader color="#882C4C" />
  </div>
  <section v-else class="sec-container overflow-y-auto">
    <Tabs default-value="links" class="w-full">
      <TabsList class="grid grid-cols-2 w-full">
        <TabsTrigger value="links">
          Links
        </TabsTrigger>
        <TabsTrigger value="categories">
          Categories
        </TabsTrigger>
      </TabsList>
      <TabsContent value="links">
        <LinksDataTable :columns="columns" :data="links" />
      </TabsContent>
      <TabsContent value="categories">
        <!-- {{ categories.data }} -->
        <CategoryDataTable :columns="categoryColumns" :data="categories.data" />
      </TabsContent>
    </Tabs>
  </section>
</template>