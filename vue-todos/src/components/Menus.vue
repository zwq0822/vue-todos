<template>
  <!-- 绑定点击事件goList()，并且判断当 todoId == item.id 时候，文字高亮 -->
  <div class="list-todos"> <!-- 菜单容器 -->
    <!-- 绑定class，当list循环中的id等于我们设置的选中todoId时候，就会加上active这个class -->
    <a
      @click="goList(item.id)"
      class="list-todo activeListClass list"
      :class="{'active': item.id === todoId}"
      :key="index"
      v-for="(item,index) in todoList"
    >
      <span class="icon-lock" v-if="item.locked" />
      <span class="count-list" v-if="item.count > 0">{{ item.count }}</span>
      {{ item.title }}
    </a>
    <a class=" link-list-new" @click="addTodoList"> <!-- 新增菜单 -->
      <span class="icon-plus" />
      新增
    </a>
  </div>
</template>

<script>
// import { getTodoList, addTodo } from '../api/api' // 引入我们封装好的两个接口函数
import { addTodo } from '../api/api'

export default {
  name: 'Menus',
  data () {
    return {
      list: [], // 菜单数据
      todoId: '', // 默认选中id
      todoNum: 0 // 新增一个状态来判断代办事项的数据
    }
  },
  watch: {
    todoId (id) {
      // 监听到用户点击todoId的变化再跳转路由
      this.$router.push({ name: 'Todo', params: { id: id } })
    },
    todoList () {
      const number = this.$store.getters.getTodoList.length
      if (this.$store.getters.getTodoList.length < this.todoNum) {
        this.goList(this.$store.getters.getTodoList[0].id)
      }
      this.todoNum = number
    }
  },
  computed: {
    todoList () {
      return this.$store.getters.getTodoList // 返回vuex getters.js 定义的getTodoList数据
    }
  },
  created () {
    // 调用请求菜单列表数据的接口
    // getTodoList({}).then(res => {
    //   // console.log(res.data)
    //   const TODOS = res.data.todos // 数据都会返回在res.data里面
    //   this.list = TODOS // 把返回菜单数据赋值给定义的this.list
    //   this.todoId = TODOS[0].id // 把菜单数据的默认的第一个对象的id赋值给默认选中的id
    // })
    this.$store.dispatch('getTodo').then(() => { // 调用vuex actions.js 里面的 getTodo函数
      // console.log(this.todoList)
      this.$nextTick(() => {
        this.goList(this.todoList[0].id)
      })
    })
  },
  methods: {
    goList (id) { // 点击菜单时候，替换选中id
      // console.log(id)
      this.todoId = id
    },
    addTodoList () { // 点击新增按钮时候
      // 调用新增菜单的接口，在接口调用成功之后再请求菜单列表数据
      addTodo({}).then(data => {
        // console.log(data)
        // getTodoList({}).then(res => {
        //   console.log(res.data)
        //   const TODOS = res.data.todos
        //   this.list = TODOS
        //   this.todoId = TODOS[TODOS.length - 1].id
        // })
        this.$store.dispatch('getTodo').then(() => { // 调用vuex actions.js 里面的 getTodo函数
          this.$nextTick(() => {
            setTimeout(() => {
              this.goList(this.todoList[this.todoList.length - 1].id)
            }, 100)
          })
        })
      })
    }
  }
}
</script>

<style lang="less">
@import '../common/style/menu.less';
</style>
