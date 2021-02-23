<template>
  <div class="list-todos"> <!-- 菜单容器 -->
    <a class="list-todo activeListClass list" :key="item.id" v-for="item in list">
      <span class="icon-lock" v-if="item.locked" />
      <span class="count-list" v-if="item.count > 0">{{ item.count }}</span>
      {{ item.title }}
    </a>
    <a class=" link-list-new" > <!-- 新增菜单 -->
      <span class="icon-plus" />
      新增
    </a>
  </div>
</template>

<script>
export default {
  name: 'Menus',
  data () {
    return {
      list: [
        {
          id: 1,
          title: '星期一',
          count: 1,
          locked: true
        },
        {
          id: 2,
          title: '星期二',
          count: 0,
          locked: true
        },
        {
          id: 3,
          title: '星期三',
          count: 3,
          locked: false
        }
      ]
    }
  }
}
</script>

<style lang="less">
@import '../common/style/menu.less';
</style>
