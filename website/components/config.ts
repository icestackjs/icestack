import type { Config } from '@icestack/ui'

const config: Config = {
  base: {
    themes: {
      dark: {
        extraColors: {},
        extraCss: {},
        extraVars: {},
        selector: '',
        types: {},
      },
    },
  },
  components: {
    button: {
      disabled: false,
      extend: [{}],
      mode: 'none',
      override: [{}],
      params: {},
      postcss: {},
      schema: ({ params, selector, types }) => {
        return {
          defaults: {},
          selector,
        }
      },
      selector: '.xxx',
    },
  },
}
