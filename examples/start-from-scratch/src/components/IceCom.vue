<template>
  <div :class="className">
    IceCom
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import comClass, { Props as ComProps } from '../../cva/com'
const props = withDefaults(defineProps<{
  type?: 'p' | 'z'
}>(), {

})
const className = computed(() => {
  return comClass(props)
}) 
</script>

<style scoped lang="scss">
/* @meta path="com" */
.com {
  /* @b */
  font-size: 24px;
  color: red;
}

.com-p {
  /* @v type="p" */
  font-size: 20px;
  color: blue;
}

.com-z {
  /* @v type="z" */
  font-size: 22px;
  color: yellow;
}

.com-disabled {
  /* @cv type="p" */
  cursor: not-allowed;
}

/* @dv type="p" */
</style>