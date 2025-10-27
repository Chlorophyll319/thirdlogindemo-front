// src/router/index.js
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory, START_LOCATION } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import { useUserStore } from '@/stores/user'

// 🛠️ 第 2 步：建立 router 實例並套用 layout
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 🧩 第 1 步：套用 Layout 與自動路由
  routes: setupLayouts(routes),
})

// 🛡️ 第 3 步：設定全域路由守衛 beforeEach（判斷登入狀態與頁面權限）
router.beforeEach(async (to, from, next) => {
  const user = useUserStore()

  // 如果是首次進入且已登入，嘗試載入使用者資料
  if (from === START_LOCATION && user.isLoggedIn) {
    try {
      await user.fetchProfile()
    } catch (error) {
      console.error('Failed to fetch profile on startup:', error)
      // 如果載入失敗，清除 token
      user.token = null
    }
  }

  // 路由權限檢查
  // 1. 檢查是否需要登入
  if (to.meta.login === 'login-only' && !user.isLoggedIn) {
    console.warn('未登入，重導向到首頁')
    next('/')
    return
  }

  // 2. 檢查是否需要管理員權限
  if (to.meta.admin === true && !user.isAdmin) {
    console.warn('非管理員，無法存取 admin 頁面')
    next('/')
    return
  }

  // 3. 已登入使用者不應該看到登入頁
  if (to.meta.login === 'no-login-only' && user.isLoggedIn) {
    next('/profile')
    return
  }

  // 4. 允許通過
  next()
})

// 🏷️ 第 4 步：導航完成後自動設定 document.title
router.afterEach((to) => {
  document.title = `${to.meta.title} | 網站標題`
})

// 🧯 第 5 步：onError 錯誤處理，避免 dynamic import 崩潰
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('router:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('router:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

// 🧹 第 6 步：router 初始化完成後清除錯誤 reload 記號
router.isReady().then(() => {
  localStorage.removeItem('router:dynamic-reload')
})

export default router
