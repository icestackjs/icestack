import { createContext, defineConfig, defu, getCodegenOptions, transformCss2Js } from '@/index'
import type { Config, IContext } from '@/index'
import {
  createDefaultTailwindcssExtends,
  defaultSelectorMap,
  generate,
  generateColorVars,
  getCodegenDefaults,
  getDefaultBase,
  gray,
  injectSchema,
  makeRgbaValue,
  presetPrimaryColors,
  sharedExtraColors,
  sharedExtraVars
} from '@/defaults'

import { compressCssSelector, expandTypes, getSelector, names, preprocessCssInJs, removeDefaultComponents, resolvedSchemaMap, schemaMap, transformCss2Js } from '@/components'
const ctx = createContext()
ctx.build()
ctx.buildBase()
ctx.buildComponents()
ctx.buildUtilities()
ctx.buildTailwindcssConfig()
ctx.compileScss()
ctx.createPreset()
ctx.createPreset()
