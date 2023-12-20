<template>
  <div>
    <div class="space-x-2">
      <button class="btn btn-primary" @click="setColorMode('light')">light</button>
      <button class="btn btn-neutral" @click="setColorMode('dark')">dark</button>
    </div>
    <NuxtPage></NuxtPage>
    <div class="text-red-400 dark:text-blue-300">ccav</div>
  </div>
</template>
<script setup lang="ts">
const colorMode = useColorMode()

function setColorMode(value: string) {
  colorMode.value = value
}

</script>
<style lang="scss">
:root,
[data-theme] {
  @apply bg-base-100 text-base-content;
}
</style>