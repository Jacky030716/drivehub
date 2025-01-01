<script setup>
import * as z from 'zod'
import axios from 'axios'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import { sessionOptions, semesterOptions, shareWithOptions } from '@/constant/options'

import { Button } from './ui/button'
import CustomInputField from './CustomInputField.vue'
import CustomSelectField from './CustomSelectField.vue'
import { useCreateLink } from '@/features/links/api/use-create-link'
import CustomTextareaField from './CustomTextareaField.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Checkbox from './ui/checkbox/Checkbox.vue'

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
  shared_with: z.string().min(1, { message: "Shared with is required" }),
  shared_details: z.object({
    email: z.string().optional(),
    group: z.string().optional(),
  }).optional(),
  category: z.string().min(1, { message: "Category is required" }),
}))

const router = useRouter()

const sharedWith = ref('reset')
const emailOption = ref(false)
const groupOption = ref(false)

const handleSharedWithChange = (value) => {
  sharedWith.value = value

  // Reset email and group options when 'Others' is not selected
  if (value !== 'Others') {
    emailOption.value = false
    groupOption.value = false
  }
}

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: formSchema,
})

const mutation = useCreateLink()

const onSubmit = handleSubmit((values) => {
  mutation.mutate(values, {
    onSuccess: () => {
      resetForm()
      router.push('/shared')
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

    <!-- Share With -->
    <CustomSelectField :label="'Share With'" :options="shareWithOptions" :placeholder="'Select who can view your link'"
      :name="'shared_with'" v-model="sharedWith" @update:modelValue="handleSharedWithChange" />

    <!-- Radio Input When User Select "Others" -->
    <div v-if="sharedWith.toLowerCase() === 'others'" class="w-full flex gap-2 flex-col ">
      <div class="w-full flex items-center gap-2 text-sm">
        <Checkbox 
          :checked="emailOption" 
          @update:checked="(checked) => emailOption = checked" 
          class="mr-2" 
        />
        <label>Individual Emails</label>
      </div>
      <div class="w-full flex items-center gap-2 text-sm">
        <Checkbox 
          :checked="groupOption"
          @update:checked="(checked) => groupOption = checked" 
          class="mr-2" 
        />
        <label>Group</label>
      </div>
    </div>

    <!-- Email -->
    <CustomInputField 
      v-if="emailOption" 
      :label="'Individual Emails'" 
      :placeholder="'Type the email of the users, separate with (comma) if more than one'" 
      :name="'shared_details.email'" 
    />

    <!-- Group Name -->
    <CustomSelectField 
      v-if="groupOption" 
      :label="'Group (Optional)'" 
      :placeholder="'Select Your Group'"
      :options="hubs.map(hub => ({ label: hub.name, value: hub.id }))" 
      :name="'shared_details.group'" 
      :span="4" 
    />

    <Button type="submit" class="col-span-4 bg-primary text-white rounded-full mt-6" :disabled="isSubmitting">
      Submit link
    </Button>
  </form>
</template>