<template>
  <button :class="className">
    <slot>postcss-cva</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import buttonClass, { Props as ButtonProps } from './btn'
const props = withDefaults(defineProps<{
  type?: 'primary' | 'secondary',
  size: 'md' | 'sm' | 'xs'
}>(), {})
const className = computed(() => {
  return buttonClass(props)
}) 
</script>

<style scoped>
/* @meta path="btn" */
/* @dv size="md" type="primary" */
.btn {
  /* @b */
  font-size: 16px;
  background: gray;
  border-radius: 4px;
}

.btn-primary {
  /* @v type="primary" */
  background: blue;
  color: white;
}

.btn-secondary {
  /* @v type="secondary" */
  font-size: 22px;
  color: yellow;
}

.btn-pointer {
  /* @cv type="primary" size="md" */
  cursor: pointer;
}

.btn-disabled {
  /* @cv type="primary" size="xs" */
  cursor: not-allowed;
}

.btn-md {
  /* @v size="md" */
  padding: 6px 10px;
  font-size: 16px;
}

.btn-xs {
  /* @v size="xs" */
  padding: 2px 6px;
  font-size: 14px;
}

.btn-sm {
  /* @v size="sm" */
  padding: 4px 8px;
  font-size: 12px;
}
</style>