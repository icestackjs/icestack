<script setup lang="ts"></script>

<template>
  <input type="radio" name="radio-1" class="radio" checked="" />
  <input type="radio" name="radio-1" class="radio" />

  <input type="radio" name="radio-2" class="radio radio-primary" checked="" />
  <input type="radio" name="radio-2" class="radio radio-primary" />

  <input type="radio" name="radio-3" class="radio radio-secondary" checked="" />
  <input type="radio" name="radio-3" class="radio radio-secondary" />

  <input type="radio" name="radio-4" class="radio radio-accent" checked="" />
  <input type="radio" name="radio-4" class="radio radio-accent" />

  <input type="radio" name="radio-5" class="radio radio-success" checked="" />
  <input type="radio" name="radio-5" class="radio radio-success" />

  <input type="radio" name="radio-6" class="radio radio-warning" checked="" />
  <input type="radio" name="radio-6" class="radio radio-warning" />

  <input type="radio" name="radio-7" class="radio radio-info" checked="" />
  <input type="radio" name="radio-7" class="radio radio-info" />

  <input type="radio" name="radio-8" class="radio radio-error" checked="" />
  <input type="radio" name="radio-8" class="radio radio-error" />

  <input type="radio" name="radio-9" class="radio" disabled="" checked="" />
  <input type="radio" name="radio-9" class="radio" disabled="" />

  <div class="flex flex-col">
    <div class="form-control w-52">
      <label class="cursor-pointer label">
        <span class="label-text">Red pill</span>
        <input type="radio" name="radio-10" class="radio checked:bg-red-500" checked="" />
      </label>
    </div>
    <div class="form-control w-52">
      <label class="cursor-pointer label">
        <span class="label-text">Blue pill</span>
        <input type="radio" name="radio-10" class="radio checked:bg-blue-500" checked="" />
      </label>
    </div>
  </div>
</template>
