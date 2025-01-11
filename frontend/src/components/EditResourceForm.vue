<script setup>
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { sessionOptions, semesterOptions, shareWithOptions } from '@/constant/options'
import { Button } from './ui/button'
import CustomInputField from './CustomInputField.vue'
import CustomSelectField from './CustomSelectField.vue'
import CustomTextareaField from './CustomTextareaField.vue'
import { useEditLink } from '@/features/links/api/use-edit-link'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import Checkbox from './ui/checkbox/Checkbox.vue'

const props = defineProps({
  hubs: Array,
  link: Object,
  categories: Array,
})

const router = useRouter()
const sharedWith = ref('reset')

const handleSharedWithChange = (value) => {
  sharedWith.value = value

  if (value !== 'Others') {
    emailOption.value = false
    groupOption.value = false
    formState.value.shared_details.email = ''
    formState.value.shared_details.group = ''
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

const formState = ref({
  url: props.link.url,
  ref_name: props.link.ref_name,
  description: props.link.description,
  semester: props.link.semester,
  session: props.link.session,
  category: props.link.category,
  shared_with: props.link.sharedWith,
  shared_details: {
    email: Array.isArray(props.link.sharedEmail) ? props.link.sharedEmail.join(', ') : props.link.sharedEmail || '',
    group: props.link.hub_id || '',
  }
})

// Initialize email option based on whether there are emails
const emailOption = ref(props.link.sharedEmail.length > 0)
const groupOption = ref(formState.value.shared_details.group !== '')

const { handleSubmit, resetField, isSubmitting } = useForm({
  validationSchema: formSchema,
  initialValues: formState.value
})

// Watch for changes in the email field
const handleEmailChange = (newValue) => {
  formState.value.shared_details.email = newValue
}

watch(emailOption, (value) => {
  if (!value) {
    formState.value.shared_details.email = ''
  }
})

watch(groupOption, (value) => {  
  if (!value) {
    formState.value.shared_details.group = ''
  }
})

const editMutation = useEditLink(props.link.id)

const onSubmit = handleSubmit((values) => {
  // Only include email and group if their respective options are checked
  const sharedDetails = {
    email: emailOption.value ? values.shared_details.email : '',
    group: groupOption.value ? values.shared_details.group : '',
  }

  const submitValues = {
    ...values,
    shared_details: sharedDetails,
  }

  editMutation.mutate(submitValues, {
    onSuccess: () => {
      router.push('/shared')
    }
  })
})
</script>

<template>
  <form @submit="onSubmit" class="max-w-7xl w-full grid grid-cols-4 gap-5">
    <CustomInputField :label="'Link Url'" :placeholder="'Paste drive url'" :name="'url'" v-model="formState.url" />
    <CustomInputField :label="'Reference Name'" :placeholder="'Ref name for your file'" :name="'ref_name'" v-model="formState.ref_name" />
    <CustomTextareaField :label="'Link Description'" :placeholder="'Give a brief description to your link'"
      :name="'description'" :span="4" v-model="formState.description" />
    <CustomSelectField :label="'Link Category'" :options="categoryOptions" :placeholder="'Select category'" :span="2"
      :name="'category'" v-model="formState.category"/>
    <CustomSelectField :label="'Session'" :options="sessionOptions" :placeholder="'Select your session'"
      :name="'session'" :span="1" v-model="formState.session"/>
    <CustomSelectField :label="'Semester'" :options="semesterOptions" :placeholder="'Select your semester'"
      :name="'semester'" :span="1" v-model="formState.semester"/>
    <CustomSelectField :label="'Share With'" :options="shareWithOptions" :placeholder="'Select who can view your link'"
      :name="'shared_with'" v-model="formState.shared_with" @update:modelValue="handleSharedWithChange" />

    <div v-if="formState.shared_with.toLowerCase() === 'others'" class="w-full flex gap-2 flex-col ">
      <div class="w-full flex items-center gap-2 text-sm">
        <Checkbox 
          v-model:checked="emailOption" 
          class="mr-2" 
        />
        <label>Individual Emails</label>
      </div>
      <div class="w-full flex items-center gap-2 text-sm">
        <Checkbox 
          v-model:checked="groupOption"
          class="mr-2" 
        />
        <label>Group</label>
      </div>
    </div>

    <CustomInputField 
      v-if="emailOption" 
      :label="'Individual Emails'"
      :placeholder="'Type the email of the users, separate with (comma) if more than one'"
      :name="'shared_details.email'" 
      v-model="formState.shared_details.email"
      @update:modelValue="handleEmailChange"
    />

    <CustomSelectField 
      v-if="groupOption" 
      :label="'Group (Optional)'" 
      :placeholder="'Select Your Group'"
      :options="hubs.map(hub => ({ label: hub.name, value: hub.id }))" 
      :name="'shared_details.group'" 
      :span="4" 
      v-model="formState.shared_details.group"
    />

    <Button type="submit" class="col-span-4 bg-primary text-white rounded-full mt-6" :disabled="isSubmitting">
      Update link
    </Button>
  </form>
</template>