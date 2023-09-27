# css-to-tailwindcss-plugin

> transform your `css/scss` to `tailwindcss plugin`

- [css-to-tailwindcss-plugin](#css-to-tailwindcss-plugin)
  - [Input \& Output](#input--output)
  - [Install](#install)
  - [Usage](#usage)
    - [Cli](#cli)
    - [Nodejs Api](#nodejs-api)
    - [tailwindcss plugin](#tailwindcss-plugin)
  - [`scss/sass` support](#scsssass-support)
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
```

then it's will transform to `tailwindcss plugin` like this:

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

## Usage

### Cli

```bash
css2plugin build path/to/your.css --out ./tw-plugins
```

### Nodejs Api

```js
import { createContext } from 'css-to-tailwindcss-plugin'

const ctx = createContext({
  // pass options to postcss-import
  atImportOptions: {},

  sassOptions: {},
  // tailwind.config.js path `string` or tailwind Config
  // for tailwindcss resolve (like theme() and @apply etc....)
  tailwindcssConfig: '',
  // pass options to babel generator
  generatorOptions: {}
})

await ctx.process('path/to/your.css')

ctx.generate() // return code then you can fs.writeFile
```

### tailwindcss plugin

```js
const path = require('node:path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  plugins: [
    require('css-to-tailwindcss-plugin/tailwindcss')({
      entries: [
        // your css
        path.resolve(__dirname, './theme-mutiple.css'), 
        path.resolve(__dirname, './common.scss'
      )]
    })
  ],
  // ...
}
```

> note: now `@import`/`@use` only support with `.scss`, `.css` is not support because of `postcss-import` is an async plugin, but `tailwindcss plugin` **MUST** be sync!

## `scss/sass` support

you should install `sass`, then this package can handle `.scss` files.

```bash
<npm / yarn / pnpm> i -D sass
```

## tailwindcss `theme()` and `@apply` resolved

you should install `tailwindcss`, then pass `tailwind.config.js` file path or `inline Config` to this lib.

```bash
<npm / yarn / pnpm> i -D tailwindcss
```

```js
import { createContext } from 'css-to-tailwindcss-plugin'

const ctx = createContext({
  // tailwind.config.js path `string` or tailwind Config
  // for tailwindcss resolve (like theme() and @apply etc....)
  tailwindcssConfig: 'path/to/your/tailwind.config.js'
})
```

then `theme()` and `@apply` will be resolved.

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [sonofmagic](https://github.com/sonofmagic)
