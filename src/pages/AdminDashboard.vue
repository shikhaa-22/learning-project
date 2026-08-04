<template>
  <q-page class="dashboard-page">
    <div class="dashboard-shell q-gutter-lg">
      <div class="row q-col-gutter-lg items-stretch">
        <div class="col-12 col-lg-5">
          <q-card class="glass-card welcome-card q-pa-lg">
            <div class="text-overline text-primary text-weight-medium">Admin workspace</div>
            <div class="text-h5 text-weight-bold q-mt-sm">
              Welcome {{ store.currentUser?.fullName ?? 'Admin' }}
            </div>
            <div class="soft-muted q-mt-sm">
              Create a new user with the simple three-step form.
            </div>
            <div class="row">
              <div class="col-12" style="height: 20px;"></div>
            </div>

            
            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-12 col-sm-4">
                <div class="stat-card">
                  <div class="text-caption soft-muted">Step</div>
                  <div class="text-h5 text-weight-bold">{{ currentStep }}/3</div>
                </div>
              </div>
              <div class="col-12 col-sm-4">
                
              </div>
              
            </div>
            <div class="row">
              <div class="col-12" style="height: 20px;"></div>
            </div>
            <q-linear-progress class="q-mt-lg" rounded size="8px" color="primary" :value="stepProgress" />
            <div class="row">
              <div class="col-12" style="height: 20px;"></div>
            </div>
            <div class="row q-col-gutter-sm q-mt-md">
              <div class="col-auto">
                <div class="step-pill" :class="{ 'step-pill--active': currentStep === 1 }">1. Details</div>
              </div>
              <div class="col-auto">
                <div class="step-pill" :class="{ 'step-pill--active': currentStep === 2 }">2. Role</div>
              </div>
              <div class="col-auto">
                <div class="step-pill" :class="{ 'step-pill--active': currentStep === 3 }">3. Preview</div>
              </div>
            </div>
          </q-card>
        </div>
        
        <div class="col-12 col-lg-7">
          <q-card class="glass-card section-card q-pa-lg">
            <template v-if="printedList">
              <div class="row items-center justify-between q-mb-md">
                <div>
                  <div class="text-overline text-primary">Saved users</div>
                  <div class="text-h5 text-weight-bold">{{ printedTitle }}</div>
                </div>
                <q-btn flat color="primary" icon="arrow_back" label="Back" @click="printedList = null; printedTitle = ''" />
              </div>

              <div class="preview-grid">
                <q-card v-for="u in printedList" :key="u.username" class="preview-field">
                  <div class="row items-center no-wrap q-mb-md">
                    <div class="col text-weight-medium text-h6 ellipsis">
                      {{ u.fullName }}
                    </div>

                    <q-chip
                      dense
                      color="primary"
                      text-color="white"
                      size="sm"
                      class="q-ml-sm"
                    >
                      {{ u.designation }}
                    </q-chip>
                  </div>
                  <div class="text-body2">@{{ u.username }}</div>
                  <div class="text-body2">{{ u.email }}</div>
                  <div class="text-body2">{{ u.phone }}</div>

                  <div
                    v-if="u.userId !== undefined"
                    class="text-body2"
                  >
                    ID: {{ u.userId }}
                  </div>
                </q-card>
              </div>
            </template>

            <template v-else>
              <UserBasicForm v-if="currentStep === 1" @next="handleBasicSubmit" />
              <UserRoleForm v-if="currentStep === 2" @done="handleRoleSubmit" />
              <UserPreview v-if="currentStep === 3" :user="formData" @created="handleCreated" />
            </template>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
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

const stepProgress = computed(() => currentStep.value / 3)

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