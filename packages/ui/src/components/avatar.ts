import { IDefaults } from './shared'
import { CreatePresetOptions } from '@/sass/functions'

const defaults: IDefaults = {
  styled: {
    group: 'flex overflow-hidden',
    default: 'border-base-100 overflow-hidden rounded-full border-4'
  }
  // unstyled: {
  //   default:
  //     'grid w-full grid-flow-row content-start items-center justify-items-center gap-4 text-center sm:grid-flow-col sm:grid-cols-[auto_minmax(auto,1fr)] sm:justify-items-start sm:text-left'
  // }
}

export const options = (opts: CreatePresetOptions) => {
  return {
    // colors: colorsMap,
    defaults
  }
}
