const fs = require('node:fs/promises')
const path = require('node:path')
const jb = require('js-beautify')
const serialize = require('serialize-javascript')
const { upperFirst, lowerCase } = require('lodash')
const dedent = require('dedent')
const { getDefaultBase, defaultSelectorMap } = require('@icestack/ui/defaults')
const { componentsNames, componentsMap } = require('@icestack/ui/components')
const i18n = require('../i18n')
const componentsDir = path.resolve(__dirname, '../pages/components')

const defaultBase = getDefaultBase()
const types = Object.keys(defaultBase.types)

function resolve(...args) {
  return path.resolve(componentsDir, ...args)
}

function getGroupedComponents() {
  return {
    General: ['button', 'loading', 'mask'],
    Layout: [],
    Navigation: ['link'],
    'Data Entry': ['checkbox', 'input', 'radio', 'range', 'select', 'textarea', 'toggle'],
    'Data Display': ['avatar', 'badge', 'chat', 'progress'],
    Feedback: ['alert'],
    Other: []
  }
}

function generateMetaJson(options) {
  const { local } = options
  if (local === 'zh-CN') {
    return {
      Overview: '组件总览',
      '-- 通用': {
        type: 'separator',
        title: '通用'
      },
      Button: 'Button 按钮',
      Loading: 'Loading 加载动画',
      Mask: 'Mask 遮罩',
      '-- 布局': {
        type: 'separator',
        title: '布局',
        display: 'hidden'
      },
      '-- 导航': {
        type: 'separator',
        title: '导航'
      },
      Link: 'Link 链接',
      '-- 数据录入': {
        type: 'separator',
        title: '数据录入'
      },
      Checkbox: 'Checkbox 多选框',
      Input: 'Input 输入框',
      Radio: 'Radio 单选框',
      Range: 'Range 滑块',
      Select: 'Select 选择器',
      Textarea: 'Textarea 多行文本框',
      Toggle: 'Toggle 开关',
      '-- 数据展示': {
        type: 'separator',
        title: '数据展示'
      },
      Avatar: 'Avatar 头像',
      Badge: 'Badge 徽章',
      Chat: 'Chat 聊天气泡',
      Progress: 'Progress 进度条',
      '-- 反馈': {
        type: 'separator',
        title: '反馈'
      },
      Alert: 'Alert 警告提示',
      '-- 其他': {
        type: 'separator',
        title: '其他',
        display: 'hidden'
      }
    }
  } else if (local === 'en-US') {
    return {
      Overview: 'Overview',
      '-- General': {
        type: 'separator',
        title: 'General'
      },
      Button: 'Button',
      Loading: 'Loading',
      Mask: 'Mask',
      '-- Layout': {
        type: 'separator',
        title: 'Layout',
        display: 'hidden'
      },
      '-- Navigation': {
        type: 'separator',
        title: 'Navigation'
      },
      Link: 'Link',
      '-- Data Entry': {
        type: 'separator',
        title: 'Data Entry'
      },
      Checkbox: 'Checkbox',
      Input: 'Input',
      Radio: 'Radio',
      Range: 'Range',
      Select: 'Select',
      Textarea: 'Textarea',
      Toggle: 'Toggle',
      '-- Data Display': {
        type: 'separator',
        title: 'Data Display'
      },
      Avatar: 'Avatar',
      Badge: 'Badge',
      Chat: 'Chat',
      Progress: 'Progress',
      '-- Feedback': {
        type: 'separator',
        title: 'Feedback'
      },
      Alert: 'Alert',
      '-- Other': {
        type: 'separator',
        title: 'Other',
        display: 'hidden'
      }
    }
  }
}
function format(value) {
  return jb.js_beautify(value, {
    indent_size: 2,
    end_with_newline: true
  })
}

const groupedComponents = Object.entries(getGroupedComponents())

async function main() {
  for (const local of i18n.locales) {
    for (const [groupName, componentName] of groupedComponents) {
      const p = componentsMap[name].options({
        selector: defaultSelectorMap[name]?.selector,
        types
      })
      const codeString = format(serialize(p))
      await fs.writeFile(
        resolve(`${name}.${local}.mdx`),
        dedent`
import CssTable from '../../components/CssTable'

## Class Table

<CssTable name="${name}" />

## Demo and Playground

[Go to Storybook](https://icestack-storybook.vercel.app/?path=/docs/navigation-${name}--docs)

## Css Schema

\`\`\`js
${codeString}
\`\`\`
      `
      )
    }
    await fs.writeFile(resolve(`_meta.${local}.json`), JSON.stringify(generateMetaJson({ local }), null, 2))
  }
}

main()
