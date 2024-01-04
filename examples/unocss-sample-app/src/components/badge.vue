<script setup lang="ts"></script>

<template>
  <span class="badge">Badge</span>

  <div class="badge">default</div>
  <div class="badge badge-neutral">neutral</div>
  <div class="badge badge-primary">primary</div>
  <div class="badge badge-secondary">secondary</div>
  <div class="badge badge-accent">accent</div>
  <div class="badge badge-ghost">ghost</div>

  <div class="badge badge-outline">default</div>
  <div class="badge badge-primary badge-outline">primary</div>
  <div class="badge badge-secondary badge-outline">secondary</div>
  <div class="badge badge-accent badge-outline">accent</div>

  <div class="badge badge-lg">987,654</div>
  <div class="badge badge-md">987,654</div>
  <div class="badge badge-sm">987,654</div>
  <div class="badge badge-xs">987,654</div>

  <div class="badge badge-primary badge-lg"></div>
  <div class="badge badge-primary badge-md"></div>
  <div class="badge badge-primary badge-sm"></div>
  <div class="badge badge-primary badge-xs"></div>

  <div class="badge badge-info gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="inline-block w-4 h-4 stroke-current"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
    info
  </div>
  <div class="badge badge-success gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="inline-block w-4 h-4 stroke-current"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
    success
  </div>
  <div class="badge badge-warning gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="inline-block w-4 h-4 stroke-current"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
    warning
  </div>
  <div class="badge badge-error gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="inline-block w-4 h-4 stroke-current"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
    error
  </div>

  <h2 class="text-xl">
    Heading
    <span class="badge badge-lg">NEW</span>
  </h2>
  <h3 class="text-lg">
    Heading
    <span class="badge badge-md">NEW</span>
  </h3>
  <h4 class="text-base">
    Heading
    <span class="badge badge-sm">NEW</span>
  </h4>
  <h5 class="text-sm">
    Heading
    <span class="badge badge-xs">NEW</span>
  </h5>

  <button class="btn">
    Inbox
    <div class="badge">+99</div>
  </button>
  <button class="btn">
    Inbox
    <div class="badge badge-secondary">+99</div>
  </button>
</template>
