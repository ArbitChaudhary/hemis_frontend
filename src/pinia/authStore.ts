import type { IAuth } from '@/views/login/common/auth_types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null as IAuth | null,
  }),
  actions: {
    setUserInfo(userInfo: IAuth) {
      this.userInfo = userInfo
    },
  },
  persist: true,
})
