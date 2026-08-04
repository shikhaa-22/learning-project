<template>
  <div class="q-pa-none">
    <div class="text-overline text-primary text-weight-medium">Step 3 of 3</div>
    <div class="text-h5 text-weight-bold q-mb-xs">Preview new user</div>
    <div class="soft-muted q-mb-lg">Review the details before saving the account.</div>

    <div class="preview-grid q-mb-lg">
      <div class="preview-field preview-field-small">
        <div class="text-caption soft-muted">Username</div>
        <div class="text-body1 text-weight-medium">@{{ props.user.username }}</div>
      </div>
      <div class="preview-field preview-field-small">
        <div class="text-caption soft-muted">Full name</div>
        <div class="text-body1 text-weight-medium">{{ props.user.fullName }}</div>
      </div>
      <div class="preview-field preview-field-small">
        <div class="text-caption soft-muted">Email</div>
        <div class="text-body1 text-weight-medium">{{ props.user.email }}</div>
      </div>
      <div class="preview-field preview-field-small">
        <div class="text-caption soft-muted">Phone</div>
        <div class="text-body1 text-weight-medium">{{ props.user.phone }}</div>
      </div>
      <div class="preview-field preview-field-small">
        <div class="text-caption soft-muted">Designation</div>
        <div class="text-body1 text-weight-medium text-capitalize">{{ props.user.designation }}</div>
      </div>
      <div v-if="props.user.userId !== undefined" class="preview-field preview-field-small">
        <div class="text-caption soft-muted">User Id</div>
        <div class="text-body1 text-weight-medium">{{ props.user.userId }}</div>
      </div>
    </div>

    <q-banner rounded class="soft-panel q-mb-lg">
      If the details look right, save the new user.
    </q-banner>

    <q-btn label="Create New User" color="primary" unelevated class="full-width" @click="createUser" />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/userStore'
import type { User } from '../stores/userStore'
import { useQuasar } from 'quasar'

const store = useUserStore()

const props = defineProps<{
  user: {
    username: string
    fullName: string
    email: string
    phone: string
    designation: 'admin' | 'user'
    userId?: number
  }
}>()

const emit = defineEmits(['created'])

function createUser() {
  const newUser: Partial<User> = {
    username: props.user.username,
    fullName: props.user.fullName,
    email: props.user.email,
    phone: props.user.phone,
    designation: props.user.designation
  }

  if (typeof props.user.userId === 'number' && Number.isInteger(props.user.userId)) {
    ;(newUser as User).userId = props.user.userId
  }

  store.addUser(newUser as User)
  emit('created', newUser)
  const $q = useQuasar()
  $q.notify({ type: 'positive', message: 'User Created Successfully' })
}
</script>