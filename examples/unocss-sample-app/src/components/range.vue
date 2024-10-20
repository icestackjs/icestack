<script setup lang="ts"></script>

<template>
  <div>
    <input type="range" min="0" max="100" value="40" class="range max-w-xs">

    <div class="w-full max-w-xs">
      <input type="range" min="0" max="100" value="25" class="range max-w-xs" step="25">
      <div class="w-full flex justify-between text-xs px-2 max-w-xs">
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
    </div>

    <input type="range" min="0" max="100" value="40" class="range range-primary max-w-xs">

    <input type="range" min="0" max="100" value="40" class="range range-secondary max-w-xs">

    <input type="range" min="0" max="100" value="40" class="range range-accent max-w-xs">

    <input type="range" min="0" max="100" value="40" class="range range-success max-w-xs">

    <input type="range" min="0" max="100" value="40" class="range range-warning max-w-xs">

    <input type="range" min="0" max="100" value="40" class="range range-info max-w-xs">

    <input type="range" min="0" max="100" value="40" class="range range-error max-w-xs">

    <div class="flex flex-col w-full items-center gap-4">
      <input type="range" min="0" max="100" value="40" class="range range-xs max-w-xs">
      <input type="range" min="0" max="100" value="50" class="range range-sm max-w-xs">
      <input type="range" min="0" max="100" value="60" class="range range-md max-w-xs">
      <input type="range" min="0" max="100" value="70" class="range range-lg max-w-xs">
    </div>
  </div>
</template>
