import { CssInJs } from 'postcss-js'
import * as glass from './glass'
import * as variables from './variables'
import { applyStringToArray } from '@/components/shared'

const _utilitiesMap = {
  glass,
  variables
} as unknown as Record<string, { options: () => CssInJs }>

const utilitiesMap = {} as Record<string, { options: () => CssInJs }>
for (const componentName of Object.keys(_utilitiesMap)) {
  const o = _utilitiesMap[componentName].options
  utilitiesMap[componentName] = {
    options: (...args) => {
      return applyStringToArray(o(...args))
    }
  }
}

const utilitiesNames = Object.keys(utilitiesMap) as (keyof typeof utilitiesMap)[]
export { utilitiesNames, utilitiesMap }
