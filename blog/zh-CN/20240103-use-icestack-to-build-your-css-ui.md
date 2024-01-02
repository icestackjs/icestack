![Image](https://pic4.zhimg.com/80/v2-142cf9008c14984caca829eeea827a02.jpg)

# 使用 IceStack 来构建你的 Css UI 吧

- [使用 IceStack 来构建你的 Css UI 吧](#使用-icestack-来构建你的-css-ui-吧)
  - [安装 `@icestack/ui`](#安装-icestackui)
  - [初始化配置文件](#初始化配置文件)
    - [构建样式](#构建样式)
  - [作为 tailwindcss plugin 来使用](#作为-tailwindcss-plugin-来使用)
  - [默认预设](#默认预设)
  - [从0到1进行构建](#从0到1进行构建)
    - [构建button组件](#构建button组件)
    - [组件样式提炼](#组件样式提炼)
    - [写入配置文件](#写入配置文件)
    - [添加更多的颜色种类](#添加更多的颜色种类)
    - [添加更多的尺寸](#添加更多的尺寸)
    - [更多](#更多)

我热爱 `tailwindcss` 并经常使用它, 我也非常喜欢 `daisyui`, 使用这 `2` 者进行开发为我节省了不少功夫。

然而遇到项目上的一些场景，需要深度定制 `Css UI` 组件，这时候 `daisyui` 暂时无法解决我的问题。

于是我产生了一些想法，并以 `tailwindcss` 和 `daisyui` 为灵感，编写了 [`icestack`](https://ui.icebreaker.top/)

这是一个 `Css UI` 框架的生成和管理工具，通过它，你可以很容易的对样式进行扩展，也可以很容易的从0开始构建你自己的 `Css UI` 并结合 `tailwindcss` 来进行使用！

让我们看看如何来使用它吧！

## 安装 `@icestack/ui`

```bash
# yarn | pmpm
npm install -D @icestack/ui @icestack/tailwindcss
```

`@icestack/ui` 将会被下载并安装在你的本地，同时一个命令 `icestack` 将会被注册

## 初始化配置文件

安装好 `@icestack/ui` 之后，执行:

```bash
npx icestack init
```

这个命令会在当前执行目录下生成一个 `icestack.config.cjs` 文件，默认内容如下:

```js filename="icestack.config.cjs"
/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui'
}

module.exports = config
```

### 构建样式

```bash
npx icestack build
```

这个命令会在当前配置文件下的 `'./my-ui'` 目录构建出产物，接下来你就可以直接导入这些 `css`,`js` 文件，不过把它们交给 `tailwindcss` 进行使用更加方便。

## 作为 tailwindcss plugin 来使用

在 `tailwind.config.js` 中注册 `icestackPlugin` 插件，并传一个 `loadDirectory` 参数来定位刚刚产物的生成的位置:

```js filename="tailwind.config.js"
const path = require('node:path')
const { icestackPlugin } = require('@icestack/tailwindcss')

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  plugins: [
    icestackPlugin({
      // 加载目录的绝对路径
      loadDirectory: path.resolve(__dirname, 'my-ui'),
      // 是否注入 tailwindcss theme config
      // 为 true 时，生成器的 primary success warning 这些颜色会进入 tailwindcss.theme.extend 配置
      // 你才能够使用 bg-primary / text-success
      // 默认值: false
      loadConfig: true
      // ...
    })
  ]
}
```

接着只要我们正常运行项目，就直接能够使用 `my-ui` 目录下，所有的 `CSS` 组件了！

## 默认预设

在默认情况下, `@icestack/ui` 中内置了一套 `Css` 组件预设方案 `@icestack/preset-default`, 它吸收了 `daisyui` 的优秀写法，在很多地方都保持一致。

同时你可以使用配置项，对它原有的样式进行扩展和覆盖，[详见override](https://ui.icebreaker.top/docs/core/override)

假如你想要自己从0到1构建你自己的 `UI` 框架的话，你可以在 `icestack.config.cjs` 把 `mode` 设置为 `none`, 此时不会去加载 `@icestack/preset-default` 这个预设。

## 从0到1进行构建

### 构建button组件

我们可以在项目 [awesome-tailwindcss](https://github.com/aniftyco/awesome-tailwindcss) 的组件库里列表里，挑选自己喜爱的一个 `button` 组件，它的`html`如下

```html
<a
  href="https://ui.icebreaker.top/"
  target="_blank"
  class="group relative overflow-hidden bg-blue-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center"
>
  <span class="z-40">Hover Me</span>
  <div
    class="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-75%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000"
  ></div>
</a>
```

### 组件样式提炼

然后我们开始提炼 `html`，把它的样式抽出:

```html
<a class="btn">
  <span>Hover Me</span>
</a>
```

把原先长传的 `class` 转换成 `@apply`, 并给包裹在选择器 `.btn`，然后把最后动画的的`div`元素转换成伪元素，并修改样式。

```scss
.btn {
  @apply relative overflow-hidden bg-blue-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center;

  &::after {
    content: '';
    @apply absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-75%] transition-all bg-white/30 z-20 duration-1000;
  }

  &:hover::after {
    @apply translate-x-[50%];
  }
}
```

### 写入配置文件

```js
/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  components: {
    button: {
      selector: '.btn',
      // selector is .btn
      schema: ({ selector, params, types }) => {
        return {
          selector,
          defaults: {
            // return a string template, allow css
            base: `
            ${selector} {
              @apply relative overflow-hidden bg-blue-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center;

              &::after {
                content: '';
                @apply absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-75%] transition-all bg-white/30 z-20 duration-1000;
              }

              &:hover::after {
                @apply translate-x-[50%];
              }
            }
            `
          }
        }
      }
    }
  }
}
module.exports = config
```

然后执行 `icestack build` 之后，`.btn` 就顺利的被 `tailwindcss plugin` 加载进来了，你可以这样写:

```html
<a class="btn"> Hover Me </a>
```

### 添加更多的颜色种类

比如我们有需求，默认情况下是 `bg-blue-600 focus:ring-blue-300`

但是可以传入红色，黄色，等等其他颜色应该如何处理呢？

```js
/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  components: {
    button: {
      selector: '.btn',
      // types 为默认的 primary / success ... 主题字符串数组
      schema: ({ selector, params, types }) => {
        // add colors
        const colors = ['red', 'yellow', 'green']
        return {
          selector,
          // utils > styled > base
          defaults: {
            base: `...previous-code`,
            // add styled, allow css
            styled: `
            ${colors
              .map((color) => {
                return `${selector}-${color}{
                @apply bg-${color}-600 focus:ring-${color}-300;
              }`
              })
              .join('\n')}
            
            `
          }
        }
      }
    }
  }
}
module.exports = config
```

构建完成之后，接下来你就可以直接使用:

```html
<a class="btn">
  <span>Default</span>
</a>
<a class="btn btn-red">
  <span>Red</span>
</a>
<a class="btn btn-yellow">
  <span>Yellow</span>
</a>
<a class="btn btn-green">
  <span>Green</span>
</a>
```

### 添加更多的尺寸

假如我们要针对这个 `button` 组件添加更多的尺寸，我们可以这么设置:

```js
/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  components: {
    button: {
      selector: '.btn',
      schema: ({ selector, params, types }) => {
        // add colors
        const colors = ['red', 'yellow', 'green']
        return {
          selector,
          // utils > styled > base
          defaults: {
            base: `...previous-code`,
            styled: `...previous-code`,
            // add sizes, allow css
            utils: `
            ${selector}-xs{
              @apply px-3 py-1.5 rounded;
            }
            ${selector}-sm{
              @apply px-5 py-2 rounded-md;
            }
            ${selector}-md{
              @apply px-7 py-2.5 rounded-lg;
            }
            ${selector}-lg{
              @apply px-8 py-3 rounded-lg;
            }
            `
          }
        }
      }
    }
  }
}
module.exports = config
```

然后进行构建，便可以直接使用:

```html
<a class="btn btn-xs">
  <span>xs</span>
</a>
<a class="btn btn-sm">
  <span>sm</span>
</a>
<a class="btn btn-md">
  <span>md</span>
</a>
<a class="btn btn-lg">
  <span>lg</span>
</a>
```

### 更多

想必你也注意到了，`schema` 方法有多个参数:

- `selector` 为选择器
- `types` 为 `base` 选项中自动生成的颜色名称
- `params` 为传入参数，可以根据参数的不同渲染组件不同的表现

我们可以根据不同的参数，渲染出不同的 `Css` 样式代码。

当然你也可以在 [`icestack`](https://ui.icebreaker.top/) 官网上找到更多的示例和用法。

欢迎大家试用！
