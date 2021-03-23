<template>
  <div class="page lists-show" v-show="!todo.isDelete"> <!-- 最外层容器 -->
    <!-- 容器上半部分 -->
    <nav>
      <!-- 当用户点击标题进入修改状态，就显示当前内容可以修改 -->
      <div class="form list-edit-form" v-show="isUpdate">
        <input type="text" v-model="todo.title" @keyup.enter="updateTitle" :disabled="todo.locked">
        <div class="nav-group right">
          <a class="nav-item" @click="isUpdate = false">
            <span class="icon-close" />
          </a>
        </div>
      </div>

      <!-- 当用户浏览车窗口尺寸小于40em时候，显示手机端的菜单图标 -->
      <div class="nav-group" @click="$store.dispatch('updateMenu')" v-show="!isUpdate">
      <!-- 在菜单的图标下面添加updateMenu事件，它可以直接调用vuex actions.js里面的updateMenu方法 -->
        <a class="nav-item">
          <span class="icon-list-unordered" />
        </a>
      </div>

      <!-- 显示标题和数字模块 -->
      <h1 class="title-page" v-show="!isUpdate" @click="isUpdate = true">
        <span class="title-wrapper">{{ todo.title }}</span> <!-- title:标题 绑定标题 -->
        <span class="count-list">{{ todo.count || 0 }}</span> <!-- count:数量 绑定代办单项数量-->
      </h1>

      <!-- 右边的删除，锁定图标容器-->
      <div class="nav-group right" v-show="!isUpdate">
        <div class="options-web">
          <a class="nav-item" @click="onLock"> <!-- 锁定图标-->
            <span class="icon-lock" v-if="todo.locked" />
            <span class="icon-unlock" v-else />
          </a>
          <a class="nav-item" @click="onDelete"> <!-- 删除图标-->
            <span class="icon-trash" />
          </a>
        </div>
      </div>

      <!-- 用户新增单个代办单项的input输入框 -->
      <div class="form todo-new input-symbol">
        <!-- 绑定disabled值，当todo.locked为true的情况下无法编辑 -->
        <input type="text" v-model="text" placeholder='请输入' @keyup.enter="onAdd" :disabled="todo.locked" />
        <span class="icon-add" />
      </div>
    </nav>

    <!-- 容器下半部分 -->
    <div class="content-scrollable list-items">
      <div :key="index" v-for="(item,index) in records">
        <item :item="item" :id="todo.id" :index="index" :init="init" :locked="todo.locked"/>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './Item'
import { getTodo, addRecord, editTodo } from '../api/api'

export default {
  name: 'Todo',
  components: { // components的作用就可以把其他子组件挂载到当前父组件的作用域里
    Item
  },
  data () {
    return {
      todo: {},
      records: [], // 代办单项列表
      text: '', // 用户输入单项绑定的值
      isUpdate: false // 新增修改状态
    }
  },
  watch: {
    '$route.params.id' () {
      // 监听$route.params.id的变化，如果这个id即代表用户点击了其他的待办项需要重新请求数据
      this.init()
    }
  },
  created () {
    // created生命周期，在实例已经创建完成，页面还没渲染时调用init方法
    this.init()
  },
  methods: {
    init () {
      // 获取到 $route下params下的id,即我们在Menus.vue组件处传入的数据
      const ID = this.$route.params.id
      getTodo({ id: ID }).then(res => {
        let { id, title, count, isDelete, locked, record } = res.data.todo
        // 请求成功，拿到res.data.todo; 再将record 赋值到代办单项列表，其它数据赋值到todo对象
        this.records = record
        this.todo = {
          id: id,
          title: title,
          count: count,
          isDelete: isDelete,
          locked: locked
        }
      })
    },
    onAdd () { // 当用户输入文字，并且回车时调用此方法
      const ID = this.$route.params.id
      addRecord({ id: ID, text: this.text }).then(res => {
        this.text = ''
        this.init() // 请求成功后初始化
        this.$store.dispatch('getTodo')
      })
    },
    updateTodo () {
      let _this = this
      editTodo({ todo: this.todo }).then(data => {
        _this.$store.dispatch('getTodo')
      })
    },
    updateTitle () {
      this.isUpdate = false
      this.updateTodo()
    },
    onLock () {
      this.todo.locked = !this.todo.locked
      this.updateTodo()
    },
    onDelete () {
      this.todo.isDelete = true
      this.updateTodo()
    }
  }
}
</script>

<style lang="less">
@import '../common/style/nav.less';
@import '../common/style/form.less';
@import '../common/style/todo.less';
</style>
