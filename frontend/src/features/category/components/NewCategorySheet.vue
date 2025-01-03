<script setup>
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"

import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useCreateCategory } from "../use-create-category"
import { useSheet } from "@/composables/useSheet"
import CustomInputField from "@/components/CustomInputField.vue"
import { Button } from "@/components/ui/button"

const formSchema = toTypedSchema(z.object({
  category: z.string().min(1, { message: "Category name is required" }),
}))

const { state, onClose } = useSheet()

const mutation = useCreateCategory()

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  mutation.mutate(values, {
    onSuccess: () => {
      resetForm()
      onClose()
    }
  })
})

</script>

<template>
  <Sheet :open="state.isOpen" @update:open="onClose">
    <SheetContent class="flex flex-col gap-10">
      <SheetHeader>
        <SheetTitle>New Category</SheetTitle>
        <SheetDescription>
          Create a new category
        </SheetDescription>
      </SheetHeader>
      <form class="space-y-6 w-full" @submit="onSubmit">
        <CustomInputField :label="'Category Name'" :name="'category'" :placeholder="'Enter category name'" />
        <Button class="w-full">
          Add Category
        </Button>
      </form>
    </SheetContent>
  </Sheet>
</template>