import Vue from 'vue'
import App from './App.vue'
import Card from './components/Card.vue'
import ListCard from './components/ListCard'

import "./SCSS/style.scss"
import router from './router'
import './iconfont/iconfont.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import  axios from 'axios'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.component('m-card',Card)
Vue.component('m-list-card',ListCard)

Vue.config.productionTip = false
Vue.prototype.$http=axios.create({
  baseURL:'http://localhost:3000/web/api'
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
