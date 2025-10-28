import apiModule from './api'
const { api, apiAuth } = apiModule

export default {
  /**
   * @description 註冊
   * @param {UserCreationPayload} data 使用者註冊資料
   * @returns {Promise<ApiResponse<User>>} 註冊成功的回應 (注意：後端成功回應的 success key 有錯字 'sucess')
   */
  create(data) {
    return api.post('/user', data)
  },
  /**
   * @description 登入
   * @param {UserLoginPayload} data 使用者登入資料
   * @returns {Promise<LoginApiResponse>} 包含 token 和使用者資訊的回應
   */
  login(data) {
    return api.post('/user/login', data)
  },
  /**
   * @description 取得 Google OAuth 登入網址
   * @returns {string} Google OAuth 登入網址
   */
  getGoogleAuthUrl() {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
    return `${API_URL}/user/auth/google`
  },
  /**
   * @description 導向 Google OAuth 登入
   */
  redirectToGoogleAuth() {
    window.location.href = this.getGoogleAuthUrl()
  },
  /**
   * @description 取得使用者個人資料
   * @returns {Promise<ApiResponse<User>>} 包含使用者資訊的回應
   */
  getProfile() {
    return apiAuth.get('/user/profile')
  },
  /**
   * @description token 舊換新
   * @returns {Promise<RefreshApiResponse>} 包含新 token 的回應
   */
  refresh() {
    return apiAuth.patch('/user/refresh')
  },
  /**
   * @description 登出
   * @returns {Promise<ApiResponse<null>>} 登出成功的回應
   */
  logout() {
    return apiAuth.delete('/user/logout')
  },
}
