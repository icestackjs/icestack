<template>
  <div>
    <div class="space-x-2">
      <button class="btn btn-primary" @click="setColorMode('light')">light</button>
      <button class="btn btn-neutral" @click="setColorMode('dark')">dark</button>
    </div>
    <NuxtPage></NuxtPage>
  </div>
</template>
<script setup lang="ts">
const colorMode = useColorMode()

function setColorMode(value: string) {
  colorMode.value = value
}

</script>
<style lang="scss">
:root {
  @apply bg-base-100 text-base-content;
}
</style>