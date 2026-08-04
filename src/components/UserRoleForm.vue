<template>
  <div class="q-pa-none">
    <div class="text-overline text-primary text-weight-medium">Step 2 of 3</div>
    <div class="text-h5 text-weight-bold q-mb-xs">User role details</div>
    <div class="soft-muted q-mb-lg">
      Choose whether this account is an admin or a regular user.
    </div>

    <q-form ref="formRef" class="q-gutter-md">
      <q-select
        v-model="form.designation"
        label="Designation"
        outlined
        stack-label
        color="primary"
        :options="['admin', 'user']"
        :rules="[val => !!val || 'Designation required']"
      />

      <q-input
        v-if="form.designation === 'user'"
        v-model="form.userId"
        label="User Id"
        outlined
        stack-label
        color="primary"
        type="number"
        hint="Required for regular users"
        :rules="[
          val => !!val || 'User Id required',
          val => /^\d+$/.test(String(val)) || 'User Id must be integer'
        ]"
      />

      <q-btn label="Continue" color="primary" unelevated class="full-width" @click="done" />
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const emit = defineEmits([
  'done'
])

interface RoleFormState {
  designation: 'admin' | 'user' | ''
  userId: string | number
}

const form = reactive<RoleFormState>({
  designation: '',
  userId: ''
})

type FormApi = { validate?: () => boolean | Promise<boolean> }
const formRef = ref<FormApi | null>(null)

async function done(){
  const valid = formRef.value && formRef.value.validate
    ? await formRef.value.validate()
    : true

  if (valid) {
    emit('done',{
      ...form,
      userId: form.designation === 'user'
        ? Number(form.userId)
        : undefined
    })
  }
}
</script>