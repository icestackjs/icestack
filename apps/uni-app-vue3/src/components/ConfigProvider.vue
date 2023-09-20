<template>
  <view>
    <slot></slot>
  </view>
</template>

<script lang="ts" setup></script>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  options: {
    virtualHost: true
  }
})
</script>
<style lang="scss" scoped></style>
