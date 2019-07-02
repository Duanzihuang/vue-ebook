import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入字体图标
import './assets/styles/icon.css'

// 导入web字体
import './assets/fonts/daysOne.css'

// 导入全局样式
import './assets/styles/global.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
