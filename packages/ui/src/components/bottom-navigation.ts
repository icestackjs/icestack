import { createInjectName } from './shared'
import { transformJsToSass } from '@/sass/utils'

const defaults = {
  styled: {
    default: 'bg-base-100 h-16 text-current',
    children: {
      default: 'border-current',
      disabled: 'bg-neutral text-base-content pointer-events-none border-opacity-0 bg-opacity-10 text-opacity-20',
      disabledHover: 'bg-neutral text-base-content pointer-events-none border-opacity-0 bg-opacity-10 text-opacity-20',
      active: 'bg-base-100 border-t-2',
      notActive: 'pt-0.5',
      label: 'text-base'
    }
  }
  // unstyled: {
  //   default:
  //     'grid w-full grid-flow-row content-start items-center justify-items-center gap-4 text-center sm:grid-flow-col sm:grid-cols-[auto_minmax(auto,1fr)] sm:justify-items-start sm:text-left'
  // }
}
const injectName = createInjectName('bottom-navigation')
const sassDefaults = transformJsToSass(defaults)
export const inject = {
  [injectName.defaults]: () => {
    return sassDefaults
  }
}

export const options = {
  defaults
}
