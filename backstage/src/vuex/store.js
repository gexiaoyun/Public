import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    currentPath: [
      {
        'title': '首页',
        'path': '/home',
        'name': 'home'
      }
    ],
    menuOpen: [],
    menuActive: ''
  },
  getters: {},
  mutations: {
    CRUMB_CHANGE (state, arr) {
      let arrList = []
      arrList = []
      for (let i in arr) {
        let p = {
          'title': arr[i],
          'path': '',
          'name': ''
        }
        arrList.push(p)
      }
      if (store.state.currentPath.length > 1) {
        store.state.currentPath.splice(1, store.state.currentPath.length - 1)
        arrList.forEach((o, i) => {
          store.state.currentPath.push(o)
        })
      } else {
        arrList.forEach((o, i) => {
          store.state.currentPath.push(o)
        })
      }
    },
    MENU_OPEN (state, name) {
      state.menuOpen = name
    },
    MENU_ACTIVE (state, name) {
      state.menuActive = name
    }
  }
})
export default store
