<template>
  <button :class="classname">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import button, { Props as ButtonProps } from '../../cva/button'

const classname = button({
  class: ['flex']
})
</script>

<style scoped lang="scss">
/* @meta path="button" */
.cbtn {
  /* @b */
}
</style>
