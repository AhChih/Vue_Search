import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'sweetalert2/src/sweetalert2.scss'
import $ from 'jquery'

var VueScrollTo = require('vue-scrollto')

Vue.use(VueScrollTo)
Vue.component('Loading', Loading)
Vue.use(VueAxios, axios)
Vue.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})
Vue.config.productionTip = false
window.$ = $

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
