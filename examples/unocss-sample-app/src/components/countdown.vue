<script setup lang="ts"></script>

<template>
  <div>
    <span class="countdown"><span style="--value: 59" /></span>

    <span class="countdown font-mono text-6xl"><span style="--value: 59" /></span>

    <span class="font-mono text-2xl countdown">
      <span style="--value: 10" />
      h
      <span style="--value: 24" />
      m
      <span style="--value: 59" />
      s
    </span>

    <span class="font-mono text-2xl countdown">
      <span style="--value: 10" />
      :
      <span style="--value: 24" />
      :
      <span style="--value: 59" />
    </span>

    <div class="flex gap-5">
      <div>
        <span class="font-mono text-4xl countdown"><span style="--value: 15" /></span>
        days
      </div>
      <div>
        <span class="font-mono text-4xl countdown"><span style="--value: 10" /></span>
        hours
      </div>
      <div>
        <span class="font-mono text-4xl countdown"><span style="--value: 24" /></span>
        minutes
      </div>
      <div>
        <span class="font-mono text-4xl countdown"><span style="--value: 59" /></span>
        sec
      </div>
    </div>

    <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div class="flex flex-col">
        <span class="font-mono text-5xl countdown"><span style="--value: 15" /></span>
        days
      </div>
      <div class="flex flex-col">
        <span class="font-mono text-5xl countdown"><span style="--value: 10" /></span>
        hours
      </div>
      <div class="flex flex-col">
        <span class="font-mono text-5xl countdown"><span style="--value: 24" /></span>
        min
      </div>
      <div class="flex flex-col">
        <span class="font-mono text-5xl countdown"><span style="--value: 59" /></span>
        sec
      </div>
    </div>

    <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="font-mono text-5xl countdown"><span style="--value: 15" /></span>
        days
      </div>
      <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="font-mono text-5xl countdown"><span style="--value: 10" /></span>
        hours
      </div>
      <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="font-mono text-5xl countdown"><span style="--value: 24" /></span>
        min
      </div>
      <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="font-mono text-5xl countdown"><span style="--value: 59" /></span>
        sec
      </div>
    </div>
  </div>
</template>
