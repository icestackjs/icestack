<script setup lang="ts"></script>

<template>
  <div class="indicator">
    <span class="indicator-item badge badge-secondary"></span>
    <div class="grid w-32 h-32 rounded bg-base-300 place-items-center">content</div>
  </div>

  <div class="indicator">
    <span class="indicator-item badge badge-primary">new</span>
    <div class="grid w-32 h-32 rounded bg-base-300 place-items-center">content</div>
  </div>

  <div class="indicator">
    <span class="indicator-item badge badge-secondary">99+</span>
    <button class="btn">inbox</button>
  </div>

  <div class="tabs tabs-lifted">
    <button class="tab">Messages</button>
    <button class="indicator tab tab-active">
      Notifications
      <span class="indicator-item badge">8</span>
    </button>
    <button class="tab">Requests</button>
  </div>

  <div class="avatar indicator">
    <span class="indicator-item badge badge-secondary">typing…</span>
    <div class="w-20 h-20 rounded-lg">
      <img alt="Tailwind CSS examples" src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  </div>

  <div class="indicator">
    <span class="indicator-item badge">Required</span>
    <input type="text" placeholder="Your email address" class="input input-bordered" />
  </div>

  <div class="indicator my-6 mx-10">
    <div class="indicator-item indicator-bottom">
      <button class="btn btn-primary">Apply</button>
    </div>
    <div class="border card bg-base-100">
      <div class="card-body">
        <h2 class="card-title">Job Title</h2>
        <p>Rerum reiciendis beatae tenetur excepturi</p>
      </div>
    </div>
  </div>

  <div class="indicator">
    <span class="indicator-item indicator-center indicator-middle badge badge-secondary">
      Uploading Image...
    </span>
    <img
      alt="Tailwind CSS examples"
      class="rounded"
      src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    />
  </div>

  <div class="indicator">
    <span class="indicator-item indicator-start badge badge-secondary"></span>
    <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
  </div>

  <div class="indicator">
    <span class="indicator-item indicator-center badge badge-secondary"></span>
    <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
  </div>

  <div class="indicator">
    <span class="indicator-item badge badge-secondary"></span>
    <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
  </div>

  <div class="indicator">
    <span class="indicator-item indicator-middle indicator-start badge badge-secondary"></span>
    <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
  </div>

  <div class="indicator">
    <span class="indicator-item indicator-middle indicator-center badge badge-secondary"></span>
    <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
  </div>

  <div class="indicator">
    <span class="indicator-item indicator-middle badge badge-secondary"></span>
    <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
  </div>

  <div class="indicator">
    <span class="indicator-item indicator-bottom indicator-start badge badge-secondary"></span>
    <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
  </div>

  <div class="indicator">
    <span class="indicator-item indicator-bottom indicator-center badge badge-secondary"></span>
    <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
  </div>

  <div class="indicator">
    <span class="indicator-item indicator-bottom badge badge-secondary"></span>
    <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div>
  </div>

  <div class="indicator">
    <span class="indicator-item indicator-top indicator-start badge badge-secondary">
      top+start
    </span>
    <span class="indicator-item indicator-top indicator-center badge badge-secondary">
      top+center
    </span>
    <span class="indicator-item indicator-top indicator-end badge badge-secondary">top+end</span>
    <span class="indicator-item indicator-middle indicator-start badge badge-secondary">
      middle+start
    </span>
    <span class="indicator-item indicator-middle indicator-center badge badge-secondary">
      middle+center
    </span>
    <span class="indicator-item indicator-middle indicator-end badge badge-secondary">
      middle+end
    </span>
    <span class="indicator-item indicator-bottom indicator-start badge badge-secondary">
      bottom+start
    </span>
    <span class="indicator-item indicator-bottom indicator-center badge badge-secondary">
      bottom+center
    </span>
    <span class="indicator-item indicator-bottom indicator-end badge badge-secondary">
      bottom+end
    </span>
    <div class="grid w-60 h-32 bg-base-300 place-items-center">content</div>
  </div>

  <div class="indicator">
    <span
      class="indicator-item indicator-start sm:indicator-middle md:indicator-bottom lg:indicator-center xl:indicator-end badge badge-secondary"
    ></span>
    <div class="grid w-32 h-32 rounded bg-base-300 place-items-center">content</div>
  </div>
</template>
