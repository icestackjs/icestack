import { GetSchemaFn, expandTypes, getSelector } from '@/shared'

const schema: GetSchemaFn = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      styled: {
        [selector]: {
          apply: 'rounded-box bg-base-content/20 h-2',
          '&::-moz-progress-bar': {
            apply: 'bg-base-content rounded-box'
          },
          '&::-webkit-progress-bar': {
            apply: 'rounded-box bg-transparent'
          },
          '&::-webkit-progress-value': {
            apply: 'bg-base-content rounded-box'
          },
          '&:indeterminate': {
            css: {
              'background-image': `repeating-linear-gradient(
                90deg,
                var(--progress-color) -1%,
                var(--progress-color) 10%,
                transparent 10%,
                transparent 90%
              )`,
              'background-size': '200%',
              'background-position-x': '15%',
              animation: 'progress-loading 5s ease-in-out infinite'
            },
            '&::-moz-progress-bar': {
              apply: 'bg-transparent',
              css: {
                'background-image': `repeating-linear-gradient(
                  90deg,
                  var(--progress-color) -1%,
                  var(--progress-color) 10%,
                  transparent 10%,
                  transparent 90%
                )`,
                'background-size': '200%',
                'background-position-x': '15%',
                animation: 'progress-loading 5s ease-in-out infinite'
              }
            }
          },
          ...expandTypes(types, (type) => {
            return {
              key: `&${getSelector(type)}::-moz-progress-bar`,
              value: {
                apply: `bg-${type} rounded-box`
              }
            }
          }),
          ...expandTypes(types, (type) => {
            return {
              key: `&${getSelector(type)}::-webkit-progress-value`,
              value: {
                apply: `bg-${type}`
              }
            }
          })
        },
        '@keyframes progress-loading': {
          '50%': {
            css: {
              'background-position-x': '-115%'
            }
          }
        }
      },
      base: {
        [selector]: {
          apply: 'relative w-full appearance-none overflow-hidden'
        }
      }
    }
  }
}

export default {
  schema
}
