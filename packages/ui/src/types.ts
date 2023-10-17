import allComponents from './allComponents'

interface UserDefinedOptions {
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
  logs: boolean
  prefix: boolean
  rtl: boolean
  // https://daisyui.com/docs/config/
  // themes: only light + dark, and custom
  // darkTheme
  // base
  // styled
  // utils: true
}
