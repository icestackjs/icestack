<script setup lang="ts">
// const btnTypes = [
//   "btn-primary",
//   "btn-neutral",
//   "",
//   "btn-success",
//   "btn-warning",
//   "btn-error",
// ];
const bgArray: string[] = [
  'bg-white',
  'bg-neutral',
  'bg-[#65c3c8]',
  'bg-[#5E81AC]',
  'bg-[#ff79c6]',
  'bg-[#9FE88D]',
]
const darkMode = ['dark', 'dracula', 'dim']
const keys = useState('customThemes', () => {
  return ['light', 'dark', 'cupcake', 'nord', 'dracula', 'dim'].map(
    (x, idx) => {
      return {
        name: x,
        dark: darkMode.includes(x),
        bgColor: bgArray[idx],
      }
    },
  )
})

const colorMode = useColorMode()

function setColorMode(value: string) {
  colorMode.value = value
}
</script>

<template>
  <div>
    <div class="container navbar mx-auto flex justify-between">
      <div class="flex-1 px-2 lg:flex-none">
        <a class="text-lg font-bold">IceStack</a>
      </div>
      <div class="dropdown dropdown-end dropdown-bottom">
        <div tabindex="0" class="btn btn-primary m-1">
          Toggle Themes
        </div>
        <ul
          tabindex="0"
          class="dropdown-content menu z-[1] w-52 space-y-1 shadow"
        >
          <li
            v-for="(k, i) in keys"
            :key="k.name"
            :class="[
              colorMode.value === k.name ? 'selected-theme' : '',
              k.dark ? 'text-white' : 'text-black',
              k.bgColor,
            ]"
            class="relative cursor-pointer rounded p-2 text-center"
            @click="setColorMode(k.name)"
          >
            {{ k.name }}
          </li>
        </ul>
      </div>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selected-theme {
  @apply before:absolute before:content-['🐶'];
}
</style>
