<script setup>
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { sessionOptions, semesterOptions } from '@/constant/options'
import { useCreateHub } from '@/features/hubs/api/use-create-hub'
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog"

import { Button } from '../../../components/ui/button'
import CustomInputField from '@/components/CustomInputField.vue'
import CustomTextareaField from '@/components/CustomTextareaField.vue'
import CustomSelectField from '@/components/CustomSelectField.vue'
import { useGetHub } from '../api/use-get-hub'
import { computed, watch } from 'vue'
import useEditHubForm from '@/composables/useEditHubForm'
import { useEditHub } from '../api/use-edit-hub'

const { isOpen } = useEditHubForm()

const props = defineProps({
  hub: {
    type: Object,
    required: true,
  }
})

const hubQuery = useGetHub(props.hub.id)
const editMutation = useEditHub(props.hub.id)

const isDisabled = computed(() => hubQuery.isLoading.value)
const data = computed(() => hubQuery.data.value?.data || {})

const formSchema = toTypedSchema(z.object({
  name: z.string().min(3, { message: "Hub name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  session: z.string().min(1, { message: "Session is required" }),
  semester: z.string().min(1, { message: "Semester is required" }),
}))

const { handleSubmit, resetForm, isSubmitting, setValues } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    description: '',
    session: '',
    semester: '',
  }
})

const onSubmit = handleSubmit((values) => {
  editMutation.mutate(values)
  console.log(values)
})

// Watch for data changes and set the form values dynamically
watch(data, (newData) => {
  if (newData) {
    setValues({
      name: newData.name || "",
      description: newData.description || "",
      session: newData.session || "",
      semester: newData.semester || "",
    });
  }
});

// Reset form values when the dialog is opened
watch(isOpen, (open) => {
  if (open && data.value) {
    setValues({
      name: data.value.name || "",
      description: data.value.description || "",
      session: data.value.session || "",
      semester: data.value.semester || "",
    });
  }
});

</script>

<template>
  <div v-if="isDisabled">
    Loading...
  </div>
  <Dialog v-else :open="isOpen" @update:open="isOpen = $event">
    <DialogTrigger as-child>
      <Button variant="outline" @click.prevent="isOpen = true">Edit Hub</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Hub</DialogTitle>
        <DialogDescription>
          Something went wrong? No worries! You can edit your hub here.
        </DialogDescription>
      </DialogHeader>
      <form @submit="onSubmit" class="w-full grid grid-cols-4 gap-5">
        <!-- Hub Name -->
        <CustomInputField :label="'Hub Name'" :placeholder="'Give your hub a name!'" :name="'name'" />

        <!-- Description -->
        <CustomTextareaField :label="'Hub Description'" :placeholder="'Describe what is your hub about'"
          :name="'description'" :span="4" />

        <!-- Semester -->
        <CustomSelectField :label="'Semester'" :options="semesterOptions" :placeholder="'Select your semester'"
          :name="'semester'" :span="1" />

        <!-- Session -->
        <CustomSelectField :label="'Session'" :options="sessionOptions" :placeholder="'Select your session'"
          :name="'session'" :span="1" />

        <DialogFooter class="w-full col-span-full">
          <Button type="submit" class="w-full bg-primary text-white rounded-full mt-6" :disabled="isSubmitting">
            Submit
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>