<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="flex flex-col justify-center sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="i-mdi-tailwind mx-auto h-14 w-14 text-primary"></div>
      <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="input input-primary w-full"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="input input-primary w-full"
            />
          </div>
          <div class="mt-2 text-sm">
            <a href="#" class="font-semibold">Forgot password?</a>
          </div>
        </div>

        <div class="flex justify-center">
          <button type="submit" class="btn btn-primary btn-block">
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm">
        Not a member?
        {{ " " }}
        <a href="#" class="font-semibold leading-6"
          >Start a 14 day free trial</a
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
