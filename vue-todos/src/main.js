import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store' // 引入vuex实例

import Mock from './mock' // 引入mock模块
Mock.start() // 并且执行初始化函数

Vue.config.productionTip = false // 关闭生产模式下给出的提示

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
