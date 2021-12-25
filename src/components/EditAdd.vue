<template>
    <form @submit.prevent="addTodo">
        <div>
            <input type="text"
            placeholder="enter tasks"
            v-model="enteredTask.name">
            <button>Add task</button>
        </div>
    </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      enteredTask: {
        name: '',
        active: false
      }
    }
  },
  methods: {
    ...mapActions(['todoAdd', 'localStSave', 'changeActiveAdd']),
    addTodo () {
      this.todoAdd(this.enteredTask)
      this.localStSave()
      this.changeActiveAdd()
      this.enteredTask = {
        name: '',
        active: false
      }
    }
  }
}
</script>
