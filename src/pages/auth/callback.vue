<route lang="yaml">
meta:
  title: 'Processing...'
  login: ''
  admin: false
</route>

<template>
  <div class="flex items-center justify-center py-12 px-4 min-h-[calc(100vh-4rem)]">
    <div class="text-center">
      <!-- Loading Spinner -->
      <div
        class="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
      ></div>

      <h2 class="text-2xl font-semibold text-gray-900 mb-2">{{ message }}</h2>
      <p class="text-gray-600">Please wait...</p>

      <!-- Error Message -->
      <div
        v-if="error"
        class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto"
      >
        <p class="text-red-700 font-medium">{{ error }}</p>
        <button @click="goToLogin" class="mt-3 text-sm text-red-600 hover:text-red-800 underline">
          Return to login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const message = ref('Signing you in')
const error = ref(null)

onMounted(async () => {
  try {
    // 從 URL query 取得 token
    const token = route.query.token

    if (!token) {
      // 檢查是否有錯誤參數
      if (route.query.error) {
        throw new Error(`Authentication failed: ${route.query.error}`)
      }
      throw new Error('No token received from authentication')
    }

    // 儲存 token 到 store
    userStore.login(token)

    message.value = 'Authentication successful!'

    // 短暫延遲後跳轉到 profile 頁
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push('/profile')
  } catch (err) {
    console.error('Callback error:', err)
    error.value = err.message || 'Authentication failed. Please try again.'
  }
})

const goToLogin = () => {
  router.push('/')
}
</script>
