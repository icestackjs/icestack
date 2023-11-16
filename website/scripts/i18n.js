const { get } = require('lodash')

function getGroupedComponents() {
  return {
    General: ['button', 'loading', 'mask'],
    Layout: [],
    Navigation: ['link'],
    'Data Entry': ['checkbox', 'input', 'radio', 'range', 'select', 'textarea', 'toggle'],
    'Data Display': ['avatar', 'badge', 'chat', 'progress'],
    Feedback: ['alert', 'skeleton'],
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
    'Go to Storybook': '前往 Storybook',
    skeleton: '骨架屏'
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
    'Go to Storybook': 'Go to Storybook',
    skeleton: 'skeleton'
  }
}

function createT(local) {
  return function t(p) {
    return get(i18nMap, `${local}.${p}`, '')
  }
}

const groupedComponents = Object.entries(getGroupedComponents())

module.exports = {
  getGroupedComponents,
  i18nMap,
  createT,
  groupedComponents
}
