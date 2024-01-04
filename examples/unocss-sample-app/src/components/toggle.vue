<script setup lang="ts"></script>

<template>
  <input type="checkbox" class="toggle" checked="" />

  <div class="form-control w-52">
    <label class="cursor-pointer label">
      <span class="label-text">Remember me</span>
      <input type="checkbox" class="toggle" checked="" />
    </label>
  </div>

  <div class="flex flex-col">
    <div class="form-control w-52">
      <label class="cursor-pointer label">
        <span class="label-text">Remember me</span>
        <input type="checkbox" class="toggle toggle-primary" checked="" />
      </label>
    </div>
    <div class="form-control w-52">
      <label class="cursor-pointer label">
        <span class="label-text">Remember me</span>
        <input type="checkbox" class="toggle toggle-secondary" checked="" />
      </label>
    </div>
    <div class="form-control w-52">
      <label class="cursor-pointer label">
        <span class="label-text">Remember me</span>
        <input type="checkbox" class="toggle toggle-accent" checked="" />
      </label>
    </div>
  </div>

  <div class="flex flex-col items-center gap-2">
    <input type="checkbox" class="toggle toggle-success" checked="" />
    <input type="checkbox" class="toggle toggle-warning" checked="" />
    <input type="checkbox" class="toggle toggle-info" checked="" />
    <input type="checkbox" class="toggle toggle-error" checked="" />
  </div>

  <div class="flex flex-col items-center gap-2">
    <input type="checkbox" class="toggle toggle-xs" checked="" />
    <input type="checkbox" class="toggle toggle-sm" checked="" />
    <input type="checkbox" class="toggle toggle-md" checked="" />
    <input type="checkbox" class="toggle toggle-lg" checked="" />
  </div>

  <input type="checkbox" class="toggle" disabled="" />

  <input type="checkbox" class="toggle" disabled="" checked="" />

  <input type="checkbox" class="toggle" indeterminate="true" />

  <input
    type="checkbox"
    class="toggle [--tglbg:yellow] bg-blue-500 hover:bg-blue-700 border-blue-500"
    checked=""
  />
</template>
