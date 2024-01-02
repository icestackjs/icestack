import glass from './glass'
import variables from './variables'
import type { CssInJs } from '@/types'
import { mergeRClone } from '@/shared'
import { preprocessCssInJs, mapCss2JsArray, transformCss2Js } from '@/postcss'
const _utilitiesMap = {
  glass,
  variables,
  custom: (value: any) => {
    return mergeRClone(...mapCss2JsArray(value))
  }
} as unknown as Record<string, () => CssInJs>

const utilitiesMap = {} as Record<string, () => CssInJs>
for (const componentName of Object.keys(_utilitiesMap)) {
  const o = _utilitiesMap[componentName]
  utilitiesMap[componentName] = (...args) => {
    return preprocessCssInJs(transformCss2Js(o(...args)))
  }
}

const utilitiesNames = Object.keys(utilitiesMap) as (keyof typeof utilitiesMap)[]
export { utilitiesNames, utilitiesMap }
