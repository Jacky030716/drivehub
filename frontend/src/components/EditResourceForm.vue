<script setup>
import * as z from 'zod'
import axios from 'axios'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import { sessionOptions, semesterOptions, userOptions, categoryOptions, ownerOptions } from '@/constant/options'

import { Button } from './ui/button'
import CustomInputField from './CustomInputField.vue'
import CustomSelectField from './CustomSelectField.vue'
import CustomTextareaField from './CustomTextareaField.vue'

defineProps({
  hubs: Array,
  link: Object
})

const formSchema = toTypedSchema(z.object({
  url: z.string().url({ message: "Invalid URL" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  semester: z.string().min(1, { message: "Semester is required" }),
  session: z.string().min(1, { message: "Session is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  hub_name: z.string().min(1, { message: "Hub name is required" }),
}))

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  // mutation.mutate(values, {
  //   onSuccess: () => {
  //     resetForm()
  //   },
  // })
  console.log(values)
})
</script>

<template>
  <form @submit="onSubmit" class="w-full grid grid-cols-4 gap-5">
    {{ link }}
    <!-- File Url -->
    <CustomInputField :label="'Link Url'" :placeholder="'Paste drive url'" :name="'url'" />

    <!-- Description -->
    <CustomTextareaField :label="'Link Description'" :placeholder="'Give a brief description to your link'"
      :name="'description'" :span="4" />

    <!-- Category -->
    <CustomSelectField :label="'Link Category'" :options="categoryOptions" :placeholder="'Select category'" :span="2"
      :name="'category'" />

    <!-- Semester -->
    <CustomSelectField :label="'Semester'" :options="semesterOptions" :placeholder="'Select your semester'"
      :name="'semester'" :span="1" />

    <!-- Session -->
    <CustomSelectField :label="'Session'" :options="sessionOptions" :placeholder="'Select your session'"
      :name="'session'" :span="1" />

      
    <!-- Hub Name -->
    <CustomSelectField :label="'Hub Name'" :placeholder="'Select hub'"
      :options="hubs.map(hub => ({ label: hub.name, value: hub.id }))" :name="'hub_id'" :span="4" />

    <!-- Shared With -->
    <!-- <CustomSelectField 
      :label="'Shared With'" 
      :options="userOptions"
      :placeholder="'Who do you want to share with?'" 
      :span="4"
      :name="'sharedwith'"
    /> -->

    <Button type="submit" class="col-span-4 bg-primary text-white rounded-full mt-6" :disabled="isSubmitting">
      Update link
    </Button>
  </form>
</template>