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

import CustomInputField from '@/components/CustomInputField.vue'
import CustomTextareaField from '@/components/CustomTextareaField.vue'
import CustomSelectField from '@/components/CustomSelectField.vue'
import Button from '@/components/ui/button/Button.vue'
import { useHubForm } from '@/hooks/useHubForm'
import DialogClose from '@/components/ui/dialog/DialogClose.vue'
import { useGetUsers } from '@/features/user/api/use-get-users'
import { computed, onMounted } from 'vue'

defineProps({
  hubs: Array,
})

const formSchema = toTypedSchema(z.object({
  name: z.string().min(3, { message: "Hub name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  session: z.string().min(1, { message: "Session is required" }),
  semester: z.string().min(1, { message: "Semester is required" }),
  shared_email: z.string().optional(),
}))

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: formSchema,
})

const mutation = useCreateHub()

const onSubmit = handleSubmit((values) => {
  mutation.mutate(values, {
    onSuccess: () => {
      resetForm()
    },
  })
})

</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="rounded-full">
        Add New Group
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new DriveHub Group</DialogTitle>
        <DialogDescription>
          Fill in the form below to create a new group
          {{ users }}
        </DialogDescription>
      </DialogHeader>
      <form @submit="onSubmit" class="w-full grid grid-cols-4 gap-5">
        <!-- Hub Name -->
        <CustomInputField :label="'Group Name'" :placeholder="'Give your group a name!'" :name="'name'" />

        <!-- Description -->
        <CustomTextareaField :label="'Group Description'" :placeholder="'Describe what is your group about'"
          :name="'description'" :span="4" />

        <!-- Session -->
        <CustomSelectField :label="'Session'" :options="sessionOptions" :placeholder="'Select your session'"
          :name="'session'" :span="1" />

        <!-- Semester -->
        <CustomSelectField :label="'Semester'" :options="semesterOptions" :placeholder="'Select your semester'"
          :name="'semester'" :span="1" />

        <!-- Email -->
        <CustomInputField :label="'Individual Emails'"
          :placeholder="'Type the email of the users, separate with (comma) if more than one'" :name="'shared_email'" />

        <DialogFooter class="w-full col-span-full">
          <DialogClose class="w-full">
            <Button type="submit" class="w-full bg-primary text-white rounded-full mt-6" :disabled="isSubmitting">
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>