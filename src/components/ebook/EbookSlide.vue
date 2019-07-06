<template>
  <transition name="fade">
    <div class="slide-content-wrapper" v-show="menuVisible && settingVisible === 3">
      <transition name="slide-right">
        <div class="content" v-if="settingVisible === 3">
          <div class="content-page-wrapper">
            <div class="content-page">
              <component :is="currentTab === 1 ? content : bookmark" />
            </div>
            <div class="content-page-tab">
              <div :class="{'selected':currentTab === 1}" @click="currentTab = 1" class="content-page-tab-item">{{$t('book.navigation')}}</div>
              <div :class="{'selected':currentTab === 2}" @click="currentTab = 2" class="content-page-tab-item">{{$t('book.bookmark')}}</div>
            </div>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="hideTitleAndMenu"></div>
    </div>
  </transition>
</template>

<script>
import {ebookMixins} from '@/utils/mixins'
import EbookSlideContents from './EbookSlideContents'
import EbookSlideBookmark from './EbookSlideBookmark'
export default {
  mixins:[ebookMixins],
  data(){
    return {
      currentTab:1,
      content:EbookSlideContents,
      bookmark:EbookSlideBookmark
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/global.scss";
  .slide-content-wrapper{
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height: 100%;
    display: flex;
    z-index: 300;
    .content{
      flex: 0 0 85%;
      width:85%;
      height: 100%;
      .content-page-wrapper{
        display: flex;
        flex-direction: column;
        width:100%;
        height: 100%;
        .content-page{
          flex:1;
          width:100%;
        }
        .content-page-tab{
          height: px2rem(80);
          width:100%;
          display: flex;
          .content-page-tab-item{
            flex:1;
            @include center;
          }
        }
      }
    }
    .content-bg{
      flex:0 0 15%;
      width:15%;
      height: 100%;
    }
  }
</style>

