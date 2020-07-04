import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import './style.css'

Vue.config.productionTip = false

Vue.mixin({
  methods:{
    getAuthHeaders(){
      return {
        Authorization:`Bearer ${localStorage.token || ''}`
      }
    }
  }
})

import http from "./http"
Vue.prototype.$http=http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
