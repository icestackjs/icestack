# css-to-tailwindcss-plugin

> 把你的 `css/scss` 文件转化成 `tailwindcss plugin`

[English](./README.md)

- [css-to-tailwindcss-plugin](#css-to-tailwindcss-plugin)
  - [输入输出示例](#输入输出示例)
  - [安装](#安装)
  - [使用方式](#使用方式)
    - [Cli](#cli)
    - [Nodejs Api](#nodejs-api)
    - [Tailwindcss Plugin](#tailwindcss-plugin)
  - [处理 tailwindcss `theme()` 方法和 `@apply` 指令](#处理-tailwindcss-theme-方法和-apply-指令)
  - [License](#license)

## 输入输出示例

你的 `css/scss` 可能像下面这样👇:

```css
@layer base {
  h1 {
    font-size: theme("fontSize.2xl");
  }
  h2 {
    font-size: theme("fontSize.xl");
  }
}

@layer components {
  .card {
    background-color: theme("colors.white");
    border-radius: theme("borderRadius.lg");
    padding: theme("spacing.6");
    box-shadow: theme("boxShadow.xl");
  }
}

@layer utilities {
  .content-auto {
    content-visibility: "auto";
  }
}
/* this will be abandoned unless you set the `outSideLayerCss` option */
/* 默认情况下，不在@layer里的会被抛弃，除非设置了 `outSideLayerCss` 配置项 */
.btn{
  background: #ffffff;
}
```

上方文件会被这个工具转化成一个 `tailwindcss plugin`，类似下方这样:

```js
const _plugin = require('tailwindcss/plugin')
const returnSelfNoop = (x) => x
const css2TwPlugin = _plugin.withOptions(
  function (_options = {}) {
    const { withOptionsWalkCSSRuleObject = returnSelfNoop } = _options
    return function ({ addBase, addComponents, addUtilities, theme, addVariant, config, corePlugins, e, matchComponents, matchUtilities, matchVariant }) {
      const _baseCss = withOptionsWalkCSSRuleObject(
        {
          h1: {
            'font-size': theme('fontSize.2xl')
          },
          h2: {
            'font-size': theme('fontSize.xl')
          }
        },
        'base'
      )
      addBase(_baseCss)
      const _componentsCss = withOptionsWalkCSSRuleObject(
        {
          '.card': {
            'background-color': theme('colors.white'),
            'border-radius': theme('borderRadius.lg'),
            padding: theme('spacing.6'),
            'box-shadow': theme('boxShadow.xl')
          }
        },
        'components'
      )
      addComponents(_componentsCss)
      const _utilitiesCss = withOptionsWalkCSSRuleObject(
        {
          '.content-auto': {
            'content-visibility': '"auto"'
          }
        },
        'utilities'
      )
      addUtilities(_utilitiesCss)
    }
  },
  function (_options) {
    return {}
  }
)
module.exports = css2TwPlugin
```

## 安装

```bash
<npm / yarn / pnpm> i -D css-to-tailwindcss-plugin
```

> 假如你想要处理 `tailwindcss's Functions & Directives`，你必须安装 `tailwindcss`。
>
> 同样为了支持 `scss/sass` 文件处理，你必须要安装 `sass`。

## 使用方式

### Cli

```bash
css2plugin build path/to/your.css path/to/your-another.scss --out ./tw-plugins
```

执行命令后，一个 `<css-file-name>.js` 文件将被生成在 `out` 指定的 `tw-plugins` 目录中。

> `css2plugin build -h` for more options

### Nodejs Api

使用方式以及选项对应的用途:

```js
import { createContext } from 'css-to-tailwindcss-plugin'

const ctx = createContext({
  // pass options to postcss-import
  atImportOptions: {},
  // pass to sass options
  sassOptions: {},
  // tailwind.config.js path `string` or tailwind Config
  tailwindcssConfig: '',
  // if resolve tailwindcss Functions & Directives  (like theme() and @apply etc....)
  // should be used with `tailwindcssConfig`
  tailwindcssResolved: false,
  // pass options to babel generator
  generatorOptions: {},
  // default throw all css outside @layer
  // 'base' | 'components' | 'utilities'
  outSideLayerCss: 'components',
  // generate tailwindcss plugin with `plugin` api or `plugin.withOptions` api
  withOptions: true,
  // custom handler
  interceptors: {
    css:[
    (root,ctx)=>{
      // do sth
    }
  ]},

  postcssPlugins:(plugins)=>{
    // plugins.push / splice ...
  }
})
// load css node into context map
await ctx.process('path/to/your.css')

await ctx.process('path/to/your.scss')

const code = ctx.generate() // return code then you can fs.writeFile
```

> Context 同步 API 功能是残缺的，这是因为 `tailwindcss` 和 `postcss-import` 是异步的 `postcss` 插件，没法同步调用.

### Tailwindcss Plugin

```js
const path = require('node:path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  plugins: [
    require('css-to-tailwindcss-plugin/tailwindcss')({
      entries: [
        // your css entry path
        path.resolve(__dirname, './theme-multiple.css'), 
        path.resolve(__dirname, './common.scss'
      )],
      // tmp plugins cache dir, default path is `process.cwd() + node_modules/.css-to-tailwindcss-plugin`
      // cacheDir: string

      // other options same to createContext
      // ...options
      // note: `tailwindcssResolved` is invalid in `tailwindcss plugin`, because `tailwindcss` is an async postcss plugin, while `tailwindcss plugin` **MUST** be sync!
      

      // you can use this method to intercept plugin with `withOptions`
      withOptionsWalkCSSRuleObject(cssObj, layer) {
        console.log(cssObj, layer)
        // don't forget to return it
        // this will replace origin css obj so you can add prefix here!
        return cssObj
      }
    })
  ],
  // ...
}
```

> 目前 `@import`/`@use` 只支持 `.scss` 文件
>
> `.css` 文件目前`Tailwindcss Plugin`使用方式中不支持引入，因为 `tailwindcss` 和 `postcss-import` 都是异步的插件, 然而 `tailwindcss plugin` 必须是同步的!
>
> 当然, `CLI` 和 `Nodejs Api` 没有这样的限制

## 处理 tailwindcss `theme()` 方法和 `@apply` 指令

你必须安装 `tailwindcss`，然后设置 `tailwindcssResolved` 为 `true`，同时再传当前的 `tailwind.config.js` 路径或者内联 `Config` 对象.

```bash
<npm / yarn / pnpm> i -D tailwindcss
```

```js
import { createContext } from 'css-to-tailwindcss-plugin'

const ctx = createContext({
  // should be set to true
  tailwindcssResolved: true,
  // tailwind.config.js path `string` or tailwind Config
  // for tailwindcss resolve (like theme() and @apply etc....)
  tailwindcssConfig: 'path/to/your/tailwind.config.js'
})
```

然后 `theme()` 方法和 `@apply` 会被处理。

> 假如 `tailwindcssResolved` 是 `false`，那么 `css` 里的 `theme` 方法会被转化成插件里的 `js theme` 方法，而 `@apply` 那些写法会被丢弃。

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [sonofmagic](https://github.com/sonofmagic)
