const fs = require('node:fs/promises')
const path = require('node:path')
const jb = require('js-beautify')
const { upperFirst, kebabCase, get } = require('lodash')
const dedent = require('dedent')
const { getDefaultBase, defaultSelectorMap } = require('@icestack/ui/defaults')
const { componentsMap } = require('@icestack/ui/components')
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

const i18nMap = {
  'zh-CN': {
    overview: '组件总览',
    General: '通用',
    button: '按钮',
    loading: '加载动画',
    mask: '遮罩',
    Layout: '布局',
    Navigation: '导航',
    link: '链接',
    'Data Entry': '数据录入',
    checkbox: '多选框',
    input: '输入框',
    radio: '单选框',
    range: '滑块',
    select: '选择器',
    textarea: '多行文本框',
    toggle: '开关',
    'Data Display': '数据展示',
    avatar: '头像',
    badge: '徽章',
    chat: '聊天气泡',
    progress: '进度条',
    Feedback: '反馈',
    alert: '警告提示',
    Other: '其他',
    'Class Table': '类名表格',
    'Demo and Playground': '样例和演示',
    'Css Schema': 'Css 结构',
    'Go to Storybook': '前往 Storybook'
  },
  'en-US': {
    overview: 'overview',
    General: 'General',
    button: 'button',
    loading: 'loading',
    mask: 'mask',
    Layout: 'Layout',
    Navigation: 'Navigation',
    link: 'link',
    'Data Entry': 'Data Entry',
    checkbox: 'checkbox',
    input: 'input',
    radio: 'radio',
    range: 'range',
    select: 'select',
    textarea: 'textarea',
    toggle: 'toggle',
    'Data Display': 'Data Display',
    avatar: 'avatar',
    badge: 'badge',
    chat: 'chat',
    progress: 'progress',
    Feedback: 'Feedback',
    alert: 'alert',
    Other: 'Other',
    'Class Table': 'Class Table',
    'Demo and Playground': 'Demo and Playground',
    'Css Schema': 'Css Schema',
    'Go to Storybook': 'Go to Storybook'
  }
}

function createT(local) {
  return function t(p) {
    return get(i18nMap, `${local}.${p}`, '')
  }
}

const groupedComponents = Object.entries(getGroupedComponents())

function generateMetaJson(options) {
  const { local } = options
  const t = createT(local)
  const isZh = local === 'zh-CN'
  return groupedComponents.reduce(
    (acc, [groupName, componentNames]) => {
      if (componentNames.length > 0) {
        const key = `-- ${groupName}`

        acc[key] = {
          type: 'separator',
          title: t(groupName)
        }
        // acc[key].display = 'hidden'
        for (const componentName of componentNames) {
          acc[componentName] = isZh ? upperFirst(componentName) + ' ' + t(componentName) : upperFirst(componentName)
        }
      }

      return acc
    },
    {
      overview: t('overview')
    }
  )
}

async function main() {
  for (const local of i18n.locales) {
    const t = createT(local)
    for (const [groupName, componentNames] of groupedComponents) {
      for (const componentName of componentNames) {
        const p = componentsMap[componentName].options({
          selector: defaultSelectorMap[componentName]?.selector,
          types
        })
        const codeString = JSON.stringify(p, null, 2) // format(serialize(p))
        await fs.writeFile(
          resolve(`${componentName}.${local}.mdx`),
          dedent`
  import CssTable from '../../components/CssTable'
  
  ## ${t('Class Table')}
  
  <CssTable name="${componentName}" />
  
  ## ${t('Demo and Playground')}
  
  [${t('Go to Storybook')}](https://icestack-storybook.vercel.app/?path=/docs/${kebabCase(groupName)}-${componentName}--docs)
  
  ## ${t('Css Schema')}
  
  \`\`\`js
  ${codeString}
  \`\`\`
        `
        )
      }
    }
    await fs.writeFile(resolve(`_meta.${local}.json`), JSON.stringify(generateMetaJson({ local }), null, 2))
  }
}

main()
