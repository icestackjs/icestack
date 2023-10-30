import { OptionFn, expandColorsMap } from './shared'

export const options: OptionFn = (opts) => {
  return {
    selector: '.progress',
    colors: expandColorsMap(opts.types, (typeName) => {
      return {
        progressValue: {
          apply: `bg-${typeName}`
        },
        mozProgressBar: {
          apply: `bg-${typeName} rounded-box`
        }
      }
    }),
    defaults: {
      styled: {
        default: {
          apply: 'rounded-box bg-base-content/20 h-2'
        },
        progressBar: {
          apply: 'rounded-box bg-transparent'
        },
        mozProgressBar: {
          apply: 'bg-base-content rounded-box'
        },
        progressValue: {
          apply: 'bg-base-content rounded-box'
        },
        indeterminate: {
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
        },
        indeterminateMozProgressBar: {
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
      base: {
        default: {
          apply: 'relative w-full appearance-none overflow-hidden'
        }
      }
    }
  }
}
