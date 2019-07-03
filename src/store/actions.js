export default {
  setMenuVisible({commit},menuVisible){
    return commit('SET_MENUVISIBLE',menuVisible)
  },
  setSettingVisible({commit},settingVisible){
    return commit('SET_SETTING_VISIBLE',settingVisible)
  },
  setDefaultFontSize({commit},fontSize){
    return commit('SET_DEFAULT_FONT_SIZE',fontSize)
  },
  setCurrentBook({commit},currentBook){
    return commit('SET_CURRENT_BOOK',currentBook)
  },
  setDefaultFontFamily({commit},defaultFontFamily){
    return commit('SET_DEFAULT_FONT_FAMILY',defaultFontFamily)
  },
  setFontFamilyVisible({commit},fontFamilyVisible){
    return commit('SET_FONT_FAMILY_VISIBLE',fontFamilyVisible)
  }
}
