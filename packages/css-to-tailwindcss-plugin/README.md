# css-to-tailwindcss-plugin

> Transform your `css/scss` to `tailwindcss plugin`

- [css-to-tailwindcss-plugin](#css-to-tailwindcss-plugin)
  - [Input \& Output](#input--output)
  - [Install](#install)
  - [Usage](#usage)
    - [Cli](#cli)
    - [Nodejs Api](#nodejs-api)
    - [tailwindcss plugin](#tailwindcss-plugin)
  - [tailwindcss `theme()` and `@apply` resolved](#tailwindcss-theme-and-apply-resolved)
  - [License](#license)

## Input & Output

you have a css file like below:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

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
.btn{
  background: #ffffff;
}
```

then it will transform to `tailwindcss plugin` like this:

```js
const _plugin = require('tailwindcss/plugin')
const css2TwPlugin = _plugin(function ({ addBase, addComponents, addUtilities, theme, addVariant, config, corePlugins, e, matchComponents, matchUtilities, matchVariant }) {
  addBase({
    'h1': {
      'font-size': theme('fontSize.2xl')
    },
    'h2': {
      'font-size': theme('fontSize.xl')
    }
  })
  addComponents({
    '.card': {
      'background-color': theme('colors.white'),
      'border-radius': theme('borderRadius.lg'),
      'padding': theme('spacing.6'),
      'box-shadow': theme('boxShadow.xl')
    }
  })
  addUtilities({
    '.content-auto': {
      'content-visibility': '"auto"'
    }
  })
})
module.exports = css2TwPlugin
```

## Install

```bash
<npm / yarn / pnpm> i -D css-to-tailwindcss-plugin
```

if you want to resolve `tailwindcss's Functions & Directives`, you should install `tailwindcss`.

also `scss/sass` support need to install `sass`, then this package can handle `.scss` files.

```bash
<npm / yarn / pnpm> i -D tailwindcss sass
```

## Usage

### Cli

```bash
css2plugin build path/to/your.css path/to/your-another.scss --out ./tw-plugins
```

> `css2plugin build -h` for more options

### Nodejs Api

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

await ctx.process('path/to/your.css')

await ctx.process('path/to/your.scss')

ctx.generate() // return code then you can fs.writeFile
```

### tailwindcss plugin

```js
const path = require('node:path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  plugins: [
    //Don't forget to use `...` to expand all plugins
    ...require('css-to-tailwindcss-plugin/tailwindcss')({
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
    })
  ],
  // ...
}
```

> now `@import`/`@use` only supports `.scss` files.
>
> `.css` files are not supported because `tailwindcss` and `postcss-import` are async plugins, while `tailwindcss plugin` **MUST** be sync!

## tailwindcss `theme()` and `@apply` resolved

you should install `tailwindcss`, then pass `tailwind.config.js` file path or `inline Config` to this lib.

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

then `theme()` and `@apply` will be resolved.

> if `tailwindcssResolved` is false, `css theme function` will be transformed to `js theme function`, and `@apply` will be abandoned.
> Context Sync API is incomplete because `tailwindcss` and `postcss-import` should be used async.

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [sonofmagic](https://github.com/sonofmagic)
