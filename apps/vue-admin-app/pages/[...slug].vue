<template>
  <main>
    <ContentDoc />
  </main>
</template>
<script setup lang="ts">
const colorMode = useColorMode()

console.log(colorMode.preference)
</script>