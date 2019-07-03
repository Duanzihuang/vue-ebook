import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:'/ebook'
    },
    {
      path:'/ebook',
      component:() => import('./views/ebook/Index.vue'),
      children:[
        { path:':fileName',component:() => import('./components/ebook/EbookReader.vue') }
      ]
    }
  ]
})
