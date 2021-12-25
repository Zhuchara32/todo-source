<template>
    <li>
      <input type="checkbox"
        :name="todo"
        :value="id"
        v-model="check"
      >
      <label :for="id">{{ todo }}</label>
      <button class="item__btn item__btn-delete"
        @click="delTodo(id)"
      >
        -
      </button>
      <button class="item__btn item__btn-edit"
        @click="editAdd"
      >
        edit
      </button>
      <edit-task
        v-show="isActive"
        :id="id"
        :todo="todo">
      </edit-task>
    </li>
</template>

<script>
import EditTask from './EditTask.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    EditTask
  },
  data () {
    return {
      check: this.active,
      enteredTask: {
        name: '',
        active: false
      },
      isActive: false
    }
  },
  props: ['todo', 'todoArr', 'id', 'active'],
  watch: {
    check () {
      this.activeCheckedChange(this.id)
    }
  },
  methods: {
    ...mapActions(['chengeActiveChecked', 'changeTask', 'todoDel', 'localStSave', 'localStParse']),
    taskChange (id, name) {
      this.enteredTask.name = name
      this.changeTask(id, this.enteredTask)
      this.localStSave()
    },
    editAdd () {
      this.isActive = !this.isActive
    },
    delTodo (id) {
      this.todoDel(id)
      this.localStSave()
    },
    activeCheckedChange (idx) {
      this.chengeActiveChecked(idx)
      this.localStSave()
    }
  }
}
</script>
