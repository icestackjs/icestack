import { OptionFn, getSelector } from './shared'
import { loading as loading64Map } from './assets/svg.json'

function makeMaskImage(base64: string) {
  return `url("${base64}")`
}

// https://github.com/SamHerbert/SVG-Loaders
// https://github.com/loadingio/css-spinner/
export const options: OptionFn = (opts) => {
  const { selector } = opts
  function getDefaultShapes() {
    return Object.entries(loading64Map).reduce<Record<string, object>>((acc, [key, value]) => {
      acc[`&${getSelector(key)}`] = {
        css: {
          'mask-image': makeMaskImage(value)
        }
      }

      return acc
    }, {})
  }
  const defaultShapes = getDefaultShapes()
  return {
    selector,
    defaults: {
      styled: {},
      base: {
        [selector]: {
          apply: 'pointer-events-none inline-block aspect-square w-6',
          css: {
            'background-color': 'currentColor',
            'mask-size': '100%',
            'mask-repeat': 'no-repeat',
            'mask-position': 'center',
            'mask-image': makeMaskImage(loading64Map['tail-spin']) // `url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='%23000' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.spinner_V8m1%7Btransform-origin:center;animation:spinner_zKoa 2s linear infinite%7D.spinner_V8m1 circle%7Bstroke-linecap:round;animation:spinner_YpZS 1.5s ease-out infinite%7D%40keyframes spinner_zKoa%7B100%25%7Btransform:rotate(360deg)%7D%7D%40keyframes spinner_YpZS%7B0%25%7Bstroke-dasharray:0 150;stroke-dashoffset:0%7D47.5%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-16%7D95%25%2C100%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-59%7D%7D%3C%2Fstyle%3E%3Cg class='spinner_V8m1'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3'%3E%3C%2Fcircle%3E%3C%2Fg%3E%3C%2Fsvg%3E")`
          }
        }
      },
      utils: {
        [selector]: {
          [`&${getSelector('xs')}`]: {
            apply: 'w-4'
          },
          [`&${getSelector('sm')}`]: {
            apply: 'w-5'
          },
          [`&${getSelector('md')}`]: {
            apply: 'w-6'
          },
          [`&${getSelector('lg')}`]: {
            apply: 'w-10'
          },
          ...defaultShapes
        }
      }
    }
  }
}
