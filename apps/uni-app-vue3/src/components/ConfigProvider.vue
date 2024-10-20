<script lang="ts" setup></script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  options: {
    virtualHost: true,
  },
})
</script>

<template>
  <view>
    <slot />
  </view>
</template>

<style lang="scss" scoped></style>
