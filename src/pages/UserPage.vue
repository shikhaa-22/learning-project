<template>
  <q-page class="user-page flex flex-center">
    <div class="user-shell">
      <q-card class="glass-card section-card q-pa-lg">
        <div class="row q-col-gutter-lg items-center">
          <div class="col-12 col-md-4">
            <div class="stat-card text-center">
              <div class="row">
                <div class="col-12" style="height: 40px;"></div>
              </div>
              <q-avatar size="72px" color="primary" text-color="white" icon="person" class="q-mb-sm" />
              <div class="text-overline text-primary">Signed in user</div>
              <div class="text-h5 text-weight-bold">
                {{ store.currentUser?.fullName ?? 'User' }}
              </div>
              <div class="soft-muted">{{ store.currentUser?.designation ?? 'user' }}</div>
            </div>
          </div>

          <div class="col-12 col-md-8">
            <div class="text-overline text-primary text-weight-medium">User dashboard</div>
            <div class="text-h5 text-weight-bold q-mt-sm q-mb-sm">Welcome back, {{ store.currentUser?.fullName ?? 'User' }}</div>
            <div class="soft-muted q-mb-lg">
              Users Account Details.
            </div>

            <div class="preview-grid q-mb-lg">
              <div class="preview-field preview-field-smaller">
                <div class="text-caption soft-muted">Username</div>
                <div class="text-body1 text-weight-medium">@{{ store.currentUser?.username ?? 'guest' }}</div>
              </div>
              <div class="preview-field preview-field-smaller">
                <div class="text-caption soft-muted">Email</div>
                <div class="text-body1 text-weight-medium">{{ store.currentUser?.email ?? 'not set' }}</div>
              </div>
              <div class="preview-field preview-field-smaller">
                <div class="text-caption soft-muted">Phone</div>
                <div class="text-body1 text-weight-medium">{{ store.currentUser?.phone ?? 'not set' }}</div>
              </div>
              <div class="preview-field preview-field-smaller">
                <div class="text-caption soft-muted">Role</div>
                <div class="text-body1 text-weight-medium text-capitalize">{{ store.currentUser?.designation ?? 'user' }}</div>
              </div>
            </div>

            
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/userStore'

const store = useUserStore()
</script>