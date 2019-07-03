<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 0">
      <div class="setting-font-size">
        <div class="preview" ref="left">
          <span :style="styleLeft" ref="leftText">A</span>
        </div>
        <div class="select">
          <div class="select-wrapper" v-for="(item,index) in fontSizeList" @click="setFontSize(item.fontSize)" :key="index" ref="item">
            <div class="line"></div>
            <div class="point-wrapper">
              <div class="point" v-show="defaultFontSize === item.fontSize">
                <div class="small-point"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="preview" ref="right">
          <span :style="styleRight" ref="rightText">A</span>
        </div>
      </div>
      <div class="setting-font-family" @click="showFontFamilySetting">
        <div class="setting-font-family-text-wrapper">
          <span class="setting-font-family-text">{{defaultFontFamily}}</span>
        </div>
        <div class="setting-font-family-icon-wrapper">
            <span class="icon-forward"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {ebookMixins} from '@/utils/mixins'
import {FONT_SIZE_LIST} from '@/utils/book'
export default {
  mixins:[ebookMixins],
  data(){
    return {
      styleLeft:{},
      styleRight:{},
      fontSizeList:FONT_SIZE_LIST
    }
  },
  watch:{
    settingVisible(v){
      if (v === 0){
        console.log("=============")
        this.$nextTick(() => {
          this.genStyle()
        })
      }
    }
  },
  methods:{
    genStyle(){
      const left = this.$refs.left.getBoundingClientRect().width
      const right = this.$refs.right.getBoundingClientRect().width
      const leftText = this.$refs.leftText.getBoundingClientRect().width
      const rightText = this.$refs.rightText.getBoundingClientRect().width
      const item = this.$refs.item[0].getBoundingClientRect().width

      this.styleLeft = {
        marginLeft:(left + item - leftText) / 2 + 'px',
        fontSize:this.fontSizeList[0].fontSize + 'px'
      }

      this.styleRight = {
        marginRight:(right + item - rightText) / 2 + 'px',
        fontSize: this.fontSizeList[this.fontSizeList.length - 1].fontSize + 'px'
      }
    },
    setFontSize(fontSize){
      this.setDefaultFontSize(fontSize)
      this.currentBook.rendition.themes.fontSize(fontSize)
    },
    showFontFamilySetting(){
      this.setFontFamilyVisible(true)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/global.scss";
  .setting-wrapper{
    position: absolute;
    bottom: px2rem(60);
    left:0;
    z-index: 190;
    display: flex;
    flex-direction: column;
    width:100%;
    height: px2rem(90);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-font-size{
      flex:2;
      display: flex;
      height: 100%;
      .preview{
        flex:0 0 px2rem(40);
        @include center;
      }
      .select{
        display: flex;
        flex:1;
        .select-wrapper{
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child{
            .line{
              &:first-child{
                border-top: none;
              }
            }
          }
          &:last-child{
            .line{
              &:last-child{
                border-top: none;
              }
            }
          }
        }
        .line{
          flex:1;
          height: 0;
        }
        .point-wrapper{
          position: relative;
          flex: 0 0 0;
          width:0;
          height: px2rem(7);
          .point{
            position: absolute;
            top:px2rem(-8);
            left:px2rem(-10);
            width: px2rem(20);
            height: px2rem(20);
            @include center;
            border-radius: 50%;
            box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .15);
            .small-point{
              width:px2rem(5);
              height: px2rem(5);
              border-radius: 50%;
            }
          }
        }
      }
    }
    .setting-font-family{
      flex:1;
      // background-color: yellow;
      font-size: px2rem(14);
      @include center;
      .setting-font-family-text-wrapper{
        @include center;
      }
      .setting-font-family-icon-wrapper{
        @include center;
      }
    }
  }
</style>

