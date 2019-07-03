<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-if="fontFamilyVisible">
      字体可见
    </div>
  </transition>
</template>

<script>
import {ebookMixins} from '@/utils/mixins'
export default {
  mixins:[ebookMixins]
}
</script>
