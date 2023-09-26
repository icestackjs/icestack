<script setup lang="ts">
import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { css } from '@codemirror/lang-css'
import { ref, onMounted } from 'vue'
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

const leftEditorDom = ref<Element>()
const rightEditorDom = ref<Element>()


onMounted(() => {
  let leftEditor = new EditorView({
    extensions: [vscodeDark, basicSetup, css()],
    parent: leftEditorDom.value,
  })

  let rightEditor = new EditorView({
    extensions: [vscodeDark, basicSetup, javascript()],
    parent: rightEditorDom.value,

  })
})

</script>

<template>
  <div class="h-screen w-screen flex bg-[#1e1e1e]">
    <div class="w-1/2" ref="leftEditorDom"></div>
    <div class="w-1/2" ref="rightEditorDom"></div>
  </div>
</template>

<style scoped></style>
