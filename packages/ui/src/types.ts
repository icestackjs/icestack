import type { ConfigOptions } from 'rtlcss'
import type allComponents from './allComponents'
import type { Options as PrefixerOptions } from '@/postcss/prefixer'
export interface UserDefinedOptions {
  components: Record<
    (typeof allComponents)[number],
    {
      override: object
      extend: object
      postcss: object
    }
  >
  global: {
    atMedia: {
      hover: boolean
    }
  }
  styled: boolean
  log: boolean
  prefix: string | PrefixerOptions
  rtl: boolean | ConfigOptions
  // https://daisyui.com/docs/config/
  // themes: only light + dark, and custom
  // darkTheme
  // base
  // styled
  // utils: true
}
