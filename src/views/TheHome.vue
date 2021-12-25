<template>
    <section class="home">
        <h1 class="home-heading">My assignments</h1>
        <button
          class="home-button"
          @click="chengeAddForm"
        >add note</button>
        <todo-data
          v-show="changeActive"
        >
        </todo-data>
        <ul class="home-list">
          <home-item
            v-for="(item, idx) in allTasks"
            :key="item.id"
            :idx="idx"
            :id="item.id"
            :title="item.title"
            :todoArr="item.todoArr"
            :mainArr="allTasks"
            :confirm="item.confirm"
          >
          </home-item>
        </ul>
    </section>
</template>

<script>
import HomeItem from '../components/HomeItem.vue'
import TodoData from '../components/TodoData.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    HomeItem,
    TodoData
  },
  computed: mapGetters(['allTasks', 'changeActive', 'tasksArr']),
  created () {
    this.showTask()
    this.saveTask()
  },
  methods: {
    ...mapActions(['showTask', 'changeAddTask', 'saveTask']),
    chengeAddForm () {
      this.changeAddTask()
      this.tasksArr.splice(0, this.tasksArr.length)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding-top: 3rem;

  &-button {
    text-transform: uppercase;
    padding: 0.5rem;
    margin-top: 1rem;
    border-radius: 15px;
  }
}
</style>
