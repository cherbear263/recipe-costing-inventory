import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: useSupabaseUser(),
    isLoading: false,
    cart: [],
    checkout: [],

  }),
  actions: () =>{
  },

})