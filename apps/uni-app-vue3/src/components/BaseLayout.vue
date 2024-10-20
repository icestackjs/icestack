<script lang="ts" setup>
import ConfigProvider from './ConfigProvider.vue'
</script>

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
    <ConfigProvider>
      <slot />
    </ConfigProvider>
  </view>
</template>

<style lang="scss" scoped></style>
