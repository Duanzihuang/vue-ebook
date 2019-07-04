<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Epub from 'epubjs'
import {ebookMixins} from '../../utils/mixins'
import {getFontFamily,saveFontFamily,saveFontSize,getFontSize,saveTheme,getTheme} from '@/utils/localStorage'
export default {
  mixins:[ebookMixins],
  computed:{
    ...mapGetters({
      fileName:'getFileName'
    })
  },
  methods:{
    prevPage(){
      this.rendition.prev()
    },
    nextPage(){
      this.rendition.next()
    },
    toggleTitleAndMenu(){
      if (this.menuVisible) {
        this.setSettingVisible(-1)
        this.setFontFamilyVisible(false)
      }
      this.setMenuVisible(!this.menuVisible)
    },
    initFontSize(){
      let fontSize = getFontSize(this.fileName)
      if (!fontSize){
        saveFontSize(this.fileName,this.defaultFontSize)
      }

      // 设置电子书字体大小
      this.rendition.themes.fontSize(fontSize)
      this.setDefaultFontSize(fontSize)
    },
    initFontFamily(){
      let fontFamily = getFontFamily(this.fileName)
      if (!fontFamily){
        saveFontFamily(this.fileName,this.defaultFontFamily)
      }

      // 设置电子书字体
      this.rendition.themes.font(fontFamily)
      this.setDefaultFontFamily(fontFamily)
    },
    // 初始化主题
    initTheme(){
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        saveTheme(this.fileName,defaultTheme)
      }

      this.setDefaultTheme(defaultTheme)
      this.themeList.forEach(item => {
        this.rendition.themes.register(item.name,item.style)
      })

      // 设置默认主题
      this.rendition.themes.select(defaultTheme)
    },
    initRendition(){
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        method:'default' // 兼容微信浏览器
      })
      this.rendition.display().then(() => {
        // 初始化字体大小
        this.initFontSize()
        // 初始化字体
        this.initFontFamily()
        // 初始化主题
        this.initTheme()
        // 初始化全局样式
        this.initGlobalStyle()
      }) // 显示

      // 加载字体文件
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/tangerine.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/cabin.css`)
        ]).then(() => {
          console.log("字体加载完毕...")
        })
      })
    },
    // 初始化手势
    initGesture(){
      // 添加事件
      this.rendition.on('touchstart',event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.timeStamp = event.timeStamp
      })
      this.rendition.on('touchend',event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const offsetTime = event.timeStamp - this.timeStamp

        if (offsetTime < 500 && offsetX > 40) {
          this.prevPage()
        } else if (offsetTime < 500 && offsetX < -40){
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }

        // 阻止默认行为 & 停止事件传播
        event.preventDefault()
        event.stopPropagation()
      })
    },
    // 初始化电子书
    initEpub(){
      const baseURL = 'http://localhost:8090/'
      const url = `${baseURL}${this.fileName}`

      // 初始化电子书
      this.book = new Epub(url)
      this.setCurrentBook(this.book)

      // 初始化rendition
      this.initRendition()

      // 初始化手势
      this.initGesture()
    }
  },
  mounted(){
    // 设置fileName
    this.$store.dispatch('setFileName',this.$route.params.fileName.split('|').join('/')).then(() => {
      this.initEpub()
    })
  }
}
</script>
