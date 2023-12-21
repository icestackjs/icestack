<template>
  <div>
    <div class="space-x-2">
      <button
        v-for="(k, i) in keys"
        :key="k"
        :class="[btnTypes[i]]"
        class="btn"
        @click="setColorMode(k)"
      >
        <span v-show="colorMode.value === k" class="mr-1">🐶</span>
        {{ k }}
      </button>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const btnTypes = [
  "btn-primary",
  "btn-neutral",
  "",
  "btn-success",
  "btn-warning",
  "btn-error",
];

const keys = useState("customThemes", () => {
  return ["light", "dark", "cupcake", "nord", "dracula", "dim"];
});

const colorMode = useColorMode();

function setColorMode(value: string) {
  console.log(value);
  colorMode.value = value;
}
</script>
