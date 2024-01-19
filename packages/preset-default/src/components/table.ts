import { GetCssSchemaMethod, css } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts

  const xs = css`
    ${selector}-xs :not(thead):not(tfoot) tr {
      @apply text-xs;
    }
    ${selector}-xs :where(th, td) {
      @apply px-2 py-1;
    }
  `
  const sm = css`
    ${selector}-sm :not(thead):not(tfoot) tr {
      @apply text-sm;
    }
    ${selector}-sm :where(th, td) {
      @apply px-3 py-2;
    }
  `
  const md = css`
    ${selector}-md :not(thead):not(tfoot) tr {
      @apply text-sm;
    }
    ${selector}-md :where(th, td) {
      @apply px-4 py-3;
    }
  `
  const lg = css`
    ${selector}-lg :not(thead):not(tfoot) tr {
      @apply text-base;
    }
    ${selector}-lg :where(th, td) {
      @apply px-6 py-4;
    }
  `
  // const d = baseDefault ?? md
  return {
    selector,
    defaults: {
      styled: css`
        ${selector} {
          @apply rounded-box text-left text-sm;
          :where(th, td) {
            @apply px-4 py-3 align-middle;
          }
          tr.active,
          tr.active:nth-child(even),
          &-zebra tbody tr:nth-child(even) {
            @apply bg-base-200;
          }
          tr.hover,
          tr.hover:nth-child(even) {
            @apply [@media(hover:hover)]:hover:bg-base-200;
          }
          &-zebra {
            tr.active,
            tr.active:nth-child(even),
            &-zebra tbody tr:nth-child(even) {
              @apply bg-base-300;
            }
          }
          &-zebra tr.hover,
          &-zebra tr.hover:nth-child(even) {
            @apply [@media(hover:hover)]:hover:bg-base-300;
          }
          :where(thead, tbody) {
            :where(tr:not(:last-child)),
            :where(tr:first-child:last-child) {
              @apply border-b-base-200 border-b;
            }
          }
          :where(thead, tfoot) {
            @apply text-base-content/60 whitespace-nowrap text-xs font-bold;
          }
        }
      `,
      base: css`
        ${selector} {
          @apply relative w-full;
          :where(${selector}-pin-rows thead tr) {
            @apply bg-base-100 sticky top-0 z-[1];
          }
          :where(${selector}-pin-rows tfoot tr) {
            @apply bg-base-100 sticky bottom-0 z-[1];
          }
          :where(${selector}-pin-cols tr th) {
            @apply bg-base-100 sticky left-0 right-0;
          }
          &-zebra tbody tr:nth-child(even) :where(${selector}-pin-cols tr th) {
            @apply bg-base-200;
          }
        }
      `,
      utils: css`
        ${xs}
        ${sm}
      ${md}
      ${lg}
      `
    }
  }
}

export default {
  schema
}
