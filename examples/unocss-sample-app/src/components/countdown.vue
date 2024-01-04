<script setup lang="ts"></script>

<template>
  <span class="countdown"><span style="--value: 59"></span></span>

  <span class="countdown font-mono text-6xl"><span style="--value: 59"></span></span>

  <span class="font-mono text-2xl countdown">
    <span style="--value: 10"></span>
    h
    <span style="--value: 24"></span>
    m
    <span style="--value: 59"></span>
    s
  </span>

  <span class="font-mono text-2xl countdown">
    <span style="--value: 10"></span>
    :
    <span style="--value: 24"></span>
    :
    <span style="--value: 59"></span>
  </span>

  <div class="flex gap-5">
    <div>
      <span class="font-mono text-4xl countdown"><span style="--value: 15"></span></span>
      days
    </div>
    <div>
      <span class="font-mono text-4xl countdown"><span style="--value: 10"></span></span>
      hours
    </div>
    <div>
      <span class="font-mono text-4xl countdown"><span style="--value: 24"></span></span>
      minutes
    </div>
    <div>
      <span class="font-mono text-4xl countdown"><span style="--value: 59"></span></span>
      sec
    </div>
  </div>

  <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
    <div class="flex flex-col">
      <span class="font-mono text-5xl countdown"><span style="--value: 15"></span></span>
      days
    </div>
    <div class="flex flex-col">
      <span class="font-mono text-5xl countdown"><span style="--value: 10"></span></span>
      hours
    </div>
    <div class="flex flex-col">
      <span class="font-mono text-5xl countdown"><span style="--value: 24"></span></span>
      min
    </div>
    <div class="flex flex-col">
      <span class="font-mono text-5xl countdown"><span style="--value: 59"></span></span>
      sec
    </div>
  </div>

  <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
      <span class="font-mono text-5xl countdown"><span style="--value: 15"></span></span>
      days
    </div>
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
      <span class="font-mono text-5xl countdown"><span style="--value: 10"></span></span>
      hours
    </div>
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
      <span class="font-mono text-5xl countdown"><span style="--value: 24"></span></span>
      min
    </div>
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
      <span class="font-mono text-5xl countdown"><span style="--value: 59"></span></span>
      sec
    </div>
  </div>
</template>
