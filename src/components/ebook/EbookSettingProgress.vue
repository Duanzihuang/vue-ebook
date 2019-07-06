<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
      <div class="setting-progress">
        <div class="read-time-wrapper">
          <div class="read-time-text">{{getReadTimeText()}}</div>
          <div class="icon-forward"></div>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper" @click="prevSection()">
            <span class="icon-back"></span>
          </div>
          <input type="range" class="progress"
              max="100"
              min="0"
              step="1"
              @input="onProgressInput($event.target.value)"
              @change="onProgressChange($event.target.value)"
              :value="progress"
              :disabled="!bookAvailable"
              ref="progress" />
          <div class="progress-icon-wrapper" @click="nextSection">
            <span class="icon-forward"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <span class="progress-text">({{bookAvailable ? progress + '%' : $t('book.loading')}})</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {ebookMixins} from '@/utils/mixins'
export default {
  mixins:[ebookMixins],
  computed:{
    getSectionName(){
      if (this.section) {
        // 获取章节信息
        const sectionInfo = this.currentBook.section(this.section)
        // console.log(sectionInfo)
        if (sectionInfo && sectionInfo.href){
          // 根据章节信息获取目录信息
          const navigation = this.currentBook.navigation.get(sectionInfo.href)
          // console.log(navigation)
          return navigation.label
        }
      }
    }
  },
  methods:{
    // 上一章
    prevSection(){
      if (this.section > 0 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
          // 展示章节
          this.displaySection()
        })
      }
    },
    // 下一章
    nextSection(){
      // console.log(this.currentBook.spine)
      if (this.section < this.currentBook.spine.length - 1) {
        this.setSection(this.section + 1).then(() => {
          // 展示章节
          this.displaySection()
        })
      }
    },
    displaySection(){
      const sectionInfo = this.currentBook.section(this.section)
      // console.log(sectionInfo)
      //sectionInfo.href // 该章节的地址
      if (sectionInfo && sectionInfo.href) {
        // this.currentBook.rendition.display(sectionInfo.href).then(() => {
        //   this.refreshLocation()
        // })

        // 等价于下面
        this.display(sectionInfo.href)
      }
    },
    // // 刷新当前位置
    // refreshLocation(){
    //   const currentLocation = this.currentBook.rendition.currentLocation()
    //   // 获取开始位置的cfi
    //   const startCfi = currentLocation.start.cfi
    //   // 根据开始位置的cfi获取进度
    //   const progress = this.currentBook.locations.percentageFromCfi(startCfi)
    //   // 设置进度
    //   this.setProgress(Math.floor(progress  * 100))
    //   // 保存阅读进度
    //   saveLocation(this.fileName,startCfi)
    // },
    // 拖动中
    onProgressInput(progress){
      this.setProgress(progress).then(() => {
        // this.displayProgess()
        this.updateProgressBg()
      })
    },
    displayProgess(){
      // 根据进度设置cfi
      const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)

      // this.currentBook.rendition.display(cfi).then(() => {
      //   this.refreshLocation()
      // })

      // 等价于下面
      this.display(cfi)
    },
    updateProgressBg(){
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    },
    onProgressChange(progress){
      this.setProgress(progress).then(() => {
        this.displayProgess()
        this.updateProgressBg()
      })
    }
  },
  updated() {
    this.updateProgressBg()
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/global.scss';
  .setting-wrapper{
    position: absolute;
    bottom: px2rem(90);
    left: 0;
    z-index: 190;
    width: 100%;
    height: px2rem(160);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-progress{
      position: relative;
      width: 100%;
      height: 100%;
      .read-time-wrapper{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: px2rem(40);
        // background-color:red;
        @include center;
        font-size: px2rem(12);
      }
      .progress-wrapper{
        width: 100%;
        height: 100%;
        // background-color:purple;
        @include center;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .progress {
          flex: 1;
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(6);
          // background: -webkit-linear-gradient(#5d6268, #5d6268) no-repeat, #b4b5b7;
          // background-size: 0 100%;
          margin: 0 px2rem(20);
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(40);
            width: px2rem(40);
            border-radius: 50%;
            background: #ceced0;
            box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, .15);
            border: none;
          }
        }
        .progress-icon-wrapper {
          flex: 0 0 px2rem(40);
          font-size: px2rem(40);
          @include center;
        }
      }
      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: px2rem(5);
        width: 100%;
        font-size: px2rem(12);
        text-align: center;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        @include center;
        .progress-section-text {
          line-height: px2rem(30);
          @include ellipsis;
        }
      }
    }
  }
</style>

