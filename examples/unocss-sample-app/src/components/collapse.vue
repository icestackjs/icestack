<script setup lang="ts"></script>

<template>
  <div>
    <div tabindex="0" class="collapse bg-base-200">
      <div class="collapse-title text-xl font-medium">Focus me to see content</div>
      <div class="collapse-content">
        <p>tabindex="0" attribute is necessary to make the div focusable</p>
      </div>
    </div>

    <div class="collapse bg-base-200">
      <input type="checkbox" />
      <div class="collapse-title text-xl font-medium">Click me to show/hide content</div>
      <div class="collapse-content"><p>hello</p></div>
    </div>

    <details class="collapse bg-base-200">
      <summary class="collapse-title text-xl font-medium">Click to open/close</summary>
      <div class="collapse-content"><p>content</p></div>
    </details>

    <div tabindex="0" class="collapse border border-base-300 bg-base-200">
      <div class="collapse-title text-xl font-medium">Focus me to see content</div>
      <div class="collapse-content">
        <p>tabindex="0" attribute is necessary to make the div focusable</p>
      </div>
    </div>

    <div tabindex="0" class="collapse border border-base-300 bg-base-200 collapse-arrow">
      <div class="collapse-title text-xl font-medium">Focus me to see content</div>
      <div class="collapse-content">
        <p>tabindex="0" attribute is necessary to make the div focusable</p>
      </div>
    </div>

    <div tabindex="0" class="collapse border border-base-300 bg-base-200 collapse-plus">
      <div class="collapse-title text-xl font-medium">Focus me to see content</div>
      <div class="collapse-content">
        <p>tabindex="0" attribute is necessary to make the div focusable</p>
      </div>
    </div>

    <div tabindex="0" class="collapse collapse-open border border-base-300 bg-base-200">
      <div class="collapse-title text-xl font-medium">I have collapse-open class</div>
      <div class="collapse-content">
        <p>tabindex="0" attribute is necessary to make the div focusable</p>
      </div>
    </div>

    <div tabindex="0" class="collapse collapse-close border border-base-300 bg-base-200">
      <div class="collapse-title text-xl font-medium">I have collapse-close class</div>
      <div class="collapse-content">
        <p>tabindex="0" attribute is necessary to make the div focusable</p>
      </div>
    </div>

    <div
      tabindex="0"
      class="collapse bg-primary text-primary-content focus:bg-secondary focus:text-secondary-content"
    >
      <div class="collapse-title">Focus me to see content</div>
      <div class="collapse-content">
        <p>tabindex="0" attribute is necessary to make the div focusable</p>
      </div>
    </div>

    <div class="collapse bg-base-200">
      <input type="checkbox" class="peer" />
      <div
        class="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
      >
        Click me to show/hide content
      </div>
      <div
        class="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
      >
        <p>hello</p>
      </div>
    </div>
  </div>
</template>
