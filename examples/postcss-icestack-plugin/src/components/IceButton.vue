<script setup lang="ts">
import X from '../cva'

const props = defineProps()
const className = X.button(props)
</script>

<template>
  <button :class="className">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@icestack components.button;
</style>
