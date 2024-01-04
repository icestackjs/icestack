<script setup lang="ts"></script>

<template>
  <div>
    <div class="grid w-32 h-20 rounded bg-primary text-primary-content place-content-center">1</div>
    <div class="grid w-32 h-20 rounded bg-accent text-accent-content place-content-center">2</div>
    <div class="grid w-32 h-20 rounded bg-secondary text-secondary-content place-content-center">
      3
    </div>
  </div>

  <div class="stack mb-4">
    <div class="grid w-32 h-20 rounded bg-primary text-primary-content place-content-center">1</div>
    <div class="grid w-32 h-20 rounded bg-accent text-accent-content place-content-center">2</div>
    <div class="grid w-32 h-20 rounded bg-secondary text-secondary-content place-content-center">
      3
    </div>
  </div>

  <div class="stack mb-4">
    <img
      src="/images/stock/photo-1559703248-dcaaec9fab78.jpg"
      alt="Tailwind CSS example 1"
      class="rounded w-28"
    />
    <img
      src="/images/stock/photo-1565098772267-60af42b81ef2.jpg"
      alt="Tailwind CSS example 2"
      class="rounded w-28"
    />
    <img
      src="/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
      alt="Tailwind CSS example 3"
      class="rounded w-28"
    />
  </div>

  <div class="stack mb-4">
    <div class="text-center border border-base-content card w-36 bg-base-100">
      <div class="card-body">A</div>
    </div>
    <div class="text-center border border-base-content card w-36 bg-base-100">
      <div class="card-body">B</div>
    </div>
    <div class="text-center border border-base-content card w-36 bg-base-100">
      <div class="card-body">C</div>
    </div>
  </div>

  <div class="stack mb-4">
    <div class="text-center shadow-md w-36 card bg-base-200"><div class="card-body">A</div></div>
    <div class="text-center shadow w-36 card bg-base-200"><div class="card-body">B</div></div>
    <div class="text-center shadow-sm w-36 card bg-base-200"><div class="card-body">C</div></div>
  </div>

  <div class="stack mb-4">
    <div class="shadow-md card bg-primary text-primary-content">
      <div class="card-body">
        <h2 class="card-title">Notification 1</h2>
        <p>You have 3 unread messages. Tap here to see.</p>
      </div>
    </div>
    <div class="shadow card bg-primary text-primary-content">
      <div class="card-body">
        <h2 class="card-title">Notification 2</h2>
        <p>You have 3 unread messages. Tap here to see.</p>
      </div>
    </div>
    <div class="shadow-sm card bg-primary text-primary-content">
      <div class="card-body">
        <h2 class="card-title">Notification 3</h2>
        <p>You have 3 unread messages. Tap here to see.</p>
      </div>
    </div>
  </div>
</template>
