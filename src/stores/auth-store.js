import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {

  state: () => ({
    accessToken: null,
    tokenType: null,
    username: null,
    role: null
  }),

  getters: {

    isAuthenticated: (state) => {
      return !!state.accessToken
    }

  },

  actions: {

    setAuthData(data) {

      this.accessToken = data.access_token
      this.tokenType = data.token_type

    },

    setUserData(username, role) {

      this.username = username
      this.role = role

    },

    logout() {

      this.accessToken = null
      this.tokenType = null
      this.username = null
      this.role = null

    }

  }

})