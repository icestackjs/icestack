import { GetSchemaFn, preprocessCssInJs } from './shared'
import collapse from './collapse'
import join from './join'
import indicator from './indicator'
import divider from './divider'
import stack from './stack'
import tab from './tab'
import avatar from '@/components/avatar'
import button from '@/components/button'
import alert from '@/components/alert'
import badge from '@/components/badge'
import chat from '@/components/chat'
import checkbox from '@/components/checkbox'
import input from '@/components/input'
import link from '@/components/link'
import progress from '@/components/progress'
import textarea from '@/components/textarea'
import toggle from '@/components/toggle'
import select from '@/components/select'
import radio from '@/components/radio'
import range from '@/components/range'
import loading from '@/components/loading'
import mask from '@/components/mask'
import form from '@/components/form'
import table from '@/components/table'
import skeleton from '@/components/skeleton'
import radialProgress from '@/components/radialProgress'
import countdown from '@/components/countdown'
import diff from '@/components/diff'
import kbd from '@/components/kbd'
import tooltip from '@/components/tooltip'
import toast from '@/components/toast'
import steps from '@/components/steps'
import dropdown from '@/components/dropdown'
import swap from '@/components/swap'
import card from '@/components/card'
import carousel from '@/components/carousel'
import stat from '@/components/stat'
import timeline from '@/components/timeline'
import breadcrumbs from '@/components/breadcrumbs'
import menu from '@/components/menu'
import bottomNavigation from '@/components/bottom-navigation'
import navbar from '@/components/navbar'
import fileInput from '@/components/file-input'
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
  // tabs,
  skeleton,
  'radial-progress': radialProgress,
  countdown,
  diff,
  kbd,
  tooltip,
  toast,
  steps,
  collapse,
  join,
  indicator,
  divider,
  stack,
  tab,
  dropdown,
  swap,
  card,
  carousel,
  stat,
  timeline,
  breadcrumbs,
  menu,
  'bottom-navigation': bottomNavigation,
  navbar,
  'file-input': fileInput
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

const removeDefaultComponents = componentNames.reduce<Record<string, false>>((acc, cur) => {
  acc[cur] = false
  return acc
}, {})
export { componentNames as names, schemaMap, resolvedSchemaMap, removeDefaultComponents }

export { expandTypes, getSelector, compressCssSelector, preprocessCssInJs, transformCss2Js } from './shared'

export type { GetSchemaFn } from './shared'
