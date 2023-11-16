import { OptionFn, applyStringToArray } from './shared'
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

const _componentsMap = {
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
} as Record<string, { options: OptionFn }>
const componentsMap = {} as Record<string, { options: OptionFn }>
for (const componentName of Object.keys(_componentsMap)) {
  const o = _componentsMap[componentName].options
  componentsMap[componentName] = {
    options: (...args) => {
      const { defaults, selector } = o(...args)
      return {
        selector,
        defaults: applyStringToArray(defaults)
      }
    }
  }
}

const componentsNames = Object.keys(componentsMap) as (keyof typeof componentsMap)[]
export { componentsNames, componentsMap }
