<script setup lang="ts"></script>

<template>
  <div>
    <div class="radial-progress" style="--value: 70" role="progressbar">
      70%
    </div>

    <div class="radial-progress" style="--value: 0" role="progressbar">
      0%
    </div>
    <div class="radial-progress" style="--value: 20" role="progressbar">
      20%
    </div>
    <div class="radial-progress" style="--value: 60" role="progressbar">
      60%
    </div>
    <div class="radial-progress" style="--value: 80" role="progressbar">
      80%
    </div>
    <div class="radial-progress" style="--value: 100" role="progressbar">
      100%
    </div>

    <div class="radial-progress text-primary" style="--value: 70" role="progressbar">
      70%
    </div>

    <div
      class="radial-progress bg-primary text-primary-content border-4 border-primary"
      style="--value: 70"
      role="progressbar"
    >
      70%
    </div>

    <div
      class="radial-progress"
      style="--value: 70; --size: 12rem; --thickness: 2px"
      role="progressbar"
    >
      70%
    </div>
    <div
      class="radial-progress"
      style="--value: 70; --size: 12rem; --thickness: 2rem"
      role="progressbar"
    >
      70%
    </div>
  </div>
</template>
