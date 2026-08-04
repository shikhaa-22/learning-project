<template>
  <q-page class="auth-page flex flex-center">
    <div class="auth-shell">
      <q-card class="glass-card auth-card">
        <div class="row items-stretch">
          <div class="col-12 col-md-5 auth-hero">
            <div class="text-overline text-weight-medium q-mb-sm"></div>
            <div class="text-h5 text-weight-bold q-mb-md">
              Sign in to continue.
            </div>
            <div class="text-body2 q-mb-md">
              Use one of the sample accounts below to open the admin or user view.
            </div>

            <q-list class="auth-credentials rounded-borders">
              <q-item>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white" icon="admin_panel_settings" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-medium">Admin account</q-item-label>
                  <q-item-label caption>admin / admin123</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white" icon="person" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-medium">User account</q-item-label>
                  <q-item-label caption>shikhaa / shikhaa123</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-12 col-md-7 auth-form-panel">
            <div class="text-h6 text-weight-bold q-mb-sm">Welcome back</div>
            <div class="soft-muted q-mb-lg">
              Enter your username and password to continue.
            </div>

            <q-form class="q-gutter-md" @submit.prevent="login">
              <q-input
                v-model="username"
                label="Username"
                outlined
                color="primary"
                stack-label
                autocomplete="username"
                placeholder="Enter your username"
                prefix="@"
              />

              <q-input
                v-model="password"
                label="Password"
                type="password"
                outlined
                color="primary"
                stack-label
                autocomplete="current-password"
                placeholder="Enter your password"
                prefix="*"
              />

              <div class="col-12">
                <q-btn
                  class="full-width"
                  color="primary"
                  style="border-radius: 12px;"
                  size="lg"
                  label="Sign in"
                  type="submit"
                />
              </div>
            </q-form>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const username = ref('')
const password = ref('')

const router = useRouter()
const store = useUserStore()

async function login() {
  for (let index = 0; index < store.users.length; index += 1) {
    const user = store.users[index]

    if (user && user.username === username.value && user.password === password.value) {
      store.setCurrentUser(user)

      if (user.designation === 'admin') {
        await router.push('/admin')
      } else {
        await router.push('/user')
      }

      return
    }
  }

  alert('Invalid username or password')
}
</script>