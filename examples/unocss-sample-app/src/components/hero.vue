<script setup lang="ts"></script>

<template>
  <div>
    <div class="hero min-h-[30rem] rounded bg-base-200">
      <div class="text-center hero-content">
        <div class="max-w-md">
          <h3 class="text-5xl font-bold">
            Hello there
          </h3>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button class="btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>

    <div class="hero min-h-[30rem] rounded bg-base-200">
      <div class="flex-col hero-content lg:flex-row">
        <img
          src="/pig.jpg"
          class="max-w-sm rounded-lg shadow-2xl"
          alt="Tailwind CSS hero component"
        >
        <div>
          <h3 class="text-5xl font-bold">
            Box Office News!
          </h3>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button class="btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>

    <div class="hero min-h-[30rem] rounded bg-base-200">
      <div class="flex-col hero-content lg:flex-row-reverse">
        <img
          src="/pig.jpg"
          class="max-w-sm rounded-lg shadow-2xl"
          alt="Tailwind CSS hero component"
        >
        <div>
          <h3 class="text-5xl font-bold">
            Box Office News!
          </h3>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button class="btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>

    <div class="hero min-h-[30rem] rounded bg-base-200">
      <div class="flex-col hero-content lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h3 class="text-5xl font-bold">
            Login now!
          </h3>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <div class="form-control">
              <label class="label" for="input1"><span class="label-text">Email</span></label>
              <input
                id="input1"
                type="email"
                placeholder="email"
                class="input input-bordered"
                required=""
              >
            </div>
            <div class="form-control">
              <label class="label" for="input2"><span class="label-text">Password</span></label>
              <input
                type="password"
                placeholder="password"
                class="input input-bordered"
                required=""
                for="input2"
              >
              <label class="label">
                <button class="label-text-alt link link-hover">Forgot password?</button>
              </label>
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="hero min-h-[30rem] rounded"
      style="background-image: url(/images/stock/photo-1507358522600-9f71e620c44e.jpg)"
    >
      <div class="hero-overlay rounded bg-opacity-60" />
      <div class="text-center hero-content text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">
            Hello there
          </h1>
          <p class="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button class="btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
