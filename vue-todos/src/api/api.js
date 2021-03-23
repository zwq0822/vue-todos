import axios from 'axios' // 导入axios模块

// 获取todo列表
export const getTodoList = params => { // 封装一个函数，名为getTodoList
  return axios.get(`/todo/list`, { // 请求路径 ‘/todo/list’
    params: params
  })
}

// 新增一条todo
export const addTodo = params => {
  return axios.post(`/todo/addTodo`, params).then(res => res.data)
}

// 查询todo代办单项列表
export const getTodo = params => {
  return axios.get(`/todo/listId`, {
    params: params
  })
}

// 新增一条待办单项
export const addRecord = params => {
  return axios.post(`/todo/addRecord`, params).then(res => res.data)
}

// 修改todo列表标题
export const editTodo = params => {
  return axios.post(`/todo/editTodo`, params).then(res => res.data)
}

// 修改单项记录
export const editRecord = params => {
  return axios.post(`/todo/editRecord`, params).then(res => res.data)
}
