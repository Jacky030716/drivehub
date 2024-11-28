<script setup>
import * as z from 'zod'
import axios from 'axios'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import { sessionOptions, semesterOptions, userOptions, categoryOptions, ownerOptions } from '@/constant/options'

import { Button } from './ui/button'
import CustomInputField from './CustomInputField.vue'
import CustomSelectField from './CustomSelectField.vue'
import { useCreateLink } from '@/features/links/api/use-create-link'
import CustomTextareaField from './CustomTextareaField.vue'

const formSchema = toTypedSchema(z.object({
  url: z.string().url({ message: "Invalid URL" }),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  semester: z.string().min(1, { message: "Semester is required" }),
  session: z.string().min(1, { message: "Session is required" }),
  category: z.string().min(1, { message: "Category is required" }), 
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
</script>

<template>
  <form @submit="onSubmit" class="w-full grid grid-cols-4 gap-5">
    <!-- File Url -->
    <CustomInputField 
      :label="'File Url'" 
      :placeholder="'Paste drive url'" 
      :name="'url'"
    />

    <!-- File Name -->
    <CustomInputField 
      :label="'File Name'" 
      :placeholder="'Enter file name'" 
      :name="'name'"
    />

    <!-- Description -->
    <CustomTextareaField 
      :label="'Description'" 
      :placeholder="'Enter description'" 
      :name="'description'"
      :span="4"
    />

    <!-- Owner -->
    <!-- <CustomSelectField 
      :label="'Owner'" 
      :options="ownerOptions"
      :placeholder="'Owner name'" 
      :name="'owner'"
      :span="2"
    /> -->

    <!-- Semester -->
     <CustomSelectField 
      :label="'Semester'"
      :options="semesterOptions"
      :placeholder="'Select your semester'"
      :name="'semester'"
      :span="1"
     />

    <!-- Session -->
    <CustomSelectField 
      :label="'Session'"
      :options="sessionOptions"
      :placeholder="'Select your session'"
      :name="'session'"
      :span="1"
     />

    <!-- Shared With -->
    <!-- <CustomSelectField 
      :label="'Shared With'" 
      :options="userOptions"
      :placeholder="'Who do you want to share with?'" 
      :span="4"
      :name="'sharedwith'"
    /> -->

    <!-- Category -->
    <CustomSelectField 
      :label="'Category'" 
      :options="categoryOptions"
      :placeholder="'Select category'" 
      :span="4"
      :name="'category'"
    />

    <Button 
      type="submit" 
      class="col-span-4 bg-primary text-white rounded-full mt-6"
      :disabled="isSubmitting"
    >
      Submit
    </Button>
  </form>
</template>