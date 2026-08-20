<template>
  <q-page class="flex flex-center bg-grey-2">

    <q-card
      class="q-pa-lg"
      style="width: 420px; max-width: 90vw;"
    >

      <!-- Heading -->
      <q-card-section>

        <div class="text-h5 text-center">
          Welcome Back
        </div>

        <div class="text-subtitle2 text-grey text-center q-mt-sm">
          Login to your account
        </div>

      </q-card-section>


      <!-- Login Form -->
      <q-card-section>

        <q-form @submit="loginUser">

          <!-- Username -->
          <q-input
            v-model="username"
            label="Username"
            outlined
            :rules="[
              val => !!val || 'Username is required'
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
              val => !!val || 'Password is required'
            ]"
          />

          <!-- Login Button -->
          <q-btn
            type="submit"
            label="Login"
            color="primary"
            class="full-width q-mt-lg"
            :loading="loading"
            :disable="loading"
          />

        </q-form>

      </q-card-section>


      <!-- Register -->
      <q-card-section class="text-center">

        <div class="text-grey">
          Don't have an account?
        </div>

        <q-btn
          flat
          color="primary"
          label="Create Account"
          to="/register"
        />

      </q-card-section>

    </q-card>

  </q-page>
</template>


<script setup>

import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from '@/stores/auth-store'

// Quasar instance
const $q = useQuasar()
const authStore = useAuthStore()

// Form values
const username = ref('')
const password = ref('')


// Loading state
const loading = ref(false)


// Login function
async function loginUser () {

  loading.value = true

  try {

    const response = await fetch(
      'http://127.0.0.1:8000/auth/login',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          username: username.value,
          password: password.value
        })
      }
    )


    const data = await response.json()


    // Debug information
    console.log(
      'Login status:',
      response.status
    )

    console.log(
      'Login response:',
      data
    )


    // Check backend response
    if (!response.ok) {

      throw new Error(
        data.detail || 'Login failed'
      )

    }
    authStore.setAuthData(data)

    // JWT received
    console.log(
    'JWT token received:',
    data.access_token
    )
    authStore.setAuthData(data)
    console.log('Auth store:', authStore)

    // Success notification
    $q.notify({
      type: 'positive',
      message: 'Login successful'
    })


  } catch (error) {

    console.error(
      'Login error:',
      error
    )


    // Error notification
    $q.notify({
      type: 'negative',
      message: error.message || 'Login failed'
    })


  } finally {

    loading.value = false

  }

}

</script>