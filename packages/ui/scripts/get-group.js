const fs = require('node:fs')
const path = require('node:path')
const serialize = require('serialize-javascript')

const root = path.resolve(__dirname, '../../../')
function main() {
  const result = {
    group: {
      General: ['button', 'loading', 'mask'],
      Layout: [],
      Navigation: ['link'],
      'Data Entry': ['checkbox', 'input', 'radio', 'range', 'select', 'textarea', 'toggle'],
      'Data Display': ['avatar', 'badge', 'chat', 'progress', 'radial-progress', 'countdown', 'table'],
      Feedback: ['alert', 'skeleton'],
      Other: []
    },
    i18n: {
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
      skeleton: '骨架屏',
      table: '表格',
      'radial-progress': '圆形进度条',
      countdown: '计数'
    }
  }

  const p = path.resolve(__dirname, 'group.js')
  fs.writeFileSync(
    p,
    `module.exports = ` +
      serialize(result, {
        space: 2
      }),
    'utf8'
  )

  fs.copyFileSync(p, path.resolve(root, 'storybook/group.js'))
  fs.copyFileSync(p, path.resolve(root, 'website/group.js'))
  fs.copyFileSync(p, path.resolve(root, 'apps/taro-app/src/group.js'))
  return result
}

main()
