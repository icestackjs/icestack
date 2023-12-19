import { getSelector } from '@icestack/shared'
import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  schema: (opts) => {
    const { selector } = opts
    return {
      selector,
      defaults: {
        base: {
          [selector]: {
            apply: ['relative w-full', 'rounded text-left text-sm'],
            css: {
              display: 'table'
            },
            '.thead': {
              css: {
                display: 'table-header-group'
              },
              apply: ['whitespace-nowrap text-xs font-bold']
            },
            '.tbody': {
              css: {
                display: 'table-row-group'
              }
            },
            '.tfoot': {
              css: {
                display: 'table-footer-group'
              },
              apply: ['whitespace-nowrap text-xs font-bold']
            },
            '.tr': {
              css: {
                display: 'table-row'
              }
            },
            '.td,.th': {
              apply: ['px-4 py-3 align-middle'],
              css: {
                display: 'table-cell'
              }
            }
          }
        },
        utils: {
          [selector]: {
            [`&${getSelector('xs')}`]: {
              ':not(.thead):not(.tfoot) .tr': {
                apply: 'text-xs'
              },
              '.th,.td': {
                apply: 'px-2 py-1'
              }
            },
            [`&${getSelector('sm')}`]: {
              ':not(.thead):not(.tfoot) .tr': {
                apply: 'text-sm'
              },
              '.th,.td': {
                apply: 'px-3 py-2'
              }
            },
            [`&${getSelector('md')}`]: {
              ':not(.thead):not(.tfoot) .tr': {
                apply: 'text-sm'
              },
              '.th,.td': {
                apply: 'px-4 py-3'
              }
            },
            [`&${getSelector('lg')}`]: {
              ':not(.thead):not(.tfoot) .tr': {
                apply: 'text-base'
              },
              '.th,.td': {
                apply: 'px-6 py-4'
              }
            }
          }
        }
      }
    }
  }
}

export default options
