<template>
  <view>
    <view>Button</view>
    <view>reset</view>
    <view><button class="mp-reset-button">button</button></view>
    <view class="flex">
      <button class="btn btn-primary">button</button>
      <button class="btn">button</button>
      <!-- <button :class="bgRed">bgRed</button> -->
    </view>
  </view>
</template>

<script setup lang="ts">
import { clsx } from 'clsx'

const btn = clsx('bg-primary text-primary-content')
</script>

<style lang="scss" scoped></style>
