<script setup lang="ts"></script>

<template>
  <div>
    <input type="file" class="file-input w-full max-w-xs">

    <input type="file" class="file-input file-input-bordered w-full max-w-xs">

    <input type="file" class="file-input file-input-ghost w-full max-w-xs">

    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Pick a file</span>
        <span class="label-text-alt">Alt label</span>
      </div>
      <input type="file" class="file-input file-input-bordered w-full max-w-xs">
      <div class="label">
        <span class="label-text-alt">Alt label</span>
        <span class="label-text-alt">Alt label</span>
      </div>
    </label>

    <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs">

    <input
      type="file"
      class="file-input file-input-bordered file-input-secondary w-full max-w-xs"
    >

    <input type="file" class="file-input file-input-bordered file-input-accent w-full max-w-xs">

    <input type="file" class="file-input file-input-bordered file-input-info w-full max-w-xs">

    <input type="file" class="file-input file-input-bordered file-input-success w-full max-w-xs">

    <input type="file" class="file-input file-input-bordered file-input-warning w-full max-w-xs">

    <input type="file" class="file-input file-input-bordered file-input-error w-full max-w-xs">

    <div class="flex flex-col gap-4 w-full items-center">
      <input type="file" class="file-input file-input-bordered file-input-xs w-full max-w-xs">
      <input type="file" class="file-input file-input-bordered file-input-sm w-full max-w-xs">
      <input type="file" class="file-input file-input-bordered file-input-md w-full max-w-xs">
      <input type="file" class="file-input file-input-bordered file-input-lg w-full max-w-xs">
    </div>

    <input
      type="file"
      placeholder="You can't touch this"
      class="file-input file-input-bordered w-full max-w-xs"
      disabled=""
    >
  </div>
</template>
