<script setup lang="ts"></script>

<template>
  <div>
    <div role="tablist" class="ice-tabs">
      <button role="ice-tab" class="ice-tab">Tab 1</button>
      <button role="ice-tab" class="ice-tab ice-tab-active">Tab 2</button>
      <button role="ice-tab" class="ice-tab">Tab 3</button>
    </div>

    <div role="tablist" class="ice-tabs ice-tabs-bordered">
      <button role="ice-tab" class="ice-tab">Tab 1</button>
      <button role="ice-tab" class="ice-tab ice-tab-active">Tab 2</button>
      <button role="ice-tab" class="ice-tab">Tab 3</button>
    </div>

    <div role="tablist" class="ice-tabs ice-tabs-lifted">
      <button role="ice-tab" class="ice-tab">Tab 1</button>
      <button role="ice-tab" class="ice-tab ice-tab-active">Tab 2</button>
      <button role="ice-tab" class="ice-tab">Tab 3</button>
    </div>

    <div role="tablist" class="ice-tabs ice-tabs-boxed">
      <button role="ice-tab" class="ice-tab">Tab 1</button>
      <button role="ice-tab" class="ice-tab ice-tab-active">Tab 2</button>
      <button role="ice-tab" class="ice-tab">Tab 3</button>
    </div>

    <div class="flex flex-col items-center gap-6">
      <div role="tablist" class="ice-tabs ice-tabs-lifted ice-tabs-xs">
        <button role="ice-tab" class="ice-tab">Tiny</button>
        <button role="ice-tab" class="ice-tab ice-tab-active">Tiny</button>
        <button role="ice-tab" class="ice-tab">Tiny</button>
      </div>
      <div role="tablist" class="ice-tabs ice-tabs-lifted ice-tabs-sm">
        <button role="ice-tab" class="ice-tab">Small</button>
        <button role="ice-tab" class="ice-tab ice-tab-active">Small</button>
        <button role="ice-tab" class="ice-tab">Small</button>
      </div>
      <div role="tablist" class="ice-tabs ice-tabs-lifted">
        <button role="ice-tab" class="ice-tab">Normal</button>
        <button role="ice-tab" class="ice-tab ice-tab-active">Normal</button>
        <button role="ice-tab" class="ice-tab">Normal</button>
      </div>
      <div role="tablist" class="ice-tabs ice-tabs-lifted ice-tabs-lg">
        <button role="ice-tab" class="ice-tab">Large</button>
        <button role="ice-tab" class="ice-tab ice-tab-active">Large</button>
        <button role="ice-tab" class="ice-tab">Large</button>
      </div>
    </div>

    <div role="tablist" class="ice-tabs ice-tabs-bordered w-full my-10 lg:mx-10">
      <input type="radio" name="my_tabs_1" role="ice-tab" class="ice-tab" aria-label="Tab 1" />
      <div role="tabpanel" class="ice-tab-content p-10">Tab content 1</div>
      <input type="radio" name="my_tabs_1" role="ice-tab" class="ice-tab" aria-label="Tab 2" checked="" />
      <div role="tabpanel" class="ice-tab-content p-10">Tab content 2</div>
      <input type="radio" name="my_tabs_1" role="ice-tab" class="ice-tab" aria-label="Tab 3" />
      <div role="tabpanel" class="ice-tab-content p-10">Tab content 3</div>
    </div>

    <div role="tablist" class="ice-tabs ice-tabs-lifted w-full my-10 lg:mx-10">
      <input type="radio" name="my_tabs_2" role="ice-tab" class="ice-tab" aria-label="Tab 1" />
      <div role="tabpanel" class="ice-tab-content bg-base-100 border-base-300 rounded-box p-6 pe-32">
        Tab content 1
      </div>
      <input type="radio" name="my_tabs_2" role="ice-tab" class="ice-tab" aria-label="Tab 2" checked="" />
      <div role="tabpanel" class="ice-tab-content bg-base-100 border-base-300 rounded-box p-6 pe-32">
        Tab content 2
      </div>
      <input type="radio" name="my_tabs_2" role="ice-tab" class="ice-tab" aria-label="Tab 3" />
      <div role="tabpanel" class="ice-tab-content bg-base-100 border-base-300 rounded-box p-6 pe-32">
        Tab content 3
      </div>
    </div>

    <div role="tablist" class="ice-tabs ice-tabs-lifted">
      <button role="ice-tab" class="ice-tab">Tab 1</button>
      <button
        role="ice-tab"
        class="ice-tab ice-tab-active [--ice-tab-bg:yellow] [--ice-tab-border-color:orange] text-primary"
      >
        Tab 2
      </button>
      <button role="ice-tab" class="ice-tab">Tab 3</button>
    </div>
  </div>
</template>
