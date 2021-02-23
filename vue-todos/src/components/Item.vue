<template>
  <div class="list-item editingClass editing"> <!-- 最外层容器 -->
    <!-- 自定义的多选框 -->
    <label class="checkbox">
      <input type="checkbox" v-model="item.checked">
      <span class="checkbox-custom" />
    </label>

    <!-- 输入框 -->
    <input type="text" v-model="item.text" placeholder='写点什么...'>

    <!-- 删除图标 -->
    <a class="delete-item">
      <span class="icon-trash" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['item'] // 子组件显式的用props选项声明它期待获得的数据，这里申明它想要一个叫做'item'的数据
}
</script>

<style lang="less">
@import '../common/style/list-items.less';
</style>
