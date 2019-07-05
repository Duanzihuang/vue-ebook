<template>
  <div>
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookTitle from '@/components/ebook/EbookTitle'
import EbookReader from '@/components/ebook/EbookReader'
import EbookMenu from '@/components/ebook/EbookMenu'
import {getReadTime,saveReadTime} from '@/utils/localStorage'
import {ebookMixins} from '@/utils/mixins'
export default {
  mixins:[ebookMixins],
  components:{
    EbookReader,
    EbookTitle,
    EbookMenu
  },
  mounted(){
    this.startLoopReadTime()
  },
  methods:{
    startLoopReadTime(){
      let readTime = getReadTime(this.fileName)
      if (!readTime){
        readTime = 0
      }
      this.task = setInterval(() => {
        readTime++
        if (readTime % 30 === 0){
          saveReadTime(this.fileName,readTime)
        }
      },1000)
    }
  },
  beforeDestroy(){
    if (this.task){
      clearInterval(this.task)
    }
  }
}
</script>
