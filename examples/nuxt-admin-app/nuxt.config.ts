// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  postcss: {
    plugins: {
      'postcss-cva': {},
      'tailwindcss': {},
      'autoprefixer': {},
    },
  },
  modules: ['@nuxt/content', '@nuxtjs/color-mode'], // , '@nuxtjs/i18n'], //
  content: {},
  colorMode: {
    // classSuffix: '',
    dataValue: 'mode',
  },
})
