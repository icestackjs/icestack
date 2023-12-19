// import type { DeepPartial, CodegenOptions } from '@icestack/types'

// import { transformCss2Js } from '@icestack/shared'
// import { colors, general } from './base'
// import type { Config } from './types'



// const daisyui: (config: Config) => DeepPartial<CodegenOptions> = (config) => {
//   const extraCss = []
//   const base = {
//     extraCss
//   }
//   const components = {}
//   if (config.base !== false) {
//     extraCss.push(transformCss2Js(`${[colors, general].join('\n')}`))
//   }

//   return {
//     prefix: {
//       prefix: config.prefix,
//       ignore: []
//     },
//     base,
//     components,
//     tailwindcssConfig: {
//       theme: {
//         extend: {
//           colors: {
//             ...colorObject,
//             // adding all Tailwind `neutral` shades here so they don't get overridden by daisyUI `neutral` color
//             "neutral-50": "#fafafa",
//             "neutral-100": "#f5f5f5",
//             "neutral-200": "#e5e5e5",
//             "neutral-300": "#d4d4d4",
//             "neutral-400": "#a3a3a3",
//             "neutral-500": "#737373",
//             "neutral-600": "#525252",
//             "neutral-700": "#404040",
//             "neutral-800": "#262626",
//             "neutral-900": "#171717",
//             "neutral-950": "#0a0a0a",
//           },
//           ...utilityClasses,
//         }
//       }
//     }
//   }
// }

// export default daisyui
