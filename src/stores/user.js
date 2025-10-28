import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiAuth } from '@/services/api'

export const useUserStore = defineStore(
  'user',
  () => {
    // State
    const token = ref(null)
    const user = ref(null)

    // Getters
    const isLoggedIn = computed(() => !!token.value)
    const isAdmin = computed(() => user.value?.role === 'admin' || user.value?.isAdmin === true)

    // Actions
    const setToken = (newToken) => {
      token.value = newToken
    }

    const setUser = (userData) => {
      user.value = userData
    }

    const login = (authToken) => {
      token.value = authToken
    }

    const logout = async () => {
      try {
        await apiAuth.post('/user/logout')
      } catch (error) {
        console.error('Logout API error:', error)
      } finally {
        // 無論 API 成功與否，都清除本地狀態
        token.value = null
        user.value = null
      }
    }

    const fetchProfile = async () => {
      // 動態引入避免循環依賴
      const userService = (await import('@/services/user')).default
      try {
        const { data } = await userService.getProfile()
        if (data.success) {
          user.value = data.data
        }
        return data
      } catch (error) {
        console.error('Fetch profile error:', error)
        throw error
      }
    }

    return {
      token,
      user,
      isLoggedIn,
      isAdmin,
      setToken,
      setUser,
      login,
      logout,
      fetchProfile,
    }
  },
  {
    persist: {
      key: 'user',
      paths: ['token'],
    },
  },
)
