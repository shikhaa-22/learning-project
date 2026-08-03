<template>
  <div class="q-pa-md">

    <h4>User Role Details</h4>

    <q-form ref="formRef">
      <q-select
        v-model="form.designation"
        label="Designation"
        outlined
        :options="['admin', 'user']"
        :rules="[val => !!val || 'Designation required']"
      />

      <br>

      <q-input
        v-if="form.designation === 'user'"
        v-model="form.userId"
        label="User Id"
        outlined
        type="number"
        :rules="[
          val => !!val || 'User Id required',
          val => /^\d+$/.test(String(val)) || 'User Id must be integer'
        ]"
      />

      <br>

      <q-btn
        label="Done"
        color="primary"
        @click="done"
      />
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