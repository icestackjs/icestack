import { IDefaults } from './shared'

const defaults: IDefaults = {
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
  // base: {
  //   default:
  //     'grid w-full grid-flow-row content-start items-center justify-items-center gap-4 text-center sm:grid-flow-col sm:grid-cols-[auto_minmax(auto,1fr)] sm:justify-items-start sm:text-left'
  // }
}

export const options = {
  defaults
}
