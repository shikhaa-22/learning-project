<template>
  <div class="q-pa-md">
    <h4>Preview New User</h4>

    <div class="q-mb-sm">Username: {{ props.user.username }}</div>
    <div class="q-mb-sm">Full Name: {{ props.user.fullName }}</div>
    <div class="q-mb-sm">Email: {{ props.user.email }}</div>
    <div class="q-mb-sm">Phone: {{ props.user.phone }}</div>
    <div class="q-mb-sm">Designation: {{ props.user.designation }}</div>
    <div v-if="props.user.userId !== undefined" class="q-mb-sm">User Id: {{ props.user.userId }}</div>

    <q-btn label="Create New User" color="primary" @click="createUser" />
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