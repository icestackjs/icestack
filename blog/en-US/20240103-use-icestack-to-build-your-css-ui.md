![Image](https://pic4.zhimg.com/80/v2-142cf9008c14984caca829eeea827a02.jpg)

# Use IceStack to build your CSS UI

- [Use IceStack to build your CSS UI](#use-icestack-to-build-your-css-ui)
  - [Install `@icestack/ui`](#install-icestackui)
  - [Initialization configuration file](#initialization-configuration-file)
    - [Build style](#build-style)
  - [Used as tailwindcss plugin](#used-as-tailwindcss-plugin)
  - [Default preset](#default-preset)
  - [Start from scratch](#start-from-scratch)
    - [Build button component](#build-button-component)
    - [Component style refinement](#component-style-refinement)
    - [Write configuration file](#write-configuration-file)
    - [Add more colors](#add-more-colors)
    - [Add more sizes](#add-more-sizes)
    - [More](#more)

I love `tailwindcss` and use it frequently. I also like `daisyui` very much. Using these for development saves me a lot of effort.

However, I encountered some scenarios in the project where I needed to deeply customize the `Css UI` component. At this time, `daisyui` could not solve my problem for the time being.

So I came up with some ideas and wrote [`icestack`](https://ui.icebreaker.top/) inspired by `tailwindcss` and `daisyui`

This is a `Css UI` framework generation and management tool. Through it, you can easily extend the style, and you can also easily build your own `Css UI` from scratch and combine it with `tailwindcss`. use!

Let's see how to use it!

## Install `@icestack/ui`

```bash
# yarn | pmpm
npm install -D @icestack/ui @icestack/tailwindcss
```

`@icestack/ui` will be downloaded and installed locally, and a command `icestack` will be registered

## Initialization configuration file

After installing `@icestack/ui`, execute:

```bash
npx icestack init
```

This command will generate an `icestack.config.cjs` file in the current execution directory. The default content is as follows:

```js filename="icestack.config.cjs"
/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui'
}

module.exports = config
```

### Build style

```bash
npx icestack build
```

This command reads the configuration and builds the product in the `'./my-ui'` directory under the current configuration file. Then you can directly import these `css` and `js` files, but giving them to `tailwindcss` is more convenient to use.

## Used as tailwindcss plugin

Register the `icestackPlugin` plugin in `tailwind.config.js` and pass a `loadDirectory` parameter to locate the location where the product was just generated:

```js filename="tailwind.config.js"
const path = require('node:path')
const { icestackPlugin } = require('@icestack/tailwindcss')

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  plugins: [
    icestackPlugin({
      // Absolute path to the loading directory
      loadDirectory: path.resolve(__dirname, 'my-ui'),
      // Whether to inject tailwindcss theme config
      // When true, the generator's primary success warning colors will enter the tailwindcss.theme.extend configuration
      // You can use bg-primary / text-success
      // Default value: false
      loadConfig: true
      // ...
    })
  ]
}
```

Then as long as we run the project normally, we can directly use all the `CSS` components in the `my-ui` directory!

## Default preset

By default, a set of `@icestack/preset-default` for `Css` components is built into `@icestack/ui`, which absorbs the excellent writing style of `daisyui` and remains consistent in many places.

At the same time, you can use configuration items to extend and override its original style, [see override](https://ui.icebreaker.top/docs/core/override)

If you want to build your own `UI` framework from 0 to 1, you can set `mode` to `none` in `icestack.config.cjs`, and `@icestack/preset` will not be loaded at this time.

## Start from scratch

### Build button component

We can select our favorite `button` component from the component library list of the project [awesome-tailwindcss](https://github.com/aniftyco/awesome-tailwindcss). Its `html` is as follows

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

### Component style refinement

Then we start to refine `html` and extract its styles:

```html
<a class="btn">
  <span>Hover Me</span>
</a>
```

Convert the original long-passed `class` into `@apply`, and wrap it in the selector `.btn`, then convert the last animated `div` element into a pseudo-element, and modify the style.

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

### Write configuration file

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

Then after executing `icestack build`, `.btn` will be successfully loaded by `tailwindcss plugin`. You can write like this:

```html
<a class="btn"> Hover Me </a>
```

### Add more colors

For example, if we have requirements, the default is `bg-blue-600 focus:ring-blue-300`

But what should we do if we can pass in red, yellow, and other colors?

```js
/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  components: {
    button: {
      selector: '.btn',
      // types is the default primary / success ... theme string array
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

After making the changes, execute `npx icestack build` to build. After completion, you can use it directly:

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

### Add more sizes

If we want to add more dimensions to this `button` component, we can set it like this:

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

Then build it and you can use it directly:

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

### More

You must have noticed that the `schema` method has multiple parameters:

- `selector` is the selector
- `types` is the automatically generated color name in the `base` option
- `params` is the incoming parameter, which can render different performances of the component according to different parameters.

We can render different `Css` style codes based on different parameters.

Of course, you can also find more examples and usage on the [`icestack`](https://ui.icebreaker.top/) official website.

Everyone is welcome to try it!
