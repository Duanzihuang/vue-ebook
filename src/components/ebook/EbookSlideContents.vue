<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input class="slide-contents-search-input" @click="showSearchVisible" type="text" :placeholder="$t('book.searchHint')"/>
      </div>
      <div class="slide-contents-search-cancel" @click="hideSearchVisible" v-if="searchVisible">{{$t('book.cancel')}}</div>
    </div>
    <div class="slide-contents-book-wrapper">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" alt="" class="slide-contents-book-img">
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">{{metadata.title}}</div>
        <div class="slide-contents-book-author">{{metadata.creator}}</div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>&nbsp;
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {ebookMixins} from '@/utils/mixins'
export default {
  mixins:[ebookMixins],
  data(){
    return {
      searchVisible:false
    }
  },
  methods:{
    showSearchVisible(){
      this.searchVisible = true
    },
    hideSearchVisible(){
      this.searchVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/global.scss";
  .ebook-slide-contents{
    width: 100%;
    font-size: 0;
    .slide-contents-search-wrapper{
      display: flex;
      width: 100%;
      height: px2rem(80);
      margin: px2rem(20) 0 px2rem(10) 0;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      // background-color: red;
      .slide-contents-search-input-wrapper{
        flex:1;
        @include center;
        .slide-contents-search-icon{
          flex: 0 0 px2rem(60);
          font-size: px2rem(20);
          @include center;
        }
        .slide-contents-search-input{
          flex:1;
          width:100%;
          height: px2rem(60);
          font-size: px2rem(14);
          background: transparent;
          border:none;
          &:focus{
            outline: none;
          }
        }
      }
      .slide-contents-search-cancel{
        flex:0 0 px2rem(100);
        font-size: px2rem(22);
        @include center;
      }
    }
    .slide-contents-book-wrapper{
      display: flex;
      width:100%;
      height: px2rem(200);
      padding: px2rem(20) px2rem(20) px2rem(40) px2rem(30);
      box-sizing: border-box;
      .slide-contents-book-img-wrapper{
        flex:0 0 px2rem(150);
        .slide-contents-book-img{
          width:px2rem(120);
          height: px2rem(150);
        }
      }
      .slide-contents-book-info-wrapper{
        flex:1;
        padding: 0 px2rem(20);
        box-sizing: border-box;
        .slide-contents-book-title {
          width:px2rem(350);
          font-size: px2rem(24);
          line-height: px2rem(36);
          @include ellipsis2(2);
        }
        .slide-contents-book-author {
          width:px2rem(350);
          font-size: px2rem(20);
          margin-top: px2rem(15);
          line-height: px2rem(30);
          @include ellipsis;
        }
      }
      .slide-contents-book-progress-wrapper{
        flex: 0 0 px2rem(180);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .slide-contents-book-progress{
          .progress{
            font-size: px2rem(28);
          }
          .progress-text{
            font-size: px2rem(24);
          }
        }
        .slide-contents-book-time{
          margin-top: px2rem(20);
          font-size: px2rem(24);
        }
      }
    }
  }
</style>
