<template>
    <li>
      <input type="checkbox"
      name="interest"
      value="coding"
      disabled
      :checked="active === true"
      >
      <label for="coding">{{ todo }}</label>
    </li>
</template>

<script>
export default {
  props: ['todo', 'active']
}
</script>

<style lang="scss" scoped>
</style>
