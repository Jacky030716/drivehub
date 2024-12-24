<script setup>
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { sessionOptions, semesterOptions } from '@/constant/options'
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
import { ref, watch } from 'vue'
import useEditHubForm from '@/composables/useEditHubForm'
import { useEditHub } from '../api/use-edit-hub'
import { EditIcon } from 'lucide-vue-next'

const { isOpen } = useEditHubForm()

const props = defineProps({
  hub: {
    type: Object,
    required: true,
  }
})

const editMutation = useEditHub(props.hub.id)

const formSchema = toTypedSchema(z.object({
  name: z.string().min(3, { message: "Hub name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  session: z.string().min(1, { message: "Session is required" }),
  semester: z.string().min(1, { message: "Semester is required" }),
  shared_email: z.string().optional(),
}))

// Deep clone initial state to avoid unwanted changes
const initialFormState = ref({
  name: props.hub.name || "",
  description: props.hub.description || "",
  session: props.hub.session || "",
  semester: props.hub.semester || "",
  shared_email: props.hub.participants?.join(", ") || "",
})

const formState = ref({ ...initialFormState.value });

const { handleSubmit, resetForm, isSubmitting, setValues } = useForm({
  validationSchema: formSchema,
  initialValues: formState.value
})

// Watch the dialog state to reset or populate form values
watch(isOpen, (open) => {
  if (open) {
    // When dialog is opened, populate form with initial values
    setValues({ ...initialFormState.value });
  } else {
    // When dialog is closed without submitting, reset form to initial state
    formState.value = { ...initialFormState.value };
  }
});

const onSubmit = handleSubmit((values) => {
  editMutation.mutate(values, {
    onSuccess: () => {
      isOpen.value = false; // Close dialog on successful submission
      // Update the initial state with submitted values
      initialFormState.value = { ...values };
    },
  });
});
</script>

<template>
  <Dialog :open="isOpen" @update:open="isOpen = $event">
    <DialogTrigger as-child>
      <Button size="sm" variant="outline" @click.prevent="isOpen = true" class="flex items-center gap-2">
        <EditIcon />
        Edit Group
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Hub</DialogTitle>
        <DialogDescription>
          Something went wrong? No worries! You can edit your group here.
        </DialogDescription>
      </DialogHeader>
      <form @submit="onSubmit" class="w-full grid grid-cols-4 gap-5">
        <!-- Hub Name -->
        <CustomInputField :label="'Hub Name'" :placeholder="'Give your hub a name!'" :name="'name'" v-model="formState.name"/>

        <!-- Description -->
        <CustomTextareaField :label="'Hub Description'" :placeholder="'Describe what is your hub about'"
          :name="'description'" :span="4" v-model="formState.description" />

        <!-- Session -->
        <CustomSelectField :label="'Session'" :options="sessionOptions" :placeholder="'Select your session'"
          :name="'session'" :span="1" v-model="formState.session" />

        <!-- Semester -->
        <CustomSelectField :label="'Semester'" :options="semesterOptions" :placeholder="'Select your semester'"
          :name="'semester'" :span="1" v-model="formState.semester" />

        <!-- Email -->
        <CustomInputField :label="'Individual Emails'"
          :placeholder="'Type the email of the users, separate with (comma) if more than one'" :name="'shared_email'" v-model="formState.shared_email" />

        <DialogFooter class="w-full col-span-full">
          <Button type="submit" class="w-full bg-primary text-white rounded-full mt-6" :disabled="isSubmitting">
            Submit
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
