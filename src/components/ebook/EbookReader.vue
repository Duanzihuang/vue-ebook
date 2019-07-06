<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Epub from 'epubjs'
import {ebookMixins} from '../../utils/mixins'
import {getFontFamily,saveFontFamily,saveFontSize,getFontSize,saveTheme,getTheme,getLocation} from '@/utils/localStorage'
export default {
  mixins:[ebookMixins],
  computed:{
    ...mapGetters({
      fileName:'getFileName'
    })
  },
  methods:{
    prevPage(){
      if (this.rendition) {
        this.rendition.prev().then(() => {
          // 刷新进度
          this.refreshLocation()
        })
      }
    },
    nextPage(){
      if (this.rendition) {
        this.rendition.next().then(() => {
          // 刷新进度
          this.refreshLocation()
        })
      }
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
      // 获取之前保存的位置
      const location = getLocation(this.fileName)
      // console.log(location)
      this.display(location,() => {
        // 初始化字体大小
        this.initFontSize()
        // 初始化字体
        this.initFontFamily()
        // 初始化主题
        this.initTheme()
        // 初始化全局样式
        this.initGlobalStyle()
      })
      // this.rendition.display().then(() => {
      //   // 初始化字体大小
      //   this.initFontSize()
      //   // 初始化字体
      //   this.initFontFamily()
      //   // 初始化主题
      //   this.initTheme()
      //   // 初始化全局样式
      //   this.initGlobalStyle()
      //   // 刷新当前位置
      //   this.refreshLocation()
      // }) // 显示

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
    // 解析电子书
    parseBook(){
      // 获取电子书封面
      this.book.loaded.cover.then(cover => {
        // console.log(cover)
        this.book.archive.createUrl(cover).then(url => {
          // console.log(url)
          this.setCover(url)
        })
      })
      // 获取电子书标题和作者信息
      this.book.loaded.metadata.then(metadata => {
        // console.log(metadata)
        this.setMetadata(metadata)
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

      // 解析电子书
      this.parseBook()

      // 初始化分页
      this.book.ready.then(() => {
        // 自定义分页
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
      }).then(locations => {
        // 分页的结果
        // console.log(locations)
        // 电子书分页完毕，可用啦
        this.setBookAvailable(true)
        // 更新阅读进度
        this.refreshLocation()
      })
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
