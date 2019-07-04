import {mapGetters,mapActions} from 'vuex'
import {themeList} from './book'
import {addCss,removeAllCss} from '@/utils/book'

export const ebookMixins = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'currentBook',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme'
    ]),
    themeList(){
      return themeList(this)
    }
  },
  methods: {
    ...mapActions([
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setCurrentBook',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme'
    ]),
    // 初始化全局样式
    initGlobalStyle(){
      // 先清除之前的样式
      removeAllCss()
      switch (this.defaultTheme) {
        case 'Default':
          addCss(`${process.env.VUE_APP_THEME_URL}/theme_default.css`)
          break
        case 'Eye':
          addCss(`${process.env.VUE_APP_THEME_URL}/theme_eye.css`)
          break
        case 'Gold':
          addCss(`${process.env.VUE_APP_THEME_URL}/theme_gold.css`)
          break
        case 'Night':
          addCss(`${process.env.VUE_APP_THEME_URL}/theme_night.css`)
          break
        default:
          addCss(`${process.env.VUE_APP_THEME_URL}/theme_default.css`)
          break
      }
    }
  }
}
