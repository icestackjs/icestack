import type { ComponentsOptions, Preset } from '@icestack/types'
import button from './button'
import checkbox from './checkbox'
import collapse from './collapse'
import countdown from './countdown'
import input from './input'
import join from './join'
import radio from './radio'
import range from './range'
import tab from './tab'
import table from './table'
import textarea from './textarea'
import toggle from './toggle'

export const components: ComponentsOptions = {
  select: {
    disabled: true,
  },
  diff: {
    disabled: true,
  },
  tooltip: {
    disabled: true,
  },
  swap: {
    disabled: true,
  },
  card: {
    disabled: true,
  },
  timeline: {
    disabled: true,
  },
  menu: {
    disabled: true,
  },
  navbar: {
    disabled: true,
  },
  rating: {
    disabled: true,
  },
  drawer: {
    disabled: true,
  },
  button,
  checkbox,
  radio,
  input,
  range,
  textarea,
  toggle,
  table,
  countdown,
  collapse,
  join,
  tab,
}

export const miniprogramPreset: () => Preset = () => {
  return {
    postcss: {
      atMedia: {
        hover: false,
      },
      selector: {
        universal: 'view', // ['view', 'text']
        root: 'page',
      },
      pseudo: {},
    },
    components,
    base: {
      themes: {
        light: {
          selector: 'page',
        },
        dark: {
          selector: '.dark',
        },
      },
    },
  }
}
