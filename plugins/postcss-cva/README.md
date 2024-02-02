# postcss-cva

A postcss plugin that generates cva functions based on comments

![postcss-cva](https://github.com/sonofmagic/icestack/blob/main/plugins/postcss-cva/img.png)

- [postcss-cva](#postcss-cva)
  - [What is cva (class-variance-authority)?](#what-is-cva-class-variance-authority)
  - [Concept](#concept)
  - [Usage](#usage)
    - [Install](#install)
    - [postcss.config.\[c\]js](#postcssconfigcjs)
    - [write css first](#write-css-first)
    - [generate cva function](#generate-cva-function)
  - [References](#references)
    - [@meta](#meta)
  - [Options](#options)
    - [outdir](#outdir)
    - [importFrom](#importfrom)
    - [dryRun](#dryrun)
    - [cwd](#cwd)
    - [format](#format)
    - [prefix](#prefix)
    - [remove](#remove)
    - [exports](#exports)
    - [include / exclude](#include--exclude)
  - [Troubleshooting](#troubleshooting)
  - [Vite Config](#vite-config)
  - [Demo and Sample](#demo-and-sample)
  - [License](#license)

## What is cva (class-variance-authority)?

The CVA function is an excellent atomic tool function, refer to <https://cva.style/docs>

## Concept

For example. A `cva` function consists of `4` parts: `base`,`variants`,`compoundVariants`,`defaultVariants`

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

## Usage

> This plugin has been integrated internally in  `icestack`, no need to install and register.

### Install

```bash
npm i -D postcss-cva
yarn add -D postcss-cva
pnpm add -D postcss-cva
```

### postcss.config.[c]js

add `postcss-cva` to your postcss config:

```js
module.exports = {
  plugins: {
    // options
    'postcss-cva': {},
  }
}
```

Then you can write some comment start with `@` in your css:

### write css first

> tip: `command + /` can get `/* */` quickly

```css
/* @meta path="button" */
.btn {
  /* @b */
}
.btn-primary {
  /* @v type="primary" */
}
.btn-xs {
  /* @v size="xs" */
}
.uppercase {
  /* @cv type="primary" size="xs" */
}
/* @dv type="primary" */

/* @gb ["rounded"] */
/* @gv type="primary" ["shadow-sm"] */
/* @gcv type="primary" size="xs" ["p-1"] */
```

Then import it in your app for postcss processing. Some construction tools may be lazily loaded.

> In this plugin, `type="primary"` is called `query`, `["shadow-sm"]` is called `params`

### generate cva function

Above css will generate `button.ts` at your `$cwd/cva` dir(you can pass `cwd`,`outdir` or `@meta#path` to change it):

```ts
import { cva, VariantProps } from 'class-variance-authority'
//                 ⬇️ @b 
//                 ⬇️ @gb ["rounded"]
const index = cva(['btn', 'rounded'], {
  variants: {
    // ⬇️ @v type="primary" 
    // ⬇️ @gv type="primary" ["shadow-sm"]
    type: {
      primary: ['btn-primary', 'shadow-sm']
    },
    // ⬇️ @v size="xs"
    size: {
      xs: ['btn-xs']
    }
  },
  // ⬇️ @cv type="primary" size="xs" 
  // ⬇️ @gcv type="primary" size="xs" ["p-1"]
  compoundVariants: [
    {
      class: ['uppercase', 'p-1'],
      type: ['primary'],
      size: ['xs']
    }
  ],
  // ⬇️ @dv type="primary"
  defaultVariants: {
    type: 'primary'
  }
})
export type Props = VariantProps<typeof index>
export default index
```

> you should install `class-variance-authority`, run `npm i class-variance-authority`

## References

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

type `node` will add **current** css node selector (the last `class selector`) to their target.

type `global` will define some `query` and `params`. It can be defined anywhere. The one defined later will overwrite the one defined before.

### @meta

`@meta` query:

```css
/* @meta path="{your-cva-filepath}" format="ts/js" */
```

`path` is generate cva file path, can be `a/b/c/button`

> if you start with a `.` like `./btn`,`./txx/cu`,`../btn`, this will generate cva file relative to the css path.

`format` can be `js` or `ts`

> You can use the `js` variables to dynamically generate functions

## Options

### outdir

Type: `string`
Default: `cva`

The location of the output directory

### importFrom

Type: `string`
Default: `class-variance-authority`

From which package to import the cva function

### dryRun

Type: `boolean`
Default: `false`

### cwd

Type: `string`
Default: `process.cwd()`

### format

Type: `js` | `ts`
Default: `ts`

### prefix

Type: `string`
Default: `''`

### remove

Type: `boolean`
Default: `true`

remove all `@xx` comment

### exports

Type: `Partial<{
    base: boolean
    variants: boolean
    compoundVariants: boolean
    defaultVariants: boolean
  }>`

Default: `{
      base: true,
      variants: true,
      compoundVariants: true,
      defaultVariants: true
    }`

Export some other variables for use

### include / exclude

Type: `String | RegExp | Array[...String|RegExp]`

A valid picomatch pattern, or array of patterns. If options.include is omitted or has zero length, filter will return true by default. Otherwise, an ID must match one or more of the picomatch patterns, and must not match any of the options.exclude patterns.

Note that picomatch patterns are very similar to minimatch patterns, and in most use cases, they are interchangeable. If you have more specific pattern matching needs, you can view this comparison table to learn more about where the libraries differ.

## Troubleshooting

Don't make your `postcss-cva`'s `outdir` path included by `tailwind.config.js`'s content option. This will cause an endless loop of hot updates

## Vite Config

add `cva/*` to your `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "cva/*": [
        "cva/*"
      ]
    }
  },
}
```

add `alias` config to your `vite.config.ts`

```ts
import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: 'cva',
        replacement: path.resolve(__dirname, './cva')
      }
    ]
  }
})
```

## Demo and Sample

[Demo Link](https://github.com/sonofmagic/icestack/blob/main/examples/start-from-scratch/src/components/IceCom.vue)

```html
<template>
  <button :class="className">
    <slot>postcss-cva</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import buttonClass, { Props as ButtonProps } from 'cva/btn'
const props = withDefaults(defineProps<{
  type?: 'primary' | 'secondary',
  size: 'md' | 'sm' | 'xs'
}>(), {})
const className = computed(() => {
  return buttonClass(props)
}) 
</script>

<style scoped>
/* @meta path="btn" */
/* @dv size="md" type="primary" */
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

.btn-pointer {
  /* @cv type="primary" size="md" */
  cursor: pointer;
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
</style>
```

## License

[MIT](../../LICENSE) License &copy; 2023-PRESENT [sonofmagic](https://github.com/sonofmagic)
