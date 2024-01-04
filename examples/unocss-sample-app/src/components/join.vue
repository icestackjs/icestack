<script setup lang="ts"></script>

<template>
  <div class="join">
    <button class="btn join-item">Button</button>
    <button class="btn join-item">Button</button>
    <button class="btn join-item">Button</button>
  </div>

  <div class="join join-vertical">
    <button class="btn join-item">Button</button>
    <button class="btn join-item">Button</button>
    <button class="btn join-item">Button</button>
  </div>

  <div class="join join-vertical lg:join-horizontal">
    <button class="btn join-item">Button</button>
    <button class="btn join-item">Button</button>
    <button class="btn join-item">Button</button>
  </div>

  <div class="join">
    <div>
      <div>
        <input class="input input-bordered join-item w-[5.3rem] md:w-52" placeholder="Search" />
      </div>
    </div>
    <select class="select select-bordered join-item w-[5.8rem] md:w-auto">
      <option disabled="" selected="" value="Filter">Filter</option>
      <option value="Sci-fi">Sci-fi</option>
      <option value="Drama">Drama</option>
      <option value="Action">Action</option>
    </select>
    <div class="indicator">
      <span class="indicator-item badge badge-secondary">new</span>
      <button class="btn join-item">Search</button>
    </div>
  </div>

  <div class="join">
    <input class="input input-bordered join-item w-36 lg:w-52" placeholder="Email" />
    <button class="btn join-item rounded-r-full">Subscribe</button>
  </div>

  <div class="join">
    <input class="join-item btn" type="radio" name="options" aria-label="Radio 1" />
    <input class="join-item btn" type="radio" name="options" aria-label="Radio 2" />
    <input class="join-item btn" type="radio" name="options" aria-label="Radio 3" />
  </div>
</template>
