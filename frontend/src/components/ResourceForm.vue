<script setup>
import * as z from 'zod'
import axios from 'axios'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import { sessionOptions, semesterOptions } from '@/constant/options'

import { Button } from './ui/button'
import CustomInputField from './CustomInputField.vue'
import CustomSelectField from './CustomSelectField.vue'
import { useCreateLink } from '@/features/links/api/use-create-link'
import CustomTextareaField from './CustomTextareaField.vue'

const props = defineProps({
  hubs: Array,
  categories: Array,
})

const formSchema = toTypedSchema(z.object({
  url: z.string().url({ message: "Invalid URL" }),
  ref_name: z.string().min(1, { message: "Reference name is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  semester: z.string().min(1, { message: "Semester is required" }),
  session: z.string().min(1, { message: "Session is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  hub_id: z.string().optional(),
}))

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: formSchema,
})

const mutation = useCreateLink()

const onSubmit = handleSubmit((values) => {
  mutation.mutate(values, {
    onSuccess: () => {
      resetForm()
    },
  })
})

const categoryOptions = props.categories.map((category) => ({
  label: category.name,
  value: category.name,
}))

</script>

<template>
  <form @submit="onSubmit" class="w-full max-w-6xl grid grid-cols-4 gap-5">
    <!-- File Url -->
    <CustomInputField :label="'Link Url'" :placeholder="'Paste drive url'" :name="'url'" />

    <CustomInputField :label="'Reference Name'" :placeholder="'Ref name for your file'" :name="'ref_name'" />

    <!-- Description -->
    <CustomTextareaField :label="'Link Description'" :placeholder="'Give a brief description to your link'"
      :name="'description'" :span="4" />

    <!-- Category -->
    <CustomSelectField :label="'Link Category'" :options="categoryOptions" :placeholder="'Select category'" :span="2"
      :name="'category'" />

    <!-- Session -->
    <CustomSelectField :label="'Session'" :options="sessionOptions" :placeholder="'Select your session'"
      :name="'session'" :span="1" />

    <!-- Semester -->
    <CustomSelectField :label="'Semester'" :options="semesterOptions" :placeholder="'Select your semester'"
      :name="'semester'" :span="1" />

    <!-- Hub Name -->
    <CustomSelectField :label="'Hub Name'" :placeholder="'Select hub (Optional)'"
      :options="hubs.map(hub => ({ label: hub.name, value: hub.id }))" :name="'hub_id'" :span="4" />

    <Button type="submit" class="col-span-4 bg-primary text-white rounded-full mt-6" :disabled="isSubmitting">
      Submit link
    </Button>
  </form>
</template>