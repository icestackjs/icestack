import { GetSchemaFn, preprocessCssInJs } from './shared'
import * as avatar from '@/components/avatar'
import * as button from '@/components/button'
import * as alert from '@/components/alert'
import * as badge from '@/components/badge'
import * as chat from '@/components/chat'
import * as checkbox from '@/components/checkbox'
import * as input from '@/components/input'
import * as link from '@/components/link'
import * as progress from '@/components/progress'
import * as textarea from '@/components/textarea'
import * as toggle from '@/components/toggle'
import * as select from '@/components/select'
import * as radio from '@/components/radio'
import * as range from '@/components/range'
import * as loading from '@/components/loading'
import * as mask from '@/components/mask'
import * as form from '@/components/form'
import * as table from '@/components/table'
import * as tabs from '@/components/tabs'
import * as skeleton from '@/components/skeleton'
// import * as steps from '@/components/steps'

const schemaMap = {
  alert,
  avatar,
  button,
  badge,
  chat,
  checkbox,
  input,
  link,
  progress,
  textarea,
  toggle,
  select,
  radio,
  range,
  loading,
  mask,
  form,
  table,
  tabs,
  skeleton
  // steps
} as const

const componentNames = Object.keys(schemaMap) as (keyof typeof schemaMap)[] // as unknown as keyof typeof _schemaMap

const resolvedSchemaMap = {} as Record<string, { schema: GetSchemaFn }>
for (const componentName of componentNames) {
  const o = schemaMap[componentName as keyof typeof schemaMap].schema
  resolvedSchemaMap[componentName] = {
    schema: (...args) => {
      const { defaults, selector } = o(...args)
      return {
        selector,
        defaults: preprocessCssInJs(defaults)
      }
    }
  }
}

// const names = Object.keys(resolvedSchemaMap) as (keyof typeof schemaMap)[]

const removeDefaultComponents = componentNames.reduce<Record<string, boolean>>((acc, cur) => {
  acc[cur] = false
  return acc
}, {})
export { componentNames as names, schemaMap, resolvedSchemaMap, removeDefaultComponents }

export { expandTypes, getSelector, compressCssSelector, preprocessCssInJs, transformCss2Js } from './shared'

export type { GetSchemaFn } from './shared'
