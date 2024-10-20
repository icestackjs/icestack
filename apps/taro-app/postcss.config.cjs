// object.keys顺序 https://www.npmjs.com/package/postcss-load-config
// https://github.com/postcss/postcss-load-config#ordering
module.exports = {
  plugins: {
    'tailwindcss': {},
    'postcss-rem-to-responsive-pixel': {
      // 32 意味着 1rem = 32rpx
      rootValue: 32,
      // 默认所有属性都转化
      propList: ['*'],
      // 转化的单位,可以变成 px / rpx
      transformUnit: 'rpx',
    },
    // autoprefixer: {},
    // '@pandacss/dev/postcss': {},
    // 'weapp-pandacss/postcss': {}
  },
  // [
  //   require('@pandacss/dev/postcss')(),
  //   require('@csstools/postcss-cascade-layers')()
  // ]
}
