<script setup lang="ts"></script>

<template>
  <input type="checkbox" checked="checked" class="checkbox" />

  <div class="form-control w-52">
    <label class="cursor-pointer label">
      <span class="label-text">Remember me</span>
      <input type="checkbox" checked="checked" class="checkbox" />
    </label>
  </div>

  <div class="form-control w-52">
    <label class="cursor-pointer label">
      <span class="label-text">Remember me</span>
      <input type="checkbox" checked="checked" class="checkbox checkbox-primary" />
    </label>
  </div>

  <div class="form-control w-52">
    <label class="cursor-pointer label">
      <span class="label-text">Remember me</span>
      <input type="checkbox" checked="checked" class="checkbox checkbox-secondary" />
    </label>
  </div>

  <div class="form-control w-52">
    <label class="cursor-pointer label">
      <span class="label-text">Remember me</span>
      <input type="checkbox" checked="checked" class="checkbox checkbox-accent" />
    </label>
  </div>

  <div class="form-control w-52">
    <label class="cursor-pointer label">
      <span class="label-text">Remember me</span>
      <input type="checkbox" checked="checked" class="checkbox checkbox-success" />
    </label>
  </div>

  <div class="form-control w-52">
    <label class="cursor-pointer label">
      <span class="label-text">Remember me</span>
      <input type="checkbox" checked="checked" class="checkbox checkbox-warning" />
    </label>
  </div>

  <div class="form-control w-52">
    <label class="cursor-pointer label">
      <span class="label-text">Remember me</span>
      <input type="checkbox" checked="checked" class="checkbox checkbox-info" />
    </label>
  </div>

  <div class="form-control w-52">
    <label class="cursor-pointer label">
      <span class="label-text">Remember me</span>
      <input type="checkbox" checked="checked" class="checkbox checkbox-error" />
    </label>
  </div>

  <div class="flex flex-col items-center gap-2">
    <input type="checkbox" checked="checked" class="checkbox checkbox-xs" />
    <input type="checkbox" checked="checked" class="checkbox checkbox-sm" />
    <input type="checkbox" checked="checked" class="checkbox checkbox-md" />
    <input type="checkbox" checked="checked" class="checkbox checkbox-lg" />
  </div>

  <input type="checkbox" disabled="disabled" class="checkbox" />

  <input type="checkbox" disabled="disabled" class="checkbox" checked="checked" />

  <input type="checkbox" class="checkbox" indeterminate="true" />

  <input
    type="checkbox"
    checked="checked"
    class="checkbox border-orange-400 checked:border-indigo-800 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange]"
  />
  <input
    type="checkbox"
    checked="checked"
    class="checkbox [--chkbg:oklch(var(--a))] [--chkfg:oklch(var(--p))]"
  />
</template>
