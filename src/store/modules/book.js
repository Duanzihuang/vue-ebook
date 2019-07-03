export default {
  state: {
    fileName:''
  },
  getters:{
    getFileName(state) {
      return state.fileName
    }
  },
  mutations: {
    setFileName(state,fileName){
      state.fileName = fileName
    }
  },
  actions: {
    setFileName({commit},fileName){
      return commit('setFileName',fileName)
    }
  }
}
