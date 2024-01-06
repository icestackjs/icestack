import { getSelector } from '@icestack/shared'
import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  schema: (opts) => {
    const { selector } = opts
    return {
      selector,
      defaults: {
        base: `
        ${selector}{
          @apply relative w-full;
          @apply rounded text-left text-sm;
          display: table;
          .thead{
            display:table-header-group;
            @apply whitespace-nowrap text-xs font-bold;
          }
          .tbody{
            display: table-row-group;
          }
          .tfoot{
            display: table-footer-group;
            @apply whitespace-nowrap text-xs font-bold;
          }
          .tr{
            display: table-row;
          }
          .td,.th{
            @apply px-4 py-3 align-middle;
            display: table-cell;
          }
        }
        `,
        utils: `
          ${selector}{
            &-xs{
              :not(.thead):not(.tfoot) .tr{
                @apply text-xs;
              }
              .th,.td{
                @apply px-2 py-1;
              }
            }
            &-sm{
              :not(.thead):not(.tfoot) .tr{
                @apply text-sm;
              }
              .th,.td{
                @apply px-3 py-2;
              }
            }
            &-md{
              :not(.thead):not(.tfoot) .tr{
                @apply text-sm;
              }
              .th,.td{
                @apply px-4 py-3;
              }
            }
            &-lg{
              :not(.thead):not(.tfoot) .tr{
                @apply text-base;
              }
              .th,.td{
                @apply px-6 py-4;
              }
            }
          }
        `
      }
    }
  }
}

export default options
