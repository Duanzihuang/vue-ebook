export default {
  state: {
    fileName:'', // 文件名称
    menuVisible:false, // 是否显示菜单
    settingVisible:-1, // 设置是否显示 -1 不显示 0 字体 1 亮度 2 进度 3 菜单
    defaultFontSize:16, // 默认字体
    currentBook:null, // book实例
    defaultFontFamily:'Default', // 默认字体
    fontFamilyVisible: false // 字体列表是否可见
  },
  getters:{
    getFileName(state) {
      return state.fileName
    }
  },
  mutations: {
    setFileName(state,fileName){
      state.fileName = fileName
    },
    'SET_MENUVISIBLE': (state,menuVisible) => {
      state.menuVisible = menuVisible
    },
    'SET_SETTING_VISIBLE'(state,settingVisible){
      state.settingVisible = settingVisible
    },
    'SET_DEFAULT_FONT_SIZE'(state,defaultFontSize){
      state.defaultFontSize = defaultFontSize
    },
    'SET_CURRENT_BOOK'(state,currentBook){
      state.currentBook = currentBook
    },
    'SET_DEFAULT_FONT_FAMILY'(state,defaultFontFamily){
      state.defaultFontFamily = defaultFontFamily
    },
    'SET_FONT_FAMILY_VISIBLE'(state,fontFamilyVisible){
      state.fontFamilyVisible = fontFamilyVisible
    }
  },
  actions: {
    setFileName({commit},fileName){
      return commit('setFileName',fileName)
    }
  }
}
