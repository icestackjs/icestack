<script setup lang="ts">
import { variants } from '@/components/buttonClass'
import { computed, ref } from 'vue'
// import IceButton from '@/components/IceButton.vue';
import IceCom from '@/components/IceCom.vue'

const variantsSelected = computed(() => {
  return Object.entries(variants).map(([key, value]) => {
    return {
      key,
      value: Object.keys(value),
    }
  })
})
const buttonProps = ref<Record<string, string>>({})
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen w-screen">
    <div class="flex items-center space-x-2 text-2xl">
      <v-icon icon="mdi-github" />
      <span class="underline">sonofmagic/icestack</span>
    </div>

    <div class="m-8">
      <IceCom v-bind="buttonProps" />
    </div>

    <div class="text-3xl">
      <div class="mb-5">
        variants:
      </div>

      <div>
        <div v-for="v in variantsSelected" :key="v.key" class="flex items-center">
          <div>
            {{ v.key }}:
            <div class="h-[28px] w-full" />
          </div>
          <v-radio-group v-model="buttonProps[v.key]" color="primary" inline>
            <v-radio key="reset" label="(reset)" :value="false" />
            <v-radio v-for="p in v.value" :key="p" :label="p" :value="p" />
          </v-radio-group>
        </div>
      </div>
    </div>

    <!-- <a href="https://icebreaker.top/" target="_blank" class="cbtn">
      Hover Me
    </a>
    <button href="https://icebreaker.top/" target="_blank" class="cbtn flex">
      <span>Hover Me</span>
    </button> -->
  </div>
  <!-- <div class="sd">123213</div>
  <div class="xaxa">123</div> -->
</template>

<style lang="scss">
.x {
  color: red;
}

// @apply should not be used with the 'group' utility
</style>
