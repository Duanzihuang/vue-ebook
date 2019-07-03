<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Epub from 'epubjs'
import {ebookMixins} from '../../utils/mixins'
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
      }
      this.setMenuVisible(!this.menuVisible)
    },
    initEpub(){
      const baseURL = 'http://localhost:8090/'
      const url = `${baseURL}${this.fileName}`

      // 初始化电子书
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        method:'default' // 兼容微信浏览器
      })
      this.rendition.display() // 显示

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
