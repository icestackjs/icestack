<script setup lang="ts">
import IceButton from './components/IceButton.vue';
// https://tailwindcomponents.com/component/button-with-hover-effect-and-icon-moves-away
</script>

<template>
  <div>
    <IceButton>IceButton</IceButton>
    <IceButton class="btn-primary">IceButton</IceButton>
    <div class="xxx"></div>
    <div class="yyy"></div>
  </div>
</template>

<style lang="scss">
@icestack components.xxx.base;
@icestack components.yyy;
// @icestack components.yyy.base;
// @icestack components.yyy.styled;
// @icestack components.yyy.utils;
</style>
