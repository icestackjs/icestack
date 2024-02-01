![Image](https://pic4.zhimg.com/80/v2-28f7a013e24151181b30780280afe352.png)

# Use postcss-cva to generate cva method

- [Use postcss-cva to generate cva method](#use-postcss-cva-to-generate-cva-method)
  - [What is cva](#what-is-cva)
    - [Example](#example)
    - [Parameters](#parameters)
  - [postcss-cva](#postcss-cva)
    - [css example](#css-example)
    - [Atomic design](#atomic-design)
    - [Annotated reference](#annotated-reference)
    - [Generate cva function](#generate-cva-function)
  - [Refers](#refers)

## What is cva

`cva` stands for `class-variance-authority`. It is a class library that is very suitable for creating and controlling `Css` variant methods. It is very suitable for atomic ideas like `tailwindcss`.

Many times we encapsulate components, especially using the idea of ​​atomization to write `css`, and then encapsulate the components, just use it!

### Example

So how to use it for packaging? Let’s take the example of encapsulating an intuitive `vue` component `Button`:

```html
<template>
  <button>
    <slot></slot>
  </button>
</template>
```

Next, we need to control its style based on the passed `Props` of this component, including color type, size, status, shape, etc.

So if we use styles to control these, we usually write like this:

```html
<template>
  <button :class="className">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

function getButtonClass(props){
  let classNames = [/* base */]
  // do something with props like push, splice, unshift ...
  return classNames.join(' ')
}

const props = withDefaults(defineProps<{
  // ...
}>(), {
  // ... 
})
const className = computed(() => {
  return getButtonClass(props)
})
</script>
```

And `cva` is a method that helps us generate this `getButtonClass` function.

### Parameters

The input parameters of a `cva` usually include `4` parts: `base`, `variants`, `compoundVariants`, `defaultVariants`:

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

Many times we can construct such a function to encapsulate our components. This will make our code very intuitive. What should control the style will control the style, and what should control the behavior will control the behavior. So it is good to use `cva` to transform the `vue` `Button` component just now.

But what if our project does not use the atomic `Css` class library? Or if we want to generate the `cva` function when writing `Css`, then you have to use `postcss-cva`.

## postcss-cva

`postcss-cva` is a `postcss` plugin based on `css ast` analysis.

It can convert the `Css` comments you write into `cva` functions.

### css example

Let’s look at a simple example. During the encapsulation process of the `Button` component, the following `Css` is written

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

### Atomic design

In it we define:

- Its base class: `base`: `.btn`
- Its variants: `variants`:
  - `.btn-primary`, `.btn-secondary` to control color types
  - `.btn-md`, `.btn-xs`, `.btn-sm` to control size
  - More to control, shape or other etc.
- Its compound variants: `compoundVariants`: `.btn-disabled` (triggered when the passed parameter `type="primary" size="xs"` is met)
- Its default variant: `defaultVariants`: `size="md"` (use `size="md"` when no parameters are passed by default)

### Annotated reference

Then follow the comment reference of `postcss-cva`:

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

We define all variants by adding corresponding annotations.

> defined by `@meta path="./buttonClass"`

At the same time, the file output directory of the `cva` function is also defined as the `buttonClass.ts` file in the directory where the current `Button.vue` file is located (the default format is `ts`)

### Generate cva function

In this way, when we run the main function and introduce the `css` file where the `vue` component/comment is located, a `cva` function is generated:

```ts
import { cva, VariantProps } from "class-variance-authority";
const index = cva(["btn"], {
  variants: {
    "type": {
      "primary": ["btn-primary"],
      "secondary": ["btn-secondary"]
    },
    "size": {
      "md": ["btn-md"],
      "xs": ["btn-xs"],
      "sm": ["btn-sm"]
    }
  },
  compoundVariants: [{
    "class": ["btn-disabled"],
    "type": ["primary"],
    "size": ["xs"]
  }],
  defaultVariants: {
    "size": "md"
  }
});
export type Props = VariantProps<typeof index>;
export default index;
```

Then, we can directly import it for encapsulation!

```html
<template>
  <button :class="className">
    <slot>postcss-cva</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import buttonClass, { Props as ButtonProps } from './buttonClass'

const props = withDefaults(defineProps<{
  // ButtonProps
  type?: 'primary' | 'secondary',
  size?: 'md' | 'sm' | 'xs'
}>(), {})
const className = computed(() => {
  return buttonClass(props)
}) 
</script>
```

`postcss-cva` allows you to plan the `cva` function when designing and writing `css`.

Now you can not only use it directly as an external `postcss` plug-in, but it has also been integrated into [IceStack](https://ui.icebreaker.top/zh-CN) inside.

Use it to manage and generate your `Css UI` now.

## Refers

[IceStack](https://ui.icebreaker.top/zh-CN)

[postcss-cva](https://www.npmjs.com/package/postcss-cva)

[cva.style](https://cva.style/)
