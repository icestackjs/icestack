![Image](https://pic4.zhimg.com/80/v2-28f7a013e24151181b30780280afe352.png)

# 使用 postcss-cva 来生成 cva 方法吧

- [使用 postcss-cva 来生成 cva 方法吧](#使用-postcss-cva-来生成-cva-方法吧)
  - [什么是 cva](#什么是-cva)
    - [封装示例](#封装示例)
    - [组成参数](#组成参数)
  - [postcss-cva 的功能](#postcss-cva-的功能)
    - [Css 示例](#css-示例)
    - [原子化设计](#原子化设计)
    - [注释参考](#注释参考)
    - [生成cva函数](#生成cva函数)
  - [Refers](#refers)

## 什么是 cva

`cva` 全称为 `class-variance-authority`, 它是一个非常适合制作那种，创建控制`Css`变体方法的类库，它非常的契合像 `tailwindcss` 这类的原子化思想。

在很多时候我们自己封装组件, 尤其是使用原子化思想去编写 `css` , 然后去封装组件，用它就对了！

### 封装示例

那么如何用它进行封装呢？我们以封装一个直观的 `vue` 组件 `Button` 为例:

```html
<template>
  <button>
    <slot></slot>
  </button>
</template>
```

接下来我们要根据这个组件，传入的 `Props` 来控制它的样式，包括颜色种类，大小，状态，形状等等。

那么假如使用样式去控制这些，我们通常会这么写:

```html
<template>
  <button :class="className">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  function getButtonClass(props) {
    let classNames = [
      /* base */
    ]
    // do something with props like push, splice, unshift ...
    return classNames.join(' ')
  }

  const props = withDefaults(
    defineProps<{
      // ...
    }>(),
    {
      // ...
    },
  )
  const className = computed(() => {
    return getButtonClass(props)
  })
</script>
```

而 `cva` 就是帮助我们去生成这个 `getButtonClass` 函数的一个方法。

### 组成参数

一个 `cva` 的入参，通常包括 `4` 个部分: `base`,`variants`,`compoundVariants`,`defaultVariants`:

```js
import { cva } from 'class-variance-authority'
//                     ⬇️ base
const button = cva(['font-semibold', 'border', 'rounded'], {
  // ⬇️ variants
  variants: {
    intent: {
      primary: ['bg-blue-500', 'text-white', 'border-transparent', 'hover:bg-blue-600'],
      secondary: ['bg-white', 'text-gray-800', 'border-gray-400', 'hover:bg-gray-100']
    },
    size: {
      small: ['text-sm', 'py-1', 'px-2'],
      medium: ['text-base', 'py-2', 'px-4']
    }
  },
  // ⬇️ compoundVariants
  compoundVariants: [
    {
      intent: 'primary',
      size: 'medium',
      class: 'uppercase'
    }
  ],
  // ⬇️ defaultVariants
  defaultVariants: {
    intent: 'primary',
    size: 'medium'
  }
})

button()
// => "font-semibold border rounded bg-blue-500 text-white border-transparent hover:bg-blue-600 text-base py-2 px-4 uppercase"
button({ intent: 'secondary', size: 'small' })
// => "font-semibold border rounded bg-white text-gray-800 border-gray-400 hover:bg-gray-100 text-sm py-1 px-2"
```

很多时候我们可以去构造出这样的函数，来封装我们的组件。这会让我们的代码非常的直观，该控制样式的就控制样式，该控制行为的就控制行为。所以用 `cva` 改造刚刚那个 `vue` `Button` 组件就很好。

但是假如我们项目不用原子化的`Css`类库呢？或者我们希望在编写 `Css` 时，顺便把 `cva` 函数给生成出来，那么你就要来使用 `postcss-cva` 了。

## postcss-cva 的功能

`postcss-cva` 是一个基于 `css ast` 分析的 `postcss` 插件。

它可以把你编写的 `Css` 注释，给转化成 `cva` 函数。

### Css 示例

来看一个简单的例子，在 `Button` 组件的封装过程中，写下了以下的 `Css`

```css
/* @meta path="./buttonClass" */
/* @dv size="md" */
.btn {
  /* @b */
  font-size: 16px;
  background: gray;
  border-radius: 4px;
}

.btn-primary {
  /* @v type="primary" */
  background: blue;
  color: white;
}

.btn-secondary {
  /* @v type="secondary" */
  font-size: 22px;
  color: yellow;
}

.btn-disabled {
  /* @cv type="primary" size="xs" */
  cursor: not-allowed;
}

.btn-md {
  /* @v size="md" */
  padding: 6px 10px;
  font-size: 16px;
}

.btn-xs {
  /* @v size="xs" */
  padding: 2px 6px;
  font-size: 14px;
}

.btn-sm {
  /* @v size="sm" */
  padding: 4px 8px;
  font-size: 12px;
}
```

### 原子化设计

在其中我们定义了:

- 它的基础类: `base`: `.btn`
- 它的变种类: `variants`:
  - `.btn-primary`,`.btn-secondary` 来控制颜色种类
  - `.btn-md`,`.btn-xs`,`.btn-sm` 来控制大小
  - 更多的来控制，形状或者其他等等
- 它的复合变种: `compoundVariants`: `.btn-disabled` (当满足传入参数 `type="primary" size="xs"` 时会触发)
- 它的默认变种: `defaultVariants`: `size="md"`(默认什么参数都不传的情况下使用 `size="md"`)

### 注释参考

然后依照 `postcss-cva` 的注释参考:

| keyword | target             | type   | description                                   |
| ------- | ------------------ | ------ | --------------------------------------------- |
| `@b`    | `base`             | node   | add current node selector to base             |
| `@gb`   | `base`             | global | define base                                   |
| `@v`    | `variants`         | node   | add current node selector to variants         |
| `@gv`   | `variants`         | global | define variants                               |
| `@cv`   | `compoundVariants` | node   | add current node selector to compoundVariants |
| `@gcv`  | `compoundVariants` | global | define defaultVariants                        |
| `@dv`   | `defaultVariants`  | global | define defaultVariants                        |
| `@meta` | `meta`             | global | define metadata                               |

通过添加相对应的注释，我们定义了所有的变种。

> defined by `@meta path="./buttonClass"`

同时也定义了 `cva` 函数的文件输出目录为，当前 `Button.vue` 文件所在目录下的 `buttonClass.ts` 文件 (默认格式为`ts`)

### 生成cva函数

这样，再我们主运行函数，引入 `vue` 组件/ 注释所在`css`文件时，一个 `cva` 函数就被生成了出来:

```ts
import { cva, VariantProps } from 'class-variance-authority'
const index = cva(['btn'], {
  variants: {
    type: {
      primary: ['btn-primary'],
      secondary: ['btn-secondary']
    },
    size: {
      md: ['btn-md'],
      xs: ['btn-xs'],
      sm: ['btn-sm']
    }
  },
  compoundVariants: [{
    class: ['btn-disabled'],
    type: ['primary'],
    size: ['xs']
  }],
  defaultVariants: {
    size: 'md'
  }
})
export type Props = VariantProps<typeof index>
export default index
```

然后，我们就可以直接引入进行封装了！

```html
<template>
  <button :class="className">
    <slot>postcss-cva</slot>
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import buttonClass, { Props as ButtonProps } from './buttonClass'

  const props = withDefaults(
    defineProps<{
      // ButtonProps
      type?: 'primary' | 'secondary'
      size?: 'md' | 'sm' | 'xs'
    }>(),
    {},
  )
  const className = computed(() => {
    return buttonClass(props)
  })
</script>
```

是不是非常的简单呢？

`postcss-cva` 能够让你在设计和编写 `css` 的时候，就把 `cva` 函数给规划好了。

现在你不但可以直接把它作为一个外置的 `postcss` 插件来使用，而且已经被集成到了
[IceStack](https://ui.icebreaker.top/zh-CN) 里面。

赶快用它来管理和生成你的 `Css UI` 吧。

## Refers

[IceStack](https://ui.icebreaker.top/zh-CN)

[postcss-cva](https://www.npmjs.com/package/postcss-cva)

[cva.style](https://cva.style/)
