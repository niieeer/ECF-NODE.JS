import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    articles: [],
    users: [],
    user: []
  }),
  persist: true,
  getters: {
    getArticles: (state) => state.articles,
    getUsers: (state) => state.users
  }
})
