import { GetCssSchemaMethod, preprocessCssInJs } from './shared'
import collapse from './collapse'
import join from './join'
import indicator from './indicator'
import divider from './divider'
import stack from './stack'
import tab from './tab'
import drawer from './drawer'
import footer from './footer'
import avatar from './avatar'
import button from './button'
import alert from './alert'
import badge from './badge'
import chat from './chat'
import checkbox from './checkbox'
import input from './input'
import link from './link'
import progress from './progress'
import textarea from './textarea'
import toggle from './toggle'
import select from './select'
import radio from './radio'
import range from './range'
import loading from './loading'
import mask from './mask'
import form from './form'
import table from './table'
import skeleton from './skeleton'
import radialProgress from './radial-progress'
import countdown from './countdown'
import diff from './diff'
import kbd from './kbd'
import tooltip from './tooltip'
import toast from './toast'
import steps from './steps'
import dropdown from './dropdown'
import swap from './swap'
import card from './card'
import carousel from './carousel'
import stat from './stat'
import timeline from './timeline'
import breadcrumbs from './breadcrumbs'
import menu from './menu'
import bottomNavigation from './bottom-navigation'
import navbar from './navbar'
import fileInput from './file-input'
import hero from './hero'
import rating from './rating'
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
  'file-input': fileInput,
  drawer,
  footer,
  hero,
  rating
} as const

const componentNames = Object.keys(schemaMap) as (keyof typeof schemaMap)[] // as unknown as keyof typeof _schemaMap

const resolvedSchemaMap = {} as Record<string, { schema: GetCssSchemaMethod }>
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

export type { GetCssSchemaMethod } from './shared'
