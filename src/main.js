// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import './assets/css/base.css'
import './assets/css/product.css'
import './assets/css/checkout.css'
import './assets/css/login.css'
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: 'static/loading-svg/loading-spin.svg'
})
Vue.use(infiniteScroll)
Vue.use(ElementUI)
Vue.use(Vuex)

Vue.filter('currency', currency)
const store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: {
    updateUserInfo (state, nickName) {
      state.nickName = nickName
    },
    updateCartCount (state, cartCount) {
      state.cartCount += cartCount
    },
    initCartCount (state, cartCount) {
      state.cartCount = cartCount
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
