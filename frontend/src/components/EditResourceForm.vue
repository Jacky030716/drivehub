<script setup>
import * as z from 'zod'
import axios from 'axios'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import { sessionOptions, semesterOptions, shareWithOptions } from '@/constant/options'

import { Button } from './ui/button'
import CustomInputField from './CustomInputField.vue'
import CustomSelectField from './CustomSelectField.vue'
import CustomTextareaField from './CustomTextareaField.vue'
import { useEditLink } from '@/features/links/api/use-edit-link'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import Checkbox from './ui/checkbox/Checkbox.vue'

const props = defineProps({
  hubs: Array,
  link: Object,
  categories: Array,
})

const router = useRouter()

const sharedWith = ref('reset')

const othersOption = ref(props.link.sharedEmail.length > 0 ? 'email' : props.link.hub_id ? 'group' : '')

const handleSharedWithChange = (value) => {
  sharedWith.value = value

  // Reset email and group options when 'Others' is not selected
  if (value !== 'Others') {
    emailOption.value = false
    groupOption.value = false
  }
}
const categoryOptions = props.categories.map((category) => ({
  label: category.name,
  value: category.name,
}))

const formSchema = toTypedSchema(z.object({
  url: z.string().url({ message: "Invalid URL" }),
  ref_name: z.string().min(1, { message: "Reference name is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  semester: z.string().min(1, { message: "Semester is required" }),
  session: z.string().min(1, { message: "Session is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  shared_with: z.string().min(1, { message: "Shared with is required" }),
  shared_details: z.object({
    email: z.string().optional(),
    group: z.string().optional(),
  }).optional(),
}))

const formState = reactive({
  url: props.link.url,
  ref_name: props.link.ref_name,
  description: props.link.description,
  semester: props.link.semester,
  session: props.link.session,
  category: props.link.category,
  shared_with: props.link.sharedWith,
  shared_details: {
    email: props.link.sharedEmail.join(', ') || '',
    group: props.link.hub_id || '',
  }
})

const emailOption = ref(formState.shared_details.email.length > 0)
const groupOption = ref(formState.shared_details.group !== '')

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: formSchema,
  initialValues: formState
})

const editMutation = useEditLink(props.link.id)

const onSubmit = handleSubmit((values) => {
  editMutation.mutate(values, {
    onSuccess: () => {
      router.push('/shared')
    }
  })
})

</script>

<template>
  <form @submit="onSubmit" class="max-w-7xl w-full grid grid-cols-4 gap-5">
    <!-- File Url -->
    <CustomInputField :label="'Link Url'" :placeholder="'Paste drive url'" :name="'url'" />

    <!-- Reference Name -->
    <CustomInputField :label="'Reference Name'" :placeholder="'Ref name for your file'" :name="'ref_name'" />

    <!-- Description -->
    <CustomTextareaField :label="'Link Description'" :placeholder="'Give a brief description to your link'"
      :name="'description'" :span="4" />

    <!-- Category -->
    <CustomSelectField :label="'Link Category'" :options="categoryOptions" :placeholder="'Select category'" :span="2"
      :name="'category'" v-model="formState.category"/>

    <!-- Session -->
    <CustomSelectField :label="'Session'" :options="sessionOptions" :placeholder="'Select your session'"
      :name="'session'" :span="1" v-model="formState.session"/>

    <!-- Semester -->
    <CustomSelectField :label="'Semester'" :options="semesterOptions" :placeholder="'Select your semester'"
      :name="'semester'" :span="1" v-model="formState.semester"/>

    <!-- Share With -->
    <CustomSelectField :label="'Share With'" :options="shareWithOptions" :placeholder="'Select who can view your link'"
      :name="'shared_with'" v-model="formState.shared_with" @update:modelValue="handleSharedWithChange" />

    <!-- Checkbox When User Select "Others" -->
    <div v-if="formState.shared_with.toLowerCase() === 'others'" class="w-full flex gap-2 flex-col ">
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
    <CustomInputField v-show="emailOption" :label="'Individual Emails'"
      :placeholder="'Type the email of the users, separate with (comma) if more than one'"
      :name="'shared_details.email'" v-model="formState.shared_details.email"/>

    <!-- Group Name -->
    <CustomSelectField v-show="groupOption" :label="'Group (Optional)'" :placeholder="'Select Your Group'"
      :options="hubs.map(hub => ({ label: hub.name, value: hub.id }))" :name="'shared_details.group'" :span="4" v-model="formState.shared_details.group"/>

    <Button type="submit" class="col-span-4 bg-primary text-white rounded-full mt-6" :disabled="isSubmitting">
      Update link
    </Button>
  </form>
</template>