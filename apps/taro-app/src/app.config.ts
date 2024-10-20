export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/index/doc',
    'pages/index/component',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'IceStack',
    navigationBarTextStyle: 'black',
  },
  usingComponents: {
    md: './components/md',
  },
  // https://github.com/NervJS/taro/blob/f7942f5dcdd51599b723c257a7934d597e8cac8a/packages/taro-service/src/platform-plugin-base/mini.ts#L30
  // https://github.com/NervJS/taro/blob/f7942f5dcdd51599b723c257a7934d597e8cac8a/packages/taro-cli/src/presets/files/generateProjectConfig.ts#L6
})
