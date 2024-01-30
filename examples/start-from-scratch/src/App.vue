<script setup lang="ts">
import IceButton from './components/IceButton.vue';

</script>

<template>
  <div>
    <IceButton></IceButton>
    <a href="https://icebreaker.top/" target="_blank" class="cbtn">
      Hover Me
    </a>
    <button href="https://icebreaker.top/" target="_blank" class="cbtn flex">
      <span>Hover Me</span>
    </button>
  </div>
  <div class="sd">123213</div>
  <div class="xaxa">123</div>
</template>

<style lang="scss">
.x {
  color: red;
}

// @apply should not be used with the 'group' utility
</style>
