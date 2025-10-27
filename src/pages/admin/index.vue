<route lang="yaml">
meta:
  name: AdminDashboard
  layout: admin
  title: Dashboard
  login: login-only
</route>

<template>
  <div class="flex items-center justify-center min-h-[60vh]">
    <div class="text-center">
      <div
        class="w-24 h-24 mx-auto bg-linear-to-br from-cyan-600 to-indigo-600 rounded-full flex items-center justify-center shadow-xl mb-6"
      >
        <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          />
        </svg>
      </div>
      <h1 class="text-4xl font-bold text-gray-900 mb-3">Welcome to Dashboard!</h1>
      <p class="text-lg text-gray-600 mb-8">
        This is a simple demo admin page. You're successfully logged in.
      </p>
      <div class="inline-flex gap-4">
        <router-link
          to="/profile"
          class="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition font-medium shadow-md"
        >
          View Profile
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// Simple welcome page
</script>
