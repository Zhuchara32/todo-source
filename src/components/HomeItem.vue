<template>
    <li class="home-list__item item">
        <h3 class="item__heading">{{ title }}</h3>
        <ul class="item__list">
            <home-todo
                v-for="todo in showArr"
                :key="todo.name"
                :todo="todo.name"
                :active="todo.active"
            >
            </home-todo>
        </ul>
        <p>...</p>
        <button class="item__btn-edit item__btn"
          @click="editTask(id)"
        >
          Edit
        </button>
        <button class="item__btn-delete item__btn"
          @click="confirmDelete(id)"
        >
          Delete
        </button>
        <!-- <teleport to="body"> -->
          <the-confirmation v-if="confirm">
            <p>Are you sure you want to delete the task?</p>
            <button @click="deleteTask(id)">Yes</button>
            <button @click="confirmDelete(id)">Cancel</button>
          </the-confirmation>
        <!-- </teleport> -->
    </li>
</template>

<script>
import HomeTodo from './HomeTodo.vue'
import TheConfirmation from './UI/TheConfirmation.vue'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      showArr: []
    }
  },
  components: {
    HomeTodo,
    TheConfirmation
  },
  props: {
    mainArr: Array,
    todoArr: Array,
    id: String,
    title: String,
    confirm: Boolean,
    idx: Number
  },
  mounted () {
    this.showArr = this.todoArr.slice(0, 2)
  },
  methods: {
    ...mapActions(['delTask', 'confirmDelTask', 'showTodoFirst', 'saveTask', 'taskEdit']),
    deleteTask (id) {
      this.delTask(id)
      this.saveTask()
    },
    confirmDelete (id) {
      this.confirmDelTask(id)
    },
    editTask (id) {
      this.$router.push({ name: 'TheEdit', params: { id: id } })
      this.taskEdit(id)
    }
  }
}
</script>

<style lang="scss">
.item {
  padding: 1rem;

  &__heading {
    text-transform: capitalize;
    line-height: 2;
  }
  &__btn {
    margin: 0.2rem;
    padding: 0.2rem 0.5rem;
    color: #ffffff;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    text-transform: capitalize;

    &-delete {
      background: red;
    }
    &-edit {
      background: grey;
    }
  }
}
</style>
