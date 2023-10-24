import type { UserDefinedOptions } from './types'

export function getDefaults(): Partial<UserDefinedOptions> {
  return {
    log: true,
    rtl: false,
    styled: true,
    global: {
      atMedia: {
        hover: true
      },
      selector: {
        universal: '*',
        globalKeyword: 'global'
      },
      pseudo: {
        where: true
      }
    }
  }
}
