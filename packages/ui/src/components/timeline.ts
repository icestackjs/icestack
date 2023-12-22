import { transformCss2Js } from '@/shared'
import type { GetSchemaFn } from '@/types'
const schema: GetSchemaFn = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`
      ${selector} {
        @apply relative flex;
      }
      :where(${selector} > li) {
        @apply relative grid shrink-0 items-center;
        grid-template-rows: var(--timeline-row-start, minmax(0, 1fr)) auto var(
            --timeline-row-end,
            minmax(0, 1fr)
          );
        grid-template-columns: var(--timeline-col-start, minmax(0, 1fr)) auto var(
            --timeline-col-end,
            minmax(0, 1fr)
          );
      }
      ${selector} > li > hr {
        @apply w-full border-0;
      }
      :where(${selector} > li > hr) {
        &:first-child {
          @apply col-start-1 row-start-2;
        }
        &:last-child {
          @apply col-start-3 col-end-[none] row-start-2 row-end-auto;
        }
      }
      
      ${selector}-start {
        @apply col-start-1 col-end-4 row-start-1 row-end-2 m-1 self-end justify-self-center;
      }
      ${selector}-middle {
        @apply col-start-2 row-start-2;
      }
      ${selector}-end {
        @apply col-start-1 col-end-4 row-start-3 row-end-4 m-1 self-start justify-self-center;
      }
      
      
      `),
      styled: transformCss2Js(`
      ${selector} hr {
        @apply h-1;
      }
      :where(${selector} hr) {
        @apply bg-base-300;
      }
      :where(${selector}:has(${selector}-middle) hr) {
        &:first-child {
          @apply rounded-e-badge rounded-s-none;
        }
        &:last-child {
          @apply rounded-s-badge rounded-e-none;
        }
      }
      :where(${selector}:not(:has(${selector}-middle)) :first-child hr:last-child) {
        @apply rounded-s-badge rounded-e-none;
      }
      :where(${selector}:not(:has(${selector}-middle)) :last-child hr:first-child) {
        @apply rounded-e-badge rounded-s-none;
      }
      ${selector}-box {
        @apply rounded-box bg-base-100 border-base-300 border px-4 py-2 shadow-sm;
      }
      
      `),
      utils: transformCss2Js(`
      ${selector}-vertical {
        @apply flex-col;
      }
      ${selector}-compact,
      ${selector}-horizontal${selector}-compact {
        --timeline-row-start: 0;
        ${selector}-start {
          @apply col-start-1 col-end-4 row-start-3 row-end-4 m-1 self-start justify-self-center;
        }
        li:has(${selector}-start) ${selector}-end {
          @apply col-start-[none] row-start-auto;
        }
      }
      ${selector}-vertical${selector}-compact {
        & > li {
          --timeline-col-start: 0;
        }
        ${selector}-start {
          @apply col-start-3 col-end-4 row-start-1 row-end-4 self-center justify-self-start;
        }
        li:has(${selector}-start) ${selector}-end {
          @apply col-start-auto row-start-[none];
        }
      }
      :where(${selector}-vertical > li) {
        --timeline-row-start: minmax(0, 1fr);
        --timeline-row-end: minmax(0, 1fr);
      }
      ${selector}-vertical > li > hr {
        @apply h-full;
      }
      
      :where(${selector}-vertical > li) {
        @apply justify-items-center;
      }
      :where(${selector}-vertical > li > hr) {
        &:first-child {
          @apply col-start-2 row-start-1;
        }
        &:last-child {
          @apply col-start-2 col-end-auto row-start-3 row-end-[none];
        }
      }
      ${selector}-vertical ${selector}-start {
        @apply col-start-1 col-end-2 row-start-1 row-end-4 self-center justify-self-end;
      }
      ${selector}-vertical ${selector}-end {
        @apply col-start-3 col-end-4 row-start-1 row-end-4 self-center justify-self-start;
      }
      ${selector}-vertical:where(${selector}-snap-icon) > li {
        --timeline-col-start: minmax(0, 1fr);
        --timeline-row-start: 0.5rem;
      }
      /* horizontal */
      ${selector}-horizontal {
        @apply flex-row;
      }
      ${selector}-horizontal > li > hr {
        @apply w-full;
      }
      :where(${selector}-horizontal > li) {
        @apply items-center;
      }
      :where(${selector}-horizontal > li > hr) {
        &:first-child {
          @apply col-start-1 row-start-2;
        }
        &:last-child {
          @apply col-start-3 col-end-[none] row-start-2  row-end-auto;
        }
      }
      ${selector}-horizontal ${selector}-start {
        @apply col-start-1 col-end-4 row-start-1 row-end-2 self-end justify-self-center;
      }
      ${selector}-horizontal ${selector}-end {
        @apply col-start-1 col-end-4 row-start-3 row-end-4 self-start justify-self-center;
      }
      
      :where(${selector}-snap-icon) > li,
      ${selector}-horizontal:where(${selector}-snap-icon) > li {
        --timeline-col-start: 0.5rem;
        --timeline-row-start: minmax(0, 1fr);
      }
      

      ${selector}-vertical > li > hr {
        @apply w-1;
      }
      
      :where(${selector}-vertical:has(${selector}-middle) > li > hr) {
        &:first-child {
          @apply rounded-b-badge rounded-t-none;
        }
        &:last-child {
          @apply rounded-t-badge rounded-b-none;
        }
      }
      :where(${selector}-vertical:not(:has(${selector}-middle)) :first-child > hr:last-child) {
        @apply rounded-t-badge rounded-b-none;
      }
      :where(${selector}-vertical:not(:has(${selector}-middle)) :last-child > hr:first-child) {
        @apply rounded-b-badge rounded-t-none;
      }
      
      /* horizontal */
      ${selector}-horizontal > li > hr {
        @apply h-1;
      }
      :where(${selector}-horizontal:has(${selector}-middle) > li > hr) {
        &:first-child {
          @apply rounded-e-badge rounded-s-none;
        }
        &:last-child {
          @apply rounded-s-badge rounded-e-none;
        }
      }
      :where(${selector}-horizontal:not(:has(${selector}-middle)) :first-child > hr:last-child) {
        @apply rounded-s-badge rounded-e-none;
      }
      :where(${selector}-horizontal:not(:has(${selector}-middle)) :last-child > hr:first-child) {
        @apply rounded-e-badge rounded-s-none;
      }
      
      `)
    }
  }
}

export default {
  schema
}
