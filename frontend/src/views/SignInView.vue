<script setup>
import * as z from 'zod'
import { Button  } from '@/components/ui/button';
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router';

import CustomInputField from '@/components/CustomInputField.vue';
import { useLoginUser } from '@/features/user/api/use-login-user';

const router = useRouter()
const createMutation = useLoginUser()


const formSchema = toTypedSchema(z.object({
  username: z.string().min(4, { message: 'Username must be at least 4 characters' }),
  password: z.string().min(5, { message: 'Password must be at least 5 characters' }),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  createMutation.mutate(values, {
    onSuccess: () => {
      router.push('/')
    }
  })
})

</script>

<template>
  <main class="max-w-7xl mx-auto flex flex-col justify-center items-center min-h-screen overflow-y-auto">
    <div class="min-w-[550px] p-16 flex flex-col justify-center items-center gap-16 bg-neutral-100/10 shadow-xl rounded-xl">
      <div class="flex flex-col items-center space-y-3.5">
        <img src="../assets/logo.png" alt="logo" class="w-[300px] object-cover inline-block" />
        <div class="w-full flex flex-col items-center">
          <h1 class="text-4xl font-serif text-primary">DriveHub</h1>
          <p class="text-primary italic text-sm">Empowering Collaboration, Simplifying Sharing.</p>
        </div>
      </div>

        <!-- Login Form -->
        <form class="w-full flex flex-col gap-10" @submit.prevent="onSubmit">
          <div class="w-full grid grid-cols-1 gap-4">
            <CustomInputField 
              :label="'Username'"
              :placeholder="'Enter your username (matric number or staff ID)'"
              :name="'username'"
            />
            <CustomInputField 
              :label="'Password'"
              :placeholder="'Enter your password (NRIC)'"
              :name="'password'"
              :type="'password'"
            />
          </div>

          <Button 
            type="submit" 
            class="w-full col-span-4 bg-primary text-white font-bold py-2 rounded-full"
          >Sign In</Button>
        </form>
    </div>
  </main>
</template>