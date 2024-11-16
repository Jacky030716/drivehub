<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { sessionOptions, semesterOptions, userOptions, categoryOptions, ownerOptions } from '@/constant/options'

import { Button } from './ui/button'
import CustomInputField from './CustomInputField.vue'
import CustomSelectField from './CustomSelectField.vue'

const formSchema = toTypedSchema(z.object({
  fileurl: z.string(),
  filename: z.string(),
  owner: z.string().email(),
  semester: z.string(),
  session: z.string(),
  sharedwith: z.string(),
  category: z.string(),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <form @submit="onSubmit" class="w-full grid grid-cols-4 gap-5">
    <!-- File Url -->
    <CustomInputField 
      :label="'File Url'" 
      :placeholder="'Paste drive url'" 
      :span="4"
      :name="'fileurl'"
    />

    <!-- File Name -->
    <CustomInputField 
      :label="'File Name'" 
      :placeholder="'Enter file name'" 
      :span="4"
      :name="'filename'"
    />

    <!-- Owner -->
    <CustomSelectField 
      :label="'Owner'" 
      :options="ownerOptions"
      :placeholder="'Owner name'" 
      :span="2"
      :name="'owner'"
    />

    <!-- Semester -->
     <CustomSelectField 
      :label="'Semester'"
      :options="semesterOptions"
      :placeholder="'Select your semester'"
      :name="'semester'"
     />

    <!-- Session -->
    <CustomSelectField 
      :label="'Session'"
      :options="sessionOptions"
      :placeholder="'Select your session'"
      :name="'session'"
     />

    <!-- Shared With -->
    <CustomSelectField 
      :label="'Shared With'" 
      :options="userOptions"
      :placeholder="'Who do you want to share with?'" 
      :span="4"
      :name="'sharedwith'"
    />

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
      :disabled="!form.isSubmitting"
    >
      Submit
    </Button>
  </form>
</template>