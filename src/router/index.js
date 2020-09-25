
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首頁',
      component: () => import('../views/Home.vue')
    }
  ]
})
