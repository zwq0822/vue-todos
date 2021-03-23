<template>
  <transition name="slide-fade">
    <div class="list-item editingClass editing" :class="{'checked': item.checked}" v-show="!item.isDelete"> <!-- 最外层容器 -->
      <!-- 自定义的多选框 -->
      <label class="checkbox">
        <input type="checkbox" v-model="item.checked" name="checked" @change="onChange" :disabled="locked">
        <span class="checkbox-custom" />
      </label>

      <!-- 输入框 -->
      <input type="text" v-model="item.text" placeholder='写点什么...' @keyup.enter="onChange" :disabled="locked || item.checked">

      <!-- 删除图标 -->
      <a class="delete-item" v-if="!locked && item.checked" @click="item.isDelete = true;onChange()">
        <span class="icon-trash" />
      </a>
    </div>
  </transition>
</template>

<script>
import { editRecord } from '../api/api'

// Item 是Todo的子组件,它接受一个对象item,来进行处理
export default {
  name: 'Item',
  props: { // 子组件显式的用props选项声明它期待获得的数据，这里申明它想要一个叫做'item'的数据
    item: {
      type: Object,
      default: () => {
        return {
          checked: false,
          text: 'hello world'
        }
      }
    },
    index: Number,
    id: String,
    init: {},
    locked: Boolean
  },
  methods: {
    // 用户无论删除,修改，锁定都可以利用这个方法
    onChange () {
      editRecord({ id: this.id, record: this.item, index: this.index }).then(res => {
        this.init()
        this.$store.dispatch('getTodo')
      })
    }
  }
}
</script>

<style lang="less">
@import '../common/style/list-items.less';
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
</style>
