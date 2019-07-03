<template>
  <div class="ebook-menu">
    <transition name="slide-up">
      <div class="menu-wrapper" v-show="menuVisible">
        <div class="icon-wrapper">
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popup></ebook-setting-font-popup>
  </div>
</template>

<script>
import {ebookMixins} from '@/utils/mixins'
import EbookSettingFont from '@/components/ebook/EbookSettingFont'
import EbookSettingFontPopup from '@/components/ebook/EbookSettingFontPopup'
export default {
  mixins:[ebookMixins],
  components:{
    EbookSettingFont,
    EbookSettingFontPopup
  },
  methods:{
    showSetting(key){
      this.setSettingVisible(key)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/global.scss";
  .menu-wrapper{
    position: absolute;
    left:0;
    bottom: 0;
    width: 100%;
    height: px2rem(60);
    display: flex;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(22);
    .icon-wrapper{
      flex:1;
      @include center;
      .icon-progress{
        font-size: px2rem(24);
      }
      .icon-A{
        font-size: px2rem(20);
      }
    }
  }
</style>
