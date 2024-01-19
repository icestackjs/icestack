<template>
  <button :class="className">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import X from '../cva'
const props = defineProps()
const className = X.button(props)
</script>

<style lang="scss" scoped>
@icestack components.button;
</style>