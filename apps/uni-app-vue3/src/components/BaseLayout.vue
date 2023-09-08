<template>
  <view>
    <ConfigProvider>
      <slot></slot>
    </ConfigProvider>
  </view>
</template>

<script lang="ts" setup>
import ConfigProvider from './ConfigProvider.vue'
</script>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  options: {
    virtualHost: true
  }
})
</script>

<style lang="scss" scoped></style>
