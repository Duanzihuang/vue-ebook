<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Epub from 'epubjs'
export default {
  computed:{
    ...mapGetters({
      fileName:'getFileName'
    })
  },
  methods:{
    initEpub(){
      const baseURL = 'http://localhost:8090/'
      const url = `${baseURL}${this.fileName}`

      // 初始化电子书
      this.book = new Epub(url)
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        method:'default' // 兼容微信浏览器
      })
      this.rendition.display()
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
