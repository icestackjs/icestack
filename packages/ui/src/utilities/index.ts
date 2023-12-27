import glass from './glass'
import variables from './variables'
import type { CssInJs } from '@/types'
import { preprocessCssInJs, mergeRClone, mapCss2JsArray } from '@/shared'
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
    return preprocessCssInJs(o(...args))
  }
}

const utilitiesNames = Object.keys(utilitiesMap) as (keyof typeof utilitiesMap)[]
export { utilitiesNames, utilitiesMap }
