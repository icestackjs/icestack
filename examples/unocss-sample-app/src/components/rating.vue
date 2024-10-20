<script setup lang="ts"></script>

<template>
  <div>
    <div class="rating">
      <input type="radio" name="rating-1" class="mask mask-star">
      <input type="radio" name="rating-1" class="mask mask-star" checked="">
      <input type="radio" name="rating-1" class="mask mask-star">
      <input type="radio" name="rating-1" class="mask mask-star">
      <input type="radio" name="rating-1" class="mask mask-star">
    </div>

    <div class="rating">
      <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400">
      <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked="">
      <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400">
      <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400">
      <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400">
    </div>

    <div class="gap-1 rating">
      <input type="radio" name="rating-3" class="mask mask-heart bg-red-400">
      <input type="radio" name="rating-3" class="mask mask-heart bg-orange-400" checked="">
      <input type="radio" name="rating-3" class="mask mask-heart bg-yellow-400">
      <input type="radio" name="rating-3" class="mask mask-heart bg-lime-400">
      <input type="radio" name="rating-3" class="mask mask-heart bg-green-400">
    </div>

    <div class="rating">
      <input type="radio" name="rating-4" class="bg-green-500 mask mask-star-2">
      <input type="radio" name="rating-4" class="bg-green-500 mask mask-star-2" checked="">
      <input type="radio" name="rating-4" class="bg-green-500 mask mask-star-2">
      <input type="radio" name="rating-4" class="bg-green-500 mask mask-star-2">
      <input type="radio" name="rating-4" class="bg-green-500 mask mask-star-2">
    </div>

    <div class="flex flex-col gap-2 items-center">
      <div class="rating rating-xs">
        <input type="radio" name="rating-5" class="mask mask-star-2 bg-orange-400">
        <input type="radio" name="rating-5" class="mask mask-star-2 bg-orange-400" checked="">
        <input type="radio" name="rating-5" class="mask mask-star-2 bg-orange-400">
        <input type="radio" name="rating-5" class="mask mask-star-2 bg-orange-400">
        <input type="radio" name="rating-5" class="mask mask-star-2 bg-orange-400">
      </div>
      <div class="rating rating-sm">
        <input type="radio" name="rating-6" class="mask mask-star-2 bg-orange-400">
        <input type="radio" name="rating-6" class="mask mask-star-2 bg-orange-400" checked="">
        <input type="radio" name="rating-6" class="mask mask-star-2 bg-orange-400">
        <input type="radio" name="rating-6" class="mask mask-star-2 bg-orange-400">
        <input type="radio" name="rating-6" class="mask mask-star-2 bg-orange-400">
      </div>
      <div class="rating rating-md">
        <input type="radio" name="rating-7" class="mask mask-star-2 bg-orange-400">
        <input type="radio" name="rating-7" class="mask mask-star-2 bg-orange-400" checked="">
        <input type="radio" name="rating-7" class="mask mask-star-2 bg-orange-400">
        <input type="radio" name="rating-7" class="mask mask-star-2 bg-orange-400">
        <input type="radio" name="rating-7" class="mask mask-star-2 bg-orange-400">
      </div>
      <div class="rating rating-lg">
        <input type="radio" name="rating-8" class="mask mask-star-2 bg-orange-400">
        <input type="radio" name="rating-8" class="mask mask-star-2 bg-orange-400" checked="">
        <input type="radio" name="rating-8" class="mask mask-star-2 bg-orange-400">
        <input type="radio" name="rating-8" class="mask mask-star-2 bg-orange-400">
        <input type="radio" name="rating-8" class="mask mask-star-2 bg-orange-400">
      </div>
    </div>

    <div class="rating rating-lg">
      <input type="radio" name="rating-9" class="rating-hidden">
      <input type="radio" name="rating-9" class="mask mask-star-2">
      <input type="radio" name="rating-9" class="mask mask-star-2" checked="">
      <input type="radio" name="rating-9" class="mask mask-star-2">
      <input type="radio" name="rating-9" class="mask mask-star-2">
      <input type="radio" name="rating-9" class="mask mask-star-2">
    </div>

    <div class="rating rating-lg rating-half">
      <input type="radio" name="rating-10" class="rating-hidden">
      <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1">
      <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2">
      <input
        type="radio"
        name="rating-10"
        class="bg-green-500 mask mask-star-2 mask-half-1"
        checked=""
      >
      <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2">
      <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1">
      <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2">
      <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1">
      <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2">
      <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1">
      <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2">
    </div>
  </div>
</template>
