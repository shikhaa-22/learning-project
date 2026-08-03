<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Admin Dashboard</div>
    <div class="text-subtitle1 q-mb-md">Welcome {{ store.currentUser?.fullName ?? 'Admin' }}</div>
    <div class="text-subtitle2 q-mb-md">Add a New User (Step {{ currentStep }} of 3)</div>

    <template v-if="printedList">
      <div class="q-mb-md">
        <div class="text-h6">{{ printedTitle }}</div>
      </div>
      <div>
        <div v-for="u in printedList" :key="u.username" class="q-pa-sm q-mt-xs">
          <div><strong>Username:</strong> {{ u.username }}</div>
          <div><strong>Full Name:</strong> {{ u.fullName }}</div>
          <div><strong>Email:</strong> {{ u.email }}</div>
          <div><strong>Phone:</strong> {{ u.phone }}</div>
          <div><strong>Designation:</strong> {{ u.designation }}</div>
          <div v-if="u.userId !== undefined"><strong>User Id:</strong> {{ u.userId }}</div>
          <q-separator class="q-my-sm" />
        </div>
      </div>
      <div class="q-mt-lg">
        <q-btn label="Back" color="primary" @click="printedList = null; printedTitle = ''" />
      </div>
    </template>

    <template v-else>
      <!-- Step 1: Basic Details Form -->
      <UserBasicForm
        v-if="currentStep === 1"
        @next="handleBasicSubmit"
      />

      <!-- Step 2: Role Details & Conditional User ID Form -->
      <UserRoleForm
        v-if="currentStep === 2"
        @done="handleRoleSubmit"
      />

      <!-- Step 3: Preview & Confirm Creation -->
      <UserPreview
        v-if="currentStep === 3"
        :user="formData"
        @created="handleCreated"
      />
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore, type User } from '../stores/userStore'
import UserBasicForm from '../components/UserBasicForm.vue'
import UserRoleForm from '../components/UserRoleForm.vue'
import UserPreview from '../components/UserPreview.vue'

const currentStep = ref(1)

interface AdminFormData {
  username: string
  fullName: string
  email: string
  phone: string
  designation: 'admin' | 'user'
  userId?: number
}

const formData = reactive<AdminFormData>({
  username: '',
  fullName: '',
  email: '',
  phone: '',
  designation: 'user'
})

const printedList = ref<User[] | null>(null)
const printedTitle = ref('')
const store = useUserStore()

function handleBasicSubmit(data: { username: string; fullName: string; email: string; phone: string }) {
  formData.username = data.username
  formData.fullName = data.fullName
  formData.email = data.email
  formData.phone = data.phone
  currentStep.value = 2
}

function handleRoleSubmit(data: { designation: 'admin' | 'user'; userId?: number }) {
  formData.designation = data.designation
  if (typeof data.userId === 'number' && Number.isInteger(data.userId)) {
    formData.userId = data.userId
  } else {
    // remove optional property when undefined or invalid to match prop expectations
    delete (formData as Partial<AdminFormData>).userId
  }
  currentStep.value = 3
}

function handleCreated(createdUser: User) {
  if (createdUser.designation === 'admin') {
    printedTitle.value = 'Admins'
    printedList.value = store.users.filter(u => u.designation === 'admin')
  } else {
    printedTitle.value = 'Users'
    printedList.value = store.users.filter(u => u.designation === 'user')
  }
}
</script>