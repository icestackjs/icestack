<script setup lang="ts">
import { computed, ref } from 'vue'
// import IceButton from '@/components/IceButton.vue';
import IceCom from '@/components/IceCom.vue';
import { variants } from '@/components/buttonClass'
const variantsSelected = computed(() => {
  return Object.entries(variants).map(([key, value]) => {
    return {
      key,
      value: Object.keys(value)
    }
  })
})
const buttonProps = ref<Record<string, string>>({})
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen w-screen">
    <div class="flex items-center space-x-2 text-2xl">
      <v-icon icon="mdi-github"></v-icon>
      <span class="underline">sonofmagic/icestack</span>

    </div>

    <div class="m-8">
      <IceCom v-bind="buttonProps"></IceCom>
    </div>

    <div class="text-3xl">
      <div class="mb-5">
        variants:
      </div>

      <div>
        <div class="flex items-center" :key="v.key" v-for="v in variantsSelected">
          <div>
            {{ v.key }}:
            <div class="h-[28px] w-full"></div>
          </div>
          <v-radio-group color="primary" inline v-model="buttonProps[v.key]">
            <v-radio key="reset" label="(reset)" :value="false"></v-radio>
            <v-radio :key="p" v-for="p in v.value" :label="p" :value="p"></v-radio>
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
