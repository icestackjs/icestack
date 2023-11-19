const { get } = require('lodash')
const { group: groupData, i18n: i18nZhMap } = require('../group')
function getGroupedComponents() {
  return groupData
}

const i18nMap = {
  'zh-CN': i18nZhMap,
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
