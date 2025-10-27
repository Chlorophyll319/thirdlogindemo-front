<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <router-link to="/" class="text-xl font-bold text-gray-900"> LoginDemo </router-link>
          </div>

          <!-- Navigation Links (已登入) -->
          <div v-if="userStore.isLoggedIn" class="flex items-center gap-4">
            <router-link
              to="/profile"
              class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Profile
            </router-link>
            <button
              @click="handleLogout"
              class="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Logout
            </button>
          </div>

          <!-- Navigation Links (未登入) -->
          <div v-else class="flex items-center gap-4">
            <button
              @click="handleProfileClick"
              class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Profile
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <router-view />
    </main>

    <!-- Login Required Dialog -->
    <div
      v-if="showLoginDialog"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showLoginDialog = false"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
        <!-- Icon -->
        <div class="flex items-center justify-center mb-4">
          <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg
              class="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <!-- Title & Message -->
        <h3 class="text-xl font-semibold text-gray-900 text-center mb-2">Login Required</h3>
        <p class="text-gray-600 text-center mb-6">
          You need to be logged in to access the Profile page. Please login with your Google
          account.
        </p>

        <!-- Buttons -->
        <div class="flex gap-3">
          <button
            @click="showLoginDialog = false"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            @click="goToLogin"
            class="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const userStore = useUserStore()

const showLoginDialog = ref(false)

const handleProfileClick = () => {
  showLoginDialog.value = true
}

const goToLogin = () => {
  showLoginDialog.value = false
  router.push('/')
}

const handleLogout = async () => {
  await userStore.logout()
  router.push('/')
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>
