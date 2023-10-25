import type { CodegenOptions, TailwindcssPluginOptions } from './types'

export function getCodegenDefaults(): Partial<CodegenOptions> {
  return {
    log: true,
    rtl: false,
    styled: true,
    global: {
      atMedia: {
        hover: false
      },
      selector: {
        universal: '*',
        globalKeyword: 'global'
      },
      pseudo: {
        where: true
      }
    },
    base: {
      selector: {
        light: ':root',
        dark: '[data-theme="dark"]'
      }
    }
  }
}

export function getTailwindcssPluginDefaults(): Partial<TailwindcssPluginOptions> {
  return {
    log: true,
    rtl: false,
    styled: true,
    global: {
      atMedia: {
        hover: false
      },
      selector: {
        universal: '*',
        globalKeyword: 'global'
      },
      pseudo: {
        where: true
      }
    },
    base: {
      selector: {
        entries: []
      }
    }
  }
}
