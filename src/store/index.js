import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainArr: [ // главный массив из секции TheHome
      {
        id: 'shop',
        title: 'shop',
        todoArr: [
          {
            name: 'milk',
            active: false
          },
          {
            name: 'eggs',
            active: false
          },
          {
            name: 'pepsi',
            active: false
          },
          {
            name: 'apple',
            active: false
          }
        ],
        confirm: false
      },
      {
        id: 'to do list',
        title: 'to do list',
        todoArr: [
          {
            name: 'breakfast',
            active: false
          },
          {
            name: 'wash the car',
            active: false
          },
          {
            name: 'go to work',
            active: false
          },
          {
            name: 'buy product',
            active: false
          }
        ],
        confirm: false
      }
    ],
    isActive: false, // активность возможности добавления списка тудухи на главной странице
    showArr: [], // отображаемый массив на главной странице
    changeObj: {}, // изменяемый объект
    active: false, // активность возможности добавления тудухи в секции TheEdit
    tasksArr: [] // массив в который пушим новые задания
  },
  mutations: {
    createNewTask (state, newTask) { // добавляем новый список тудухи
      const newObj = JSON.parse(JSON.stringify(newTask))
      state.mainArr.push(newObj)
    },
    changeAddTask (state) { // меняем активность возможности добавления списка тудухи на главной странице
      state.isActive = !state.isActive
    },
    delTask (state, taskId) { // удаляем список тудухи
      state.mainArr = state.mainArr.filter((task) => task.id !== taskId)
    },
    confirmDelTask (state, id) { // отменяем удаление списка тудухи
      const obj = state.mainArr.find((item) => item.id === id)
      obj.confirm = !obj.confirm
    },
    showTodoFirst (state, idx) { // отображаем первые 2 задачи из списка тудухи
      state.showArr = state.mainArr[idx].todoArr.slice(0, 2)
    },
    saveTask (state) { // сохраняем в локальное хранилище состояние главного массива
      const parsed = JSON.stringify(state.mainArr)
      localStorage.setItem('mainArr', parsed)
    },
    parseMainArr (state) { // парсим локальное хранилище главного массива
      if (localStorage.getItem('mainArr')) {
        try {
          state.mainArr = JSON.parse(localStorage.getItem('mainArr'))
        } catch (e) {
          localStorage.removeItem('mainArr')
        }
      }
    },
    taskEdit (state, id) { // переходим в секцию Edit, чтобы изменить список тудухи, которую выбрал пользователь
      const findObj = state.mainArr.find((item) => item.id === id)
      state.changeObj = JSON.parse(JSON.stringify(findObj))
    },
    chengeActiveChecked (state, idx) { // изменяем состояние checked элемента списка дел
      state.changeObj.todoArr[idx].active = !state.changeObj.todoArr[idx].active
    },
    changeTask (state, { id, item }) { // записываем изменённую задачу, из списка тудухи
      state.changeObj.todoArr.splice(id, 1, item)
    },
    todoDel (state, id) { // удаляем задачу, из списка тудухи
      state.changeObj.todoArr.splice(id, 1)
    },
    todoAdd (state, el) { // добавляем задачу, в список тудухи
      state.changeObj.todoArr.push(el)
    },
    changeActiveAdd (state) { // изменяем активность возможности добавления тудухи в секции TheEdit
      state.active = !state.active
    },
    confirmDel (state) { // отменяем удаление списка дел
      state.changeObj.confirm = !state.changeObj.confirm
    },
    saveObj (state) { // сохраняем изменённый список дел, в основной массив
      const idx = state.mainArr.findIndex((item) => item.id === state.changeObj.id)
      const cloneObj = JSON.parse(JSON.stringify(state.changeObj))
      state.mainArr.splice(idx, 1, cloneObj)
    },
    todoDeleteEdit (state) { // подтверждаем удаление списка дел, из основного массива
      const idx = state.mainArr.findIndex((item) => item.id === state.changeObj.id)
      state.mainArr.splice(idx, 1)
    },
    changeUndo (state) { // парсим локальное хранилище главного массива, чтобы вытянуть исходную копию изменяемого объекта
      const arr = JSON.parse(localStorage.getItem('mainArr'))
      const findObj = arr.find((item) => item.id === state.changeObj.id)
      state.changeObj = JSON.parse(JSON.stringify(findObj))
    },
    localStSave (state) { // сохраняем в локальное хранилище изменяемый объект
      const parsed = JSON.stringify(state.changeObj)
      localStorage.setItem('changeObj', parsed)
    },
    localStParse (state) { // парсим локальное хранилище изменяегого объекта
      if (localStorage.getItem('changeObj')) {
        try {
          state.changeObj = JSON.parse(localStorage.getItem('changeObj'))
        } catch (e) {
          localStorage.removeItem('changeObj')
        }
      }
    }
  },
  actions: {
    createNewTask (ctx, newTask) {
      ctx.commit('createNewTask', newTask)
    },
    changeAddTask (ctx) {
      ctx.commit('changeAddTask')
    },
    delTask (ctx, taskId) {
      ctx.commit('delTask', taskId)
    },
    confirmDelTask (ctx, id) {
      ctx.commit('confirmDelTask', id)
    },
    showTodoFirst (ctx, idx) {
      ctx.commit('showTodoFirst', idx)
    },
    saveTask (ctx) {
      ctx.commit('saveTask')
    },
    taskEdit (ctx, id) {
      ctx.commit('taskEdit', id)
    },
    chengeActiveChecked (ctx, idx) {
      ctx.commit('chengeActiveChecked', idx)
    },
    changeTask (ctx, { id, item }) {
      ctx.commit('changeTask', { id, item })
    },
    todoDel (ctx, id) {
      ctx.commit('todoDel', id)
    },
    todoAdd (ctx, el) {
      ctx.commit('todoAdd', el)
    },
    changeActiveAdd (ctx) {
      ctx.commit('changeActiveAdd')
    },
    confirmDel (ctx) {
      ctx.commit('confirmDel')
    },
    saveObj (ctx) {
      ctx.commit('saveObj')
    },
    todoDeleteEdit (ctx) {
      ctx.commit('todoDeleteEdit')
    },
    localStSave (ctx) {
      ctx.commit('localStSave')
    },
    localStParse (ctx) {
      ctx.commit('localStParse')
    },
    //
    showTask (ctx) {
      ctx.commit('parseMainArr')
    },
    changeUndo (ctx) {
      ctx.commit('changeUndo')
    }
  },
  getters: {
    allTasks (state) {
      return state.mainArr
    },
    changeActive (state) {
      return state.isActive
    },
    showArrTodo (state) {
      return state.showArr
    },
    editTask (state) {
      return state.changeObj
    },
    activeAdd (state) {
      return state.active
    },
    tasksArr (state) {
      return state.tasksArr
    }
  }
})
