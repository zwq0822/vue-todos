<template>
  <section class="container"> <!-- 最外层容器 -->
    <section class="menu"> <!-- 左边的容器 里面加上组件 Menus -->
      <menus />
    </section>
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
  }
}
</script>

<style lang="less">
@import '../common/style/layouts.less';
</style>
