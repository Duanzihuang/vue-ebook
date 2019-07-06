import {mapGetters,mapActions} from 'vuex'
import {themeList} from './book'
import {addCss,removeAllCss} from '@/utils/book'
import {saveLocation,getReadTime} from '@/utils/localStorage'

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
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'cover',
      'metadata'
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
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setCover',
      'setMetadata'
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
    },
    // 刷新当前位置
    refreshLocation(){
      const currentLocation = this.currentBook.rendition.currentLocation()
      // 获取开始位置的cfi
      const startCfi = currentLocation.start.cfi
      // 根据开始位置的cfi获取进度
      const progress = this.currentBook.locations.percentageFromCfi(startCfi)
      // console.log(progress,currentLocation,startCfi)
      // 设置进度
      this.setProgress(Math.floor(progress  * 100))
      // 设置section
      this.setSection(currentLocation.start.index)
      // 保存阅读进度
      saveLocation(this.fileName,startCfi)
    },
    display(target,cb){
      if (target) {
        // 展示对应的位置
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation()

          cb && cb()
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refreshLocation()

          cb && cb()
        })
      }
    },
    // 隐藏头部标题栏和底部菜单
    hideTitleAndMenu(){
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setDefaultFontFamily(false)
    },
    getReadTimeText(){
      return this.$t('book.haveRead').replace('$1',this.getReadTimeByMinute())
    },
    getReadTimeByMinute(){
      const readTime = getReadTime(this.fileName)
      if (!readTime){
        return 0
      } else {
        return Math.ceil(readTime / 60)
      }
    }
  }
}
