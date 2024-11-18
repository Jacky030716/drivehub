<script setup>
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router';

import CustomInputField from '@/components/CustomInputField.vue';
import CustomSelectField from '@/components/CustomSelectField.vue';

const router = useRouter()

const roleOptions = [
  { value: 'staff', label: 'Staff' },
  { value: 'lecturer', label: 'Lecturer' },
  { value: 'student', label: 'Student' },
];

const formSchema = toTypedSchema(z.object({
  username: z.string().min(5),
  password: z.string().min(8),
  role: z.string()
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
  router.push('/')
})

</script>

<template>
  <main class="max-w-7xl mx-auto flex flex-col justify-center items-center max-h-screen overflow-hidden">
    <div class="min-w-[550px] p-16 flex flex-col justify-center items-center gap-16 bg-neutral-100/10 shadow-xl rounded-xl">
      <div class="flex flex-col items-center space-y-2">
        <img src="../assets/logo.png" alt="logo" class="w-[350px] object-cover inline-block" />
        <h1 class="text-6xl font-serif text-primary">DriveHub</h1>
        <p class="text-primary italic text-sm">Empowering Collaboration, Simplifying Sharing.</p>
      </div>

        <!-- Login Form -->
        <form class="w-full flex flex-col gap-10" @submit="onSubmit">
          <div class="w-full grid grid-cols-1 gap-4">
            <CustomInputField 
              :label="'Username'"
              :placeholder="'Enter your username'"
              :name="'username'"
            />
            <CustomInputField 
              :label="'Password'"
              :placeholder="'Enter your password'"
              :name="'password'"
              :type="'password'"
            />
            <CustomSelectField 
              :label="'Role'"
              :placeholder="'Select your role'"
              :name="'role'"
              :options="roleOptions"
              :span="4"
            />
          </div>

          <Button type="submit" class="w-full col-span-4 bg-primary text-white font-bold py-2 rounded-full">Sign In</Button>
        </form>
    </div>
  </main>
</template>