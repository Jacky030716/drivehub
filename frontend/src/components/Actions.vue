<script setup>
import { Edit, MoreHorizontal, Trash } from 'lucide-vue-next';
import Button from './ui/button/Button.vue';
import DropdownMenu from './ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuContent from './ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuItem from './ui/dropdown-menu/DropdownMenuItem.vue';
import DropdownMenuTrigger from './ui/dropdown-menu/DropdownMenuTrigger.vue';
import { useDeleteCategory } from '@/features/category/use-delete-category';
import { useSheet } from '@/composables/useSheet';

const props = defineProps({
  id: String,
})

const { onEditOpen } = useSheet() 
const deleteCategoryMutation = useDeleteCategory(props.id);

const handleDelete = () => {
  const ok = window.confirm('Are you sure you want to delete this category?');

  if (!ok) return;
  deleteCategoryMutation.mutate();
};

const handleEdit = () => {
  onEditOpen(props.id);
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild class="flex flex-1 w-full justify-end"> 
      <Button
        variant="ghost"
        className="size-8 p-0"
      >
        <MoreHorizontal className="size-4" />
      </Button>
    </DropdownMenuTrigger>  
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        :disabled="deleteCategoryMutation.isPending.value"
        @click="handleEdit"
      >
        <Edit className="size-4 mr-2"/>
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem
        :disabled="deleteCategoryMutation.isPending.value"
        @click="handleDelete"
        class="text-red-500 focus:text-red-500"
      >
        <Trash className="size-4 mr-2"/>
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>