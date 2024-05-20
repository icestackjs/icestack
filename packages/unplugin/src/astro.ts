import type { Options } from './types'

import unplugin from '.'

export default (options: Options) => ({
  name: 'icestack-unplugin-astro',
  hooks: {
    'astro:config:setup': (astro: any) => {
      astro.config.vite.plugins ||= []
      astro.config.vite.plugins.push(unplugin.vite(options))
    },
  },
})
