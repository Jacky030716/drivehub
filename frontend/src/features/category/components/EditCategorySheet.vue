<script setup>
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

import * as z from "zod";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useSheet } from "@/composables/useSheet";
import { useEditCategory } from "../use-edit-category";
import { useGetCategory } from "../use-get-category";
import CustomInputField from "@/components/CustomInputField.vue";
import { Button } from "@/components/ui/button";
import { computed, ref, watch } from "vue";

const formSchema = toTypedSchema(
  z.object({
    category: z.string().min(1, { message: "Category name is required" }),
  })
);

// Sheet state and actions
const { state, onEditClose } = useSheet();
const categoryId = computed(() => state.id);

// Query to fetch category data
const categoryQuery = useGetCategory(categoryId);

// Form state
const { handleSubmit, resetForm, setValues, errors } = useForm({
  validationSchema: formSchema,
  initialValues: {
    category: "", // Default to empty initially
  },
});

// Edit mutation
let mutation = useEditCategory(state.id);
const isDisabled = computed(() => mutation.isPending.value);

// Submit handler
const onSubmit = handleSubmit((values) => {
  if (!state.id) return;

  mutation.mutate({
    id: state.id,
    name: values.category,
  }, {
    onSuccess: () => {
      resetForm(); // Reset the form on success
      onEditClose(); // Close the sheet
    },
  });
});

// Watch for changes in state.id to refetch and update form
watch(
  () => state.id,
  async (newId) => {
    if (newId) {
      await categoryQuery.refetch();
      setValues({
        category: categoryQuery.data.value?.name || "",
      })
    }
  },
  { immediate: true }
);

</script>

<template>
  <Sheet :open="state.isEditOpen" @update:open="onEditClose">
    <SheetContent class="flex flex-col gap-10">
      <SheetHeader>
        <SheetTitle>Edit Category</SheetTitle>
        <SheetDescription>Edit an existing category</SheetDescription>
      </SheetHeader>
      <form class="space-y-6 w-full" @submit="onSubmit">
        <CustomInputField
          :label="'Category Name'"
          :name="'category'"
          :placeholder="'Enter category name'"
          :error="errors.category"
        />
        <Button class="w-full" :disabled="isDisabled">
          Edit Category
        </Button>
      </form>
    </SheetContent>
  </Sheet>
</template>
