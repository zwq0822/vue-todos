<template>
  <section class="container" :class="{'menu-open': menuOpen}"> <!-- 最外层容器 -->
    <!-- 根据menuOpen的值来判断是否使用menu-open样式 -->
    <section class="menu"> <!-- 左边的容器 里面加上组件 Menus -->
      <menus />
    </section>
    <!-- 这个是当页面收缩覆盖在内容上面的模糊层，点击后复原 它可以直接调用vuex actions.js里面的updateMenu方法 -->
    <div class="content-overlay" @click="$store.dispatch('updateMenu')"></div>

    <section class="content-container"> <!-- 右边的容器 里面加上组件 Todo -->
      <todo />
    </section>
  </section>
</template>

<script>
import Menus from './Menus'
import Todo from './Todo'

export default {
  name: 'Layouts',
  components: {
    Menus,
    Todo
  },
  computed: {
    menuOpen () {
      return this.$store.state.menuOpen
    }
  }
}
</script>

<style lang="less">
@import '../common/style/layouts.less';
</style>
