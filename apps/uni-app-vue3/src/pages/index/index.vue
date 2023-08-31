<template>
  <view>
    <view>Button</view>
    <view>reset</view>
    <view><button class="mp-reset-button">button</button></view>
    <view class="flex">
      <button class="btn btn-primary">button</button>
      <button class="btn">button</button>
      <!-- <button :class="cls">cls</button> -->
    </view>

    <view :class="cls">cls</view>
  </view>
</template>

<script setup lang="ts">
import { css } from '@/styled-system/css'
// :class="cls"
const cls = css({
  bg: 'amber.700',
  color: 'gray.100'
})
// import { css } from '@linaria/vite'
// const bgRed = css`
//   background: red;
// `
</script>

<style lang="scss" scoped></style>
