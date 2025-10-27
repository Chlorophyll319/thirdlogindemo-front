<route lang="yaml">
meta:
  title: Profile
  layout: admin
  login: login-only
</route>

<template>
  <!-- Main Content -->
  <!-- Loading State -->
  <div v-if="isLoading" class="bg-white rounded-2xl shadow-xl p-12">
    <div class="flex items-center justify-center">
      <div
        class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>
  </div>

  <!-- Error State -->
  <div v-else-if="errorMessage" class="bg-white rounded-2xl shadow-xl p-8">
    <div class="text-center">
      <div
        class="w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center"
      >
        <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Error</h2>
      <p class="text-gray-600 mb-6">{{ errorMessage }}</p>
      <button
        @click="router.push('/')"
        class="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors"
      >
        Back to Login
      </button>
    </div>
  </div>

  <!-- Profile Content -->
  <div v-else-if="userStore.user" class="bg-white rounded-2xl shadow-xl overflow-hidden">
    <!-- Header with Avatar -->
    <div class="bg-linear-to-br from-cyan-500 to-indigo-600 p-8 md:p-12 text-center">
      <div class="relative inline-block">
        <img
          v-if="userStore.user.avatar"
          :src="userStore.user.avatar"
          :alt="userStore.user.displayName"
          class="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
        />
        <div
          v-else
          class="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center"
        >
          <svg
            class="w-12 h-12 md:w-16 md:h-16 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
        </div>
      </div>
      <h2 class="mt-4 text-2xl md:text-3xl font-bold text-white">
        {{ userStore.user.displayName || 'User' }}
      </h2>
      <p class="mt-2 text-cyan-100">{{ userStore.user.email }}</p>
    </div>

    <!-- Profile Details -->
    <div class="p-8 md:p-12">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Account Information</h3>

      <div class="space-y-4">
        <!-- Email -->
        <div class="flex flex-col md:flex-row md:items-center border-b border-gray-200">
          <label class="md:w-1/3 text-sm font-medium text-gray-700">Email</label>
          <div class="mt-1 md:mt-0 md:w-2/3 text-gray-900">{{ userStore.user.email }}</div>
        </div>

        <!-- Display Name -->
        <div class="flex flex-col md:flex-row md:items-center border-b border-gray-200">
          <label class="md:w-1/3 text-sm font-medium text-gray-700">Display Name</label>
          <div class="mt-1 md:mt-0 md:w-2/3 text-gray-900">
            {{ userStore.user.displayName || 'N/A' }}
          </div>
        </div>

        <!-- Google ID (if exists) -->
        <div
          v-if="userStore.user.googleId"
          class="flex flex-col md:flex-row md:items-center border-b border-gray-200"
        >
          <label class="md:w-1/3 text-sm font-medium text-gray-700">Google ID</label>
          <div class="mt-1 md:mt-0 md:w-2/3 text-gray-900 font-mono text-sm">
            {{ userStore.user.googleId }}
          </div>
        </div>

        <!-- Login Method -->
        <div class="flex flex-col md:flex-row md:items-center">
          <label class="md:w-1/3 text-sm font-medium text-gray-700">Login Method</label>
          <div class="mt-1 md:mt-0 md:w-2/3">
            <span
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              Google OAuth 2.0
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const isLoading = ref(true)
const errorMessage = ref(null)

const handleLogout = async () => {
  await userStore.logout()
  router.push('/')
}

onMounted(async () => {
  try {
    // 如果沒有 token,跳回登入頁
    if (!userStore.token) {
      router.push('/')
      return
    }

    // 取得使用者資料
    await userStore.fetchProfile()
  } catch (error) {
    console.error('Failed to fetch profile:', error)
    errorMessage.value = 'Failed to load profile. Please try logging in again.'
  } finally {
    isLoading.value = false
  }
})
</script>
