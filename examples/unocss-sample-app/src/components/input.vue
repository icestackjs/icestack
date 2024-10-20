<script setup lang="ts"></script>

<template>
  <div>
    <input type="text" placeholder="Type here" class="input w-full max-w-xs">

    <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs">

    <input type="text" placeholder="Type here" class="input input-ghost w-full max-w-xs">

    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">What is your name?</span>
        <span class="label-text-alt">Top Right label</span>
      </div>
      <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs">
      <div class="label">
        <span class="label-text-alt">Bottom Left label</span>
        <span class="label-text-alt">Bottom Right label</span>
      </div>
    </label>

    <input
      type="text"
      placeholder="Type here"
      class="input input-bordered input-primary w-full max-w-xs"
    >

    <input
      type="text"
      placeholder="Type here"
      class="input input-bordered input-secondary w-full max-w-xs"
    >

    <input
      type="text"
      placeholder="Type here"
      class="input input-bordered input-accent w-full max-w-xs"
    >

    <input
      type="text"
      placeholder="Type here"
      class="input input-bordered input-info w-full max-w-xs"
    >

    <input
      type="text"
      placeholder="Type here"
      class="input input-bordered input-success w-full max-w-xs"
    >

    <input
      type="text"
      placeholder="Type here"
      class="input input-bordered input-warning w-full max-w-xs"
    >

    <input
      type="text"
      placeholder="Type here"
      class="input input-bordered input-error w-full max-w-xs"
    >

    <div class="flex flex-col gap-4 w-full items-center">
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered input-xs w-full max-w-xs"
      >
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered input-sm w-full max-w-xs"
      >
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered input-md w-full max-w-xs"
      >
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered input-lg w-full max-w-xs"
      >
    </div>

    <input
      type="text"
      placeholder="You can't touch this"
      class="input input-bordered w-full max-w-xs"
      disabled=""
    >
  </div>
</template>
