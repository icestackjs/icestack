import { createContext, defineConfig } from '@icestack/ui'

import {
  compressCssSelector,
  expandTypes,
  getSelector,
  preprocessCssInJs,
  transformCss2Js,
  names,
  removeDefaultComponents,
  resolvedSchemaMap,
  schemaMap
} from '@icestack/ui/components'

import { createDefaultTailwindcssExtends, defaultSelectorMap, getCodegenDefaults, getDefaultBase, injectSchema, sharedExtraColors, sharedExtraVars } from '@icestack/ui/defaults'
