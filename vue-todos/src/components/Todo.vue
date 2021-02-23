<template>
  <div class="page lists-show"> <!-- 最外层容器 -->
    <!-- 容器上半部分 -->
    <nav>
      <!-- 移动端的菜单图标 -->
      <div class="nav-group">
        <a class="nav-item">
          <span class="icon-list-unordered" />
        </a>
      </div>

      <!-- 标题 -->
      <h1 class="title-page">
        <span class="title-wrapper">{{ todo.title }}</span>
        <span class="count-list">{{ todo.count }}</span>
      </h1>

      <!-- 右边的删除，锁定图标容器-->
      <div class="nav-group right">
        <div class="options-web">
          <a class="nav-item"> <!-- 锁定图标-->
            <span class="icon-lock" v-if="todo.locked" />
            <span class="icon-unlock" v-else />
          </a>
          <a class="nav-item"> <!-- 删除图标-->
            <span class="icon-trash" />
          </a>
        </div>
      </div>

      <div class="form todo-new input-symbol"> <!-- 新增单个代办单项输入框,监听了回车事件,双向绑定text值,监听了disabled属性,在todo.locked为true的情况下无法编辑 -->
        <input type="text" v-model="text" placeholder='请输入' @keyup.enter="onAdd" :disabled="todo.locked" />
        <span class="icon-add" />
      </div>
    </nav>

    <!-- 容器下半部分 -->
    <div class="content-scrollable list-items">
      <div :key="item.id" v-for="item in records">
        <item :item="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './Item'

export default {
  name: 'Todo',
  components: {
    Item
  },
  data () {
    return {
      todo: {
        title: '星期一',
        count: 12,
        locked: false
      },
      records: [ // 代办单项列表
        { id: 1, checked: false, text: '新的1天', isDelete: false },
        { id: 2, checked: false, text: '新的2天', isDelete: false },
        { id: 3, checked: false, text: '新的3天', isDelete: false }
      ],
      text: ''
    }
  },
  methods: {
    onAdd () {
      this.records.push({
        id: 4,
        checked: false,
        text: this.text,
        isDelete: false
      })
      this.text = ''
    }
  }
}
</script>

<style lang="less">
@import '../common/style/nav.less';
@import '../common/style/form.less';
@import '../common/style/todo.less';
</style>
