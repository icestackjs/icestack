<script setup lang="ts"></script>

<template>
  <div>
    <textarea class="textarea" placeholder="Bio"></textarea>

    <textarea class="textarea textarea-bordered" placeholder="Bio"></textarea>

    <textarea class="textarea textarea-ghost" placeholder="Bio"></textarea>

    <label class="form-control">
      <div class="label">
        <span class="label-text">Your bio</span>
        <span class="label-text-alt">Alt label</span>
      </div>
      <textarea class="textarea h-24 textarea-bordered" placeholder="Bio"></textarea>
      <div class="label">
        <span class="label-text-alt">Your bio</span>
        <span class="label-text-alt">Alt label</span>
      </div>
    </label>

    <textarea class="textarea textarea-primary" placeholder="Bio"></textarea>

    <textarea class="textarea textarea-secondary" placeholder="Bio"></textarea>

    <textarea class="textarea textarea-accent" placeholder="Bio"></textarea>

    <textarea class="textarea textarea-info" placeholder="Bio"></textarea>

    <textarea class="textarea textarea-success" placeholder="Bio"></textarea>

    <textarea class="textarea textarea-warning" placeholder="Bio"></textarea>

    <textarea class="textarea textarea-error" placeholder="Bio"></textarea>

    <div class="flex flex-col gap-4 w-full items-center">
      <textarea
        placeholder="Bio"
        class="textarea textarea-bordered textarea-xs w-full max-w-xs"
      ></textarea>
      <textarea
        placeholder="Bio"
        class="textarea textarea-bordered textarea-sm w-full max-w-xs"
      ></textarea>
      <textarea
        placeholder="Bio"
        class="textarea textarea-bordered textarea-md w-full max-w-xs"
      ></textarea>
      <textarea
        placeholder="Bio"
        class="textarea textarea-bordered textarea-lg w-full max-w-xs"
      ></textarea>
    </div>

    <textarea class="textarea" placeholder="Bio" disabled=""></textarea>
  </div>
</template>
