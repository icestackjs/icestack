<script setup lang="ts"></script>

<template>
  <div>
    <div class="skeleton w-32 h-32" />

    <div class="flex flex-col gap-4 w-52">
      <div class="flex gap-4 items-center">
        <div class="skeleton w-16 h-16 rounded-full shrink-0" />
        <div class="flex flex-col gap-4">
          <div class="skeleton h-4 w-20" />
          <div class="skeleton h-4 w-28" />
        </div>
      </div>
      <div class="skeleton h-32 w-full" />
    </div>

    <div class="flex flex-col gap-4 w-52">
      <div class="skeleton h-32 w-full" />
      <div class="skeleton h-4 w-28" />
      <div class="skeleton h-4 w-full" />
      <div class="skeleton h-4 w-full" />
    </div>
  </div>
</template>
