<script setup lang="ts">
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

.btn {
  &-primary {
    @apply border-primary bg-primary text-primary-content outline-primary;
  }

  &-success {
    @apply bg-success;
  }

  &-warning {
    @apply bg-warning;
  }

  &-error {
    @apply bg-error;
  }

  &-ghost {
  }

  &-link {
  }

  &-outline {
  }

  &-active {
  }

  &-disabled {
  }

  &-lg {
  }

  &-md {
  }

  &-sm {
  }

  &-xs {
  }

  &-wide {
  }

  &-block {
  }

  &-square {
  }

  &-circle {
  }

  & {
    .glass {
    }

    .no-animation {
    }
  }
}

// @import './scss/index.scss';
</style>
