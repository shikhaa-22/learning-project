<template>
  <div class="q-pa-none">
    <div class="text-overline text-primary text-weight-medium">Step 1 of 3</div>
    <div class="text-h5 text-weight-bold q-mb-xs">User basic details</div>
    <div class="soft-muted q-mb-lg">Start with the account information that identifies the user.</div>

    <q-form ref="formRef" class="q-gutter-md">
      <q-input
        v-model="form.username"
        label="Username"
        outlined
        stack-label
        color="primary"
        placeholder="Choose a unique username"
        :rules="[val => !!val || 'Username required']"
      />

      <q-input
        v-model="form.fullName"
        label="Full Name"
        outlined
        stack-label
        color="primary"
        placeholder="Enter the person's full name"
        :rules="[val => !!val || 'Full name required']"
      />

      <q-input
        v-model="form.email"
        label="Email"
        outlined
        stack-label
        color="primary"
        placeholder="name@example.com"
        :rules="[
          val => !!val || 'Email required',
          val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email'
        ]"
      />

      <q-input
        v-model="form.phone"
        label="Phone Number"
        outlined
        stack-label
        color="primary"
        placeholder="10 digit number"
        :rules="[
          val => /^\d{10}$/.test(val) || 'Enter 10 digit phone number'
        ]"
      />

      <q-btn label="Continue" color="primary" unelevated class="full-width" @click="next" />
    </q-form>
  </div>
</template>


<script setup lang="ts">

import { reactive, ref } from 'vue'


const emit = defineEmits([
  'next'
])


const form = reactive({
  username: '',
  fullName: '',
  email: '',
  phone: ''
})

type FormApi = { validate?: () => boolean | Promise<boolean> }
const formRef = ref<FormApi | null>(null)

async function next() {
  const valid = formRef.value && formRef.value.validate
    ? await formRef.value.validate()
    : true

  if (valid) {
    emit('next', {
      ...form
    })
  }
}

</script>