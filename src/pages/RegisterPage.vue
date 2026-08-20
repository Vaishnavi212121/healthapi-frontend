<template>
  <q-page class="flex flex-center bg-grey-2">

    <q-card
      class="q-pa-lg"
      style="width: 420px; max-width: 90vw;"
    >

      <!-- Heading -->
      <q-card-section>

        <div class="text-h5 text-center">
          Create Account
        </div>

        <div class="text-subtitle2 text-grey text-center q-mt-sm">
          Sign up to create a new account
        </div>

      </q-card-section>


      <!-- Registration Form -->
      <q-card-section>

        <q-form @submit="registerUser">

          <!-- Username -->
          <q-input
            v-model="username"
            label="Username"
            outlined
            :rules="[
              val => !!val || 'Username is required',
              val => val.length >= 3 ||
                'Username must be at least 3 characters'
            ]"
          />


          <!-- Password -->
          <q-input
            v-model="password"
            label="Password"
            type="password"
            outlined
            class="q-mt-md"
            :rules="[
              val => !!val || 'Password is required',
              val => val.length >= 8 ||
                'Password must be at least 8 characters'
            ]"
          />


          <!-- Confirm Password -->
          <q-input
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            outlined
            class="q-mt-md"
            :rules="[
              val => !!val || 'Please confirm your password',
              val => val === password ||
                'Passwords do not match'
            ]"
          />


          <!-- Submit Button -->
          <q-btn
            type="submit"
            label="Sign Up"
            color="primary"
            class="full-width q-mt-lg"
            :loading="loading"
          />

        </q-form>

      </q-card-section>

    </q-card>

  </q-page>
</template>


<script setup>

import { ref } from 'vue'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'


// Router
const router = useRouter()


// Form values
const username = ref('')
const password = ref('')
const confirmPassword = ref('')


// Loading state
const loading = ref(false)


// Register user
async function registerUser () {
  loading.value = true

  try {
    const response = await fetch(
      'http://127.0.0.1:8000/auth/register',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          username: username.value.trim(),
          password: password.value,
          role: 'USER'
        })
      }
    )

    const data = await response.json()

    console.log('Status:', response.status)
    console.log('Response:', data)

    if (!response.ok) {
      throw new Error(
        data.detail || 'Registration failed'
      )
    }

    Notify.create({
      type: 'positive',
      message: 'Account created successfully'
    })

    router.push('/login')

  } catch (error) {

    console.error('Registration error:', error)

    Notify.create({
      type: 'negative',
      message: error.message || 'Registration failed'
    })

  } finally {

    loading.value = false

  }
}
</script>