import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
import 'babel-polyfill'
import fastclick from 'fastclick'

Vue.config.productionTip = false

fastclick.attach(document.body) // fastclick 解决 document.body模拟移动端 300ms 延迟

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
