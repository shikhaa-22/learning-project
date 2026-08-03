<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">
      Welcome {{ store.currentUser?.fullName ?? 'User' }}
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/userStore'

const store = useUserStore()
</script>