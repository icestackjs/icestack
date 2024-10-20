import type { ComponentsOptions, ComponentsValue } from '@/types'
import alert from './alert'
import avatar from './avatar'
import badge from './badge'
import bottomNavigation from './bottom-navigation'
import breadcrumbs from './breadcrumbs'
import button from './button'
import card from './card'
import carousel from './carousel'
import chat from './chat'
import checkbox from './checkbox'
import collapse from './collapse'
import countdown from './countdown'
import diff from './diff'
import divider from './divider'
import drawer from './drawer'
import dropdown from './dropdown'
import fileInput from './file-input'
import footer from './footer'
import form from './form'
import hero from './hero'
import indicator from './indicator'
import input from './input'
import join from './join'
import kbd from './kbd'
import link from './link'
import loading from './loading'
import mask from './mask'
import menu from './menu'
import navbar from './navbar'
import progress from './progress'
import radialProgress from './radial-progress'
import radio from './radio'
import range from './range'
import rating from './rating'
import select from './select'
import skeleton from './skeleton'
import stack from './stack'
import stat from './stat'
import steps from './steps'
import swap from './swap'
import tab from './tab'
import table from './table'
import textarea from './textarea'
import timeline from './timeline'
import toast from './toast'
import toggle from './toggle'
import tooltip from './tooltip'

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
  rating,
} as const

const componentNames = Object.keys(schemaMap) as (keyof typeof schemaMap)[] // as unknown as keyof typeof _schemaMap

const removeDefaultComponents = componentNames.reduce<Record<string, false>>((acc, cur) => {
  acc[cur] = false
  return acc
}, {})

// removeDefaultComponents

const components: ComponentsOptions = {
  'alert': {
    selector: '.alert',
  },
  'avatar': {
    selector: '.avatar',
  },
  'badge': {
    selector: '.badge',
  },
  'button': {
    selector: '.btn',
  },
  'chat': {
    selector: '.chat',
  },
  'checkbox': {
    selector: '.checkbox',
  },
  'input': {
    selector: '.input',
  },
  'link': {
    selector: '.link',
  },
  'progress': {
    selector: '.progress',
  },
  'radio': {
    selector: '.radio',
  },
  'range': {
    selector: '.range',
  },
  'select': {
    selector: '.select',
  },
  'textarea': {
    selector: '.textarea',
  },
  'toggle': {
    selector: '.toggle',
  },
  'loading': {
    selector: '.loading',
  },
  'mask': {
    selector: '.mask',
  },
  'table': {
    selector: '.table',
  },
  'skeleton': {
    selector: '.skeleton',
  },
  'form': {},
  'radial-progress': {
    selector: '.radial-progress',
    postcss: {
      varPrefix: {
        ignoreProp: ['--size', '--thickness', '--value'],
        ignoreValueCustomProperty: ['--size', '--thickness', '--value'],
      },
    },
  },
  'countdown': {
    selector: '.countdown',
    postcss: {
      varPrefix: {
        ignoreProp: ['--value'],
        ignoreValueCustomProperty: ['--value'],
      },
    },
  },
  'diff': {
    selector: '.diff',
  },
  'kbd': {
    selector: '.kbd',
  },
  'tooltip': {
    selector: '.tooltip',
    postcss: {
      varPrefix: {
        ignoreProp: ['--tooltip-tail', '--tooltip-color', '--tooltip-text-color', '--tooltip-tail-offset'],
        ignoreValueCustomProperty: ['--tooltip-tail', '--tooltip-color', '--tooltip-text-color', '--tooltip-tail-offset'],
      },
    },
  },
  'toast': {
    selector: '.toast',
  },
  'steps': {
    selector: '.step',
  },
  'collapse': {
    selector: '.collapse',
  },
  'join': {
    selector: '.join',
  },
  'indicator': {
    selector: '.indicator',
  },
  'divider': {
    selector: '.divider',
  },
  'stack': {
    selector: '.stack',
  },
  'tab': {
    selector: '.tab',
  },
  'dropdown': {
    selector: '.dropdown',
  },
  'swap': {
    selector: '.swap',
  },
  'card': {
    selector: '.card',
  },
  'carousel': {
    selector: '.carousel',
  },
  'stat': {
    selector: '.stat',
  },
  'timeline': {
    selector: '.timeline',
  },
  'breadcrumbs': {
    selector: '.breadcrumbs',
  },
  'bottom-navigation': {
    selector: '.btm-nav',
  },
  'menu': {
    selector: '.menu',
  },
  'navbar': {
    selector: '.navbar',
  },
  'file-input': {
    selector: '.file-input',
  },
  'rating': {
    selector: '.rating',
  },
  'drawer': {
    selector: '.drawer',
  },
  'footer': {
    selector: '.footer',
  },
  'hero': {
    selector: '.hero',
  },
}
for (const [name, { schema }] of Object.entries(schemaMap)) {
  if (components[name]) {
    // @ts-ignore
    ;(components[name] as Partial<ComponentsValue>).schema = schema
  }
}

export { componentNames, components, removeDefaultComponents, schemaMap }
