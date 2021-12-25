<template>
    <form @submit.prevent="submitChange(id)">
        <input type="text"
            :for="id"
            placeholder="change tasks"
            v-model="name">
        <button>Save</button>
    </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      name: ''
    }
  },
  props: ['id', 'todo'],
  methods: {
    ...mapActions(['changeTask', 'localStSave']),
    submitChange (id) {
      this.$store.commit('changeTask', {
        id,
        item: {
          name: this.name,
          active: false
        }
      })
      this.localStSave()
    }
  }
}
</script>
