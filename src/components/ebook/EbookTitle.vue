<template>
  <div>
    <transition name="slide-down">
      <div class="title-wrapper" v-show="menuVisible">
          <div class="left" @click="back">
            <span class="icon-back"></span>
          </div>
          <div class="right">
            <div class="icon-wrapper">
              <span class="icon-shelf"></span>
            </div>
            <div class="icon-wrapper">
              <span class="icon-cart"></span>
            </div>
            <div class="icon-wrapper">
              <span class="icon-more"></span>
            </div>
          </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {ebookMixins} from '../../utils/mixins'
export default {
  mixins:[ebookMixins],
  methods:{
    back(){

    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/global.scss";
  .title-wrapper{
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height: px2rem(60);
    z-index: 200;
    display: flex;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(22);
    .left {
      flex:0 0 px2rem(37);
      @include right;
    }
    .right{
      flex:1;
      display: flex;
      justify-content: flex-end;
      .icon-wrapper{
        flex: 0 0 px2rem(37);
        @include left;
      }
    }
  }
</style>

