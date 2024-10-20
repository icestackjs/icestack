<script setup lang="ts">
import button from '../../cva/button'

const classname = button({
  class: ['flex'],
})
</script>

<template>
  <button :class="classname">
    <slot />
  </button>
</template>

<style scoped lang="scss">
/* @meta path="button" */
.cbtn {
  /* @b */
}
</style>
