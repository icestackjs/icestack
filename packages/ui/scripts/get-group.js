const fs = require('node:fs')
const path = require('node:path')
const { orderBy } = require('lodash')
const serialize = require('serialize-javascript')

const root = path.resolve(__dirname, '../../../')
function main() {
  const result = {
    group: {
      General: orderBy(['button', 'dropdown', 'swap', 'loading', 'mask']),
      Layout: ['join', 'indicator', 'divider', 'drawer', 'footer', 'hero', 'stack'],
      Navigation: orderBy(['link', 'steps', 'tab', 'breadcrumbs', 'bottom-navigation', 'menu', 'navbar']),
      'Data Entry': orderBy(['checkbox', 'input', 'radio', 'range', 'select', 'textarea', 'toggle', 'file-input', 'rating']),
      'Data Display': orderBy(['avatar', 'badge', 'chat', 'countdown', 'diff', 'table', 'kbd', 'collapse', 'card', 'carousel', 'stat', 'timeline']),
      Feedback: orderBy(['alert', 'skeleton', 'tooltip', 'progress', 'radial-progress', 'toast']),
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
      Playground: '演示',
      Demo: '样例',
      Example: '样例',
      'Css Schema': 'Css 结构',
      'Go to Storybook': '前往 Storybook',
      skeleton: '骨架屏',
      table: '表格',
      'radial-progress': '圆形进度条',
      countdown: '计数',
      diff: '差异',
      kbd: '键盘按键',
      tooltip: '文字提示',
      toast: '轻提示',
      steps: '步骤条',
      collapse: '折叠面板',
      join: '分组容器',
      indicator: '标识',
      divider: '分隔线',
      stack: '堆叠',
      tab: '选项卡',
      dropdown: '下拉菜单',
      swap: '交换',
      drawer: '抽屉',
      footer: '页脚',
      hero: '',
      'bottom-navigation': '底部导航',
      breadcrumbs: '面包屑',
      menu: '菜单',
      navbar: '导航栏',
      'file-input': '文件上传',
      rating: '打分',
      card: '卡片',
      carousel: '轮播',
      stat: '统计',
      timeline: '时间轴'
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
