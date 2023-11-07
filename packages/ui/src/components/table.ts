import { OptionFn } from './shared'
import { transformCss2Js } from '@/utils'

export const options: OptionFn = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      styled: {
        [selector]: transformCss2Js(`@apply rounded-box text-left text-sm;
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
        }`)
      },
      base: {
        [selector]: transformCss2Js(`@apply relative w-full;
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
        }`)
      },
      utils: {
        [selector]: transformCss2Js(`${selector}-xs :not(thead):not(tfoot) tr {
          @apply text-xs;
        }
        ${selector}-xs :where(th, td) {
          @apply px-2 py-1;
        }
        ${selector}-sm :not(thead):not(tfoot) tr {
          @apply text-sm;
        }
        ${selector}-sm :where(th, td) {
          @apply px-3 py-2;
        }
        ${selector}-md :not(thead):not(tfoot) tr {
          @apply text-sm;
        }
        ${selector}-md :where(th, td) {
          @apply px-4 py-3;
        }
        ${selector}-lg :not(thead):not(tfoot) tr {
          @apply text-base;
        }
        ${selector}-lg :where(th, td) {
          @apply px-6 py-4;
        }`)
      }
    }
  }
}
