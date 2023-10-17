import { Preset, definePreset } from 'unocss'
import base from '../assets/js/base/index.js'
import components from '../assets/js/components/index.js'
import utilities from '../assets/js/utilities/index.js'

import { colors } from './colors.js'
import { groupBy } from './utils'
export interface PresetOptions {}

export default definePreset((options?: PresetOptions) => {
  return {
    name: 'unocss-icestack-ui',
    rules: [
      // ...
    ],
    variants: [
      // ...
    ]
  }
})
