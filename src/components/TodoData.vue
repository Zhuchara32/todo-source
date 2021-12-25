<template>
    <form @submit.prevent="submitData">
        <div>
            <input type="text"
            placeholder="enter a title for the note"
            v-model="enteredTitle">
        </div>
        <fieldset class="fieldset">
            <div>
                <input type="text"
                placeholder="enter tasks"
                v-model="enteredTask.name">
                <button
                  type="button"
                  @click.prevent="addTasks"
                >
                  Add task
                </button>
            </div>
        </fieldset>
        <div>
            <button>Save</button>
        </div>
    </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      enteredTitle: '',
      enteredTask: {
        name: '',
        active: false
      }
    }
  },
  computed: mapGetters(['tasksArr']),
  methods: {
    ...mapActions(['createNewTask', 'changeAddTask', 'saveTask']),
    submitData () {
      this.createNewTask({
        id: new Date().toISOString(),
        title: this.enteredTitle,
        todoArr: this.tasksArr,
        confirm: false
      })
      this.changeAddTask()
      this.saveTask()
      this.enteredTitle = ''
    },
    addTasks () {
      this.tasksArr.push(this.enteredTask)
      this.enteredTask = {
        name: '',
        active: false
      }
    }
  }
}
</script>

<style lang="scss">
  .fieldset {
    border: none;
  }
</style>
