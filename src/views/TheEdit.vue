<template>
    <section>
        <h3 class="item__heading">{{ editTask.title }}</h3>
        <ul class="item__list">
            <edit-todo
                ref="editTodo"
                v-for="(todo, index) in editTask.todoArr"
                :key="generateKey(todo.name, todo.active)"
                :id="index"
                :todo="todo.name"
                :active="todo.active"
                :todoArr="editTask.todoArr"
            >
            </edit-todo>
            <button class="item__btn item__btn-save"
            @click="addTaskEdit">
              + add todo
            </button>
            <edit-add
            v-show="activeAdd">
            </edit-add>
        </ul>
        <div>
          <h3>Actions with a note</h3>
          <div>
            <button class="item__btn item__btn-save"
              @click="saveChangeObj"
            >
              save changes
            </button>
            <button class="item__btn item__btn-edit"
            @click="confirmCencel">
              cancel editing
            </button>
          </div>
          <div>
            <button class="item__btn item__btn-delete"
            @click="confirmDelete">
              delete
            </button>
            <button class="item__btn item__btn-change"
              @click="undoChange"
            >
              undo the change made
            </button>
          </div>
          <button class="item__btn item__btn-change"
            @click="parseLocalSt"
          >
            redo the undone change
          </button>
        </div>
        <the-confirmation v-show="editTask.confirm">
          <p>Are you sure you want to undo your edit?</p>
          <button @click="delTodoEdit">Yes</button>
          <button @click="editTask.confirm = !editTask.confirm">Cancel</button>
        </the-confirmation>
        <the-confirmation v-show="repeal">
          <p>Are you sure you want to undo your edit?</p>
          <button @click="editClouseCencel">Yes</button>
          <button @click="clouseCencel">Cancel</button>
        </the-confirmation>
    </section>
</template>

<script>
import EditTodo from '../components/EditTodo.vue'
import TheConfirmation from '../components/UI/TheConfirmation.vue'
import EditAdd from '../components/EditAdd.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      repeal: false,
      isActive: false
    }
  },
  components: {
    EditTodo,
    TheConfirmation,
    EditAdd
  },
  created () {
    this.localStSave()
    this.localStParse()
  },
  computed: {
    ...mapGetters(['editTask', 'activeAdd'])
  },
  methods: {
    ...mapActions(['changeUndo', 'saveTask', 'confirmDel', 'changeActiveAdd', 'saveObj', 'todoDeleteEdit', 'localStSave', 'localStParse']),
    confirmCencel () {
      this.repeal = !this.repeal
    },
    generateKey (name, active) {
      const uniqueKey = `${name} - ${active}`
      return uniqueKey
    },
    confirmDelete () {
      this.confirmDel()
    },
    delTodoEdit () {
      this.todoDeleteEdit()
      this.saveTask()
      this.editCencel()
    },
    deleteTodoEdit () {
      this.confirmDel()
      this.delTodoEdit()
    },
    addTaskEdit () {
      this.changeActiveAdd()
    },
    saveChangeObj () {
      this.saveObj()
      this.saveTask()
      this.editCencel()
    },
    editCencel () {
      this.$router.push({ name: 'TheHome' })
    },
    clouseCencel () {
      this.repeal = !this.repeal
    },
    editClouseCencel () {
      this.editCencel()
      this.clouseCencel()
    },
    undoChange () {
      this.changeUndo()
    },
    parseLocalSt () {
      this.localStParse()
    }
  }
}
</script>

<style lang="scss">
.item__btn {
  &-save {
    background: green;
  }
  &-change {
    background: black;
  }
}
</style>
