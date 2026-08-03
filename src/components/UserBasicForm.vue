<template>
  <div class="q-pa-md">

    <h4>User Basic Details</h4>

    <q-form ref="formRef">
      <q-input
        v-model="form.username"
        label="Username"
        outlined
        :rules="[val => !!val || 'Username required']"
      />

      <br>

      <q-input
        v-model="form.fullName"
        label="Full Name"
        outlined
        :rules="[val => !!val || 'Full name required']"
      />

      <br>

      <q-input
        v-model="form.email"
        label="Email"
        outlined
        :rules="[
          val => !!val || 'Email required',
          val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email'
        ]"
      />

      <br>

      <q-input
        v-model="form.phone"
        label="Phone Number"
        outlined
        :rules="[
          val => /^\d{10}$/.test(val) || 'Enter 10 digit phone number'
        ]"
      />

      <br>

      <q-btn
        label="Next"
        color="primary"
        @click="next"
      />
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