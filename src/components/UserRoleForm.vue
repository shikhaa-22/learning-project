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

      <div v-if="form.designation === 'user'" class="soft-panel q-pa-md rounded-borders">
        <div class="text-caption soft-muted">User Id</div>
        <div class="text-body1 text-weight-medium">{{ nextUserId }}</div>
        <div class="text-caption soft-muted q-mt-xs">This value cannot be edited.</div>
      </div>

    <div class="col-12"><q-btn label="Continue" color="primary" style="border-radius: 12px;" class="full-width" @click="done" /></div>  
      
    
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useUserStore } from '../stores/userStore'

const emit = defineEmits([
  'done'
])

interface RoleFormState {
  designation: 'admin' | 'user' | ''
}

const form = reactive<RoleFormState>({
  designation: ''
})

const store = useUserStore()
const nextUserId = computed(() => store.getNextUserId())

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
        ? nextUserId.value
        : undefined
    })
  }
}
</script>