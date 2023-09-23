const modalStore = createStore({
  state: {
    recipeModalShow: false,
  },
  mutations: {
    toggleRecipeModal: (state) => {
      state.recipeModalShow = !state.recipeModalShow
    }

  },
  actions: {

  },
  getters: {

  }

})
// export the store
export default modalStore