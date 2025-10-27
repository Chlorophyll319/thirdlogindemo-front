<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <aside class="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg flex flex-col">
      <!-- Logo / Brand -->
      <div class="p-6 border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-linear-to-br from-cyan-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
              id="Information-Circle--Streamline-Core"
              height="14"
              width="14"
            >
              <desc>Information Circle Streamline Icon: https://streamlinehq.com</desc>
              <g id="information-circle--information-frame-info-more-help-point-circle">
                <path
                  id="Vector"
                  d="M7 13.375c3.5208 0 6.375 -2.8542 6.375 -6.375C13.375 3.47918 10.5208 0.625 7 0.625 3.47918 0.625 0.625 3.47918 0.625 7c0 3.5208 2.85418 6.375 6.375 6.375Z"
                  stroke-width="1"
                ></path>
                <path
                  id="Union"
                  fill="#ffffff"
                  fill-rule="evenodd"
                  d="M1.25 7c0 -3.17564 2.57436 -5.75 5.75 -5.75 3.1756 0 5.75 2.57436 5.75 5.75 0 3.1756 -2.5744 5.75 -5.75 5.75 -3.17564 0 -5.75 -2.5744 -5.75 -5.75ZM7 0C3.13401 0 0 3.13401 0 7c0 3.866 3.13401 7 7 7 3.866 0 7 -3.134 7 -7 0 -3.86599 -3.134 -7 -7 -7Zm0 5c-0.55228 0 -1 -0.44772 -1 -1s0.44772 -1 1 -1 1 0.44772 1 1 -0.44772 1 -1 1ZM5.25 6.5c0 -0.41421 0.33579 -0.75 0.75 -0.75h1c0.41421 0 0.75 0.33579 0.75 0.75v2.75h0.75c0.41421 0 0.75 0.33579 0.75 0.75 0 0.4142 -0.33579 0.75 -0.75 0.75h-3c-0.41421 0 -0.75 -0.3358 -0.75 -0.75 0 -0.41421 0.33579 -0.75 0.75 -0.75h0.75v-2H6c-0.41421 0 -0.75 -0.33579 -0.75 -0.75Z"
                  clip-rule="evenodd"
                  stroke-width="1"
                ></path>
              </g>
            </svg>
          </div>
          <h1 class="text-gray-900 font-bold text-lg">Demo Admin</h1>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <!-- Dashboard -->
        <router-link
          to="/admin"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-cyan-50 text-gray-700 hover:text-cyan-600 transition group"
          active-class="bg-cyan-100 text-cyan-600"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span class="font-medium">Dashboard</span>
        </router-link>

        <!-- Profile -->
        <router-link
          to="/profile"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-cyan-50 text-gray-700 hover:text-cyan-600 transition group"
          active-class="bg-cyan-100 text-cyan-600"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span class="font-medium">Profile</span>
        </router-link>
      </nav>

      <!-- Bottom Actions -->
      <div class="p-4 border-t border-gray-100">
        <!-- Logout -->
        <button
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 transition"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span class="font-medium">Log out</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 ml-64">
      <!-- Main Content -->
      <main class="p-8 min-h-screen bg-gray-50">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const pageTitle = computed(() => {
  return route.meta.title || 'Dashboard'
})

const handleLogout = async () => {
  await userStore.logout()
  router.push('/')
}
</script>

<style scoped>
/* Scrollbar Styling */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background-color: transparent;
}

nav::-webkit-scrollbar-thumb {
  background-color: rgb(209 213 219);
  border-radius: 9999px;
}

nav::-webkit-scrollbar-thumb:hover {
  background-color: rgb(156 163 175);
}
</style>
