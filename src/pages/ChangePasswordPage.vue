<template>
  <q-page class="flex flex-center bg-grey-2">

    <q-card
      class="q-pa-lg"
      style="width: 420px; max-width: 90vw;"
    >

      <!-- Heading -->
      <q-card-section>

        <div class="text-h5 text-center">
          Change Password
        </div>

        <div class="text-subtitle2 text-grey text-center q-mt-sm">
          Update your account password
        </div>

      </q-card-section>


      <!-- Form -->
      <q-card-section>

        <q-form @submit="changePassword">

          <!-- Current Password -->
          <q-input
            v-model="currentPassword"
            label="Current Password"
            type="password"
            outlined
            :rules="[
              val => !!val || 'Current password is required'
            ]"
          />

          <!-- New Password -->
          <q-input
            v-model="newPassword"
            label="New Password"
            type="password"
            outlined
            class="q-mt-md"
            :rules="[
              val => !!val || 'New password is required',
              val => val.length >= 8 || 'Password must be at least 8 characters'
            ]"
          />

          <!-- Confirm Password -->
          <q-input
            v-model="confirmPassword"
            label="Confirm New Password"
            type="password"
            outlined
            class="q-mt-md"
            :rules="[
              val => !!val || 'Please confirm your password',
              val => val === newPassword || 'Passwords do not match'
            ]"
          />

          <!-- Button -->
          <q-btn
            type="submit"
            label="Change Password"
            color="primary"
            class="full-width q-mt-lg"
            :loading="loading"
            :disable="loading"
          />

        </q-form>

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


// Pinia authentication store
const authStore = useAuthStore()


// Form values
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')


// Loading state
const loading = ref(false)


// Change password
async function changePassword () {

  loading.value = true

  try {

    // Check JWT
    if (!authStore.accessToken) {

      throw new Error(
        'You are not authenticated'
      )

    }


    const response = await fetch(
      'http://127.0.0.1:8000/auth/change_password',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',

          'Authorization':
            `Bearer ${authStore.accessToken}`
        },

        body: JSON.stringify({
          current_password: currentPassword.value,
          new_password: newPassword.value
        })
      }
    )


    const data = await response.json()


    console.log(
      'Change password status:',
      response.status
    )

    console.log(
      'Change password response:',
      data
    )


    if (!response.ok) {

      throw new Error(
        data.detail || 'Password change failed'
      )

    }


    $q.notify({
      type: 'positive',
      message: 'Password changed successfully'
    })


    // Clear form
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''


  } catch (error) {

    console.error(
      'Change password error:',
      error
    )


    $q.notify({
      type: 'negative',
      message: error.message || 'Password change failed'
    })


  } finally {

    loading.value = false

  }

}

</script>