<template>
  <button :class="className">
    <slot>postcss-cva</slot>
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import buttonClass from './buttonClass'
// const props = withDefaults(defineProps(), {})
const attrs = useAttrs()
defineOptions({
  name: 'IceCom',
})
const className = computed(() => {
  // @ts-ignore
  return buttonClass(attrs)
}) 
</script>

<style scoped>
/* @meta path="./buttonClass" */

.btn {
  /* @b */
  font-size: 50px;
  padding: 72px 120px;
  border-radius: 20px;
  background: #e5e7eb;
}

.btn-primary {
  /* @v type="primary" */
  background: blue;
  color: white;
}

.btn-secondary {
  /* @v type="secondary" */
  background: yellow;
}

.btn-disabled {
  cursor: not-allowed;
  opacity: 0.15;
}


.btn-md {
  /* @v size="md" */
  font-size: 50px;
  padding: 72px 120px;
  border-radius: 20px;
}

.btn-sm {
  /* @v size="sm" */
  font-size: 40px;
  padding: 60px 100px;
  border-radius: 16px;
}

.btn-xs {
  /* @v size="xs" */
  font-size: 30px;
  padding: 50px 80px;
  border-radius: 12px;
}
</style>