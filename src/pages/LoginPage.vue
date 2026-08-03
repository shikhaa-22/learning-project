<template>
  <div class="q-pa-lg">

    <h2>Login</h2>

    <q-input
      v-model="username"
      label="Username"
      outlined
    />

    <br>

    <q-input
      v-model="password"
      label="Password"
      type="password"
      outlined
    />

    <br>

    <q-btn
      label="Login"
      color="primary"
      @click="login"
    />

  </div>
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

  for (let i = 0; i < store.users.length; i++) {

    const user = store.users[i]

    if (
      user &&
      user.username === username.value &&
      user.password === password.value
    ) {

      // Save logged-in user
      store.setCurrentUser(user)

      // Redirect based on designation
      if (user.designation === 'admin') {
        await router.push('/admin')
      } 
      else {
        await router.push('/user')
      }

      return
    }
  }

  alert('Invalid username or password')
}
</script>