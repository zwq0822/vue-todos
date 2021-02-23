import Vue from 'vue'
import Router from 'vue-router'
import Layouts from '@/components/Layouts' // 导入Layouts.vue组件

Vue.use(Router) // 全局注册Router组件，它会绑定到Vue实例里面

export default new Router({ // 创建router实例，然后传`routes`配置
  routes: [
    {
      path: '/',
      name: 'Layouts',
      component: Layouts // 访问的组件,即访问‘/’,它会加载Layouts组件的内容
    }
  ]
})
