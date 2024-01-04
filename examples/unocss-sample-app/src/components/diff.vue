<script setup lang="ts"></script>

<template>
  <div class="diff rounded-btn aspect-[16/9]">
    <div class="diff-item-1">
      <img alt="daisy" src="/images/stock/photo-1560717789-0ac7c58ac90a.jpg" />
    </div>
    <div class="diff-item-2">
      <img alt="daisy" src="/images/stock/photo-1560717789-0ac7c58ac90a-blur.jpg" />
    </div>
    <div class="diff-resizer"></div>
  </div>

  <div class="diff rounded-btn aspect-[16/9]">
    <div class="diff-item-1">
      <div
        class="bg-primary text-primary-content text-4xl lg:text-9xl font-black grid place-content-center"
      >
        DAISY
      </div>
    </div>
    <div class="diff-item-2">
      <div class="bg-base-200 text-4xl lg:text-9xl font-black grid place-content-center">DAISY</div>
    </div>
    <div class="diff-resizer"></div>
  </div>
</template>
