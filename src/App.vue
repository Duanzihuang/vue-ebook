<template>
  <div id="app">
    <span class="text">ABCDEFG</span>
    <router-view/>
  </div>
</template>

<script>
export default {
}
document.addEventListener('DOMContentLoaded',() => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 :fontSize
  console.log("---DOMContentLoaded---",fontSize)
  html.style.fontSize = fontSize + 'px'
})
</script>

<style lang="scss" scoped>
  @import './assets/styles/global';
  .text{
    font-family: 'Days One';
    // font-size: 30px;
    // font-size: 1rem;
    font-size: px2rem(30);
    color:orange;
  }
</style>
