import { defineStore } from 'pinia'

export const useErrorStore = defineStore({
  id: 'main',
  state: () => ({
    error: [
      {
        code: '442',
        message: "Erreur le champ de recherche n'est pas valide"
      },
      {
        code: '434',
        message: "Erreur pendant la récuperation des données"
      }
    ]
  }),
  getters: {
    getError: (state) => state.error,
  }
})
