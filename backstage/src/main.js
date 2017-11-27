// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex/store'
Vue.use(iView)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let other = to.meta.other
  if (to.name === 'home') {
    other.open = []
    other.active = ' '
  }
  store.commit('MENU_OPEN', other.open)
  store.commit('MENU_ACTIVE', other.active)
  next()
})
router.afterEach(route => {
  let meta = route.meta.list
  store.commit('CRUMB_CHANGE', meta)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
