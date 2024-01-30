# postcss-cva

A postcss plugin that generates cva functions based on comments

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

For example:

`type="primary"` is called `query`, `["shadow-sm"]` is called `params`

> The same `query` will be merged with `params` together

> Note ⚠ ️: If you use `scss`, you can use the `//` below for comment, otherwise please use`/* */`

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

will generate:

```ts
import { cva, VariantProps } from 'class-variance-authority'
const index = cva(['btn', 'rounded'], {
  variants: {
    type: {
      primary: ['btn-primary', 'shadow-sm']
    },
    size: {
      xs: ['btn-xs']
    }
  },
  compoundVariants: [
    {
      class: ['uppercase', 'p-1'],
      type: ['primary'],
      size: ['xs']
    }
  ],
  defaultVariants: {
    type: 'primary'
  }
})
export type Props = VariantProps<typeof index>
export default index
```

## References

| keyword | param              | type   | description                                   |
| ------- | ------------------ | ------ | --------------------------------------------- |
| `@b`    | `base`             | node   | add current node selector to base             |
| `@v`    | `variants`         | node   | add current node selector to variants         |
| `@cv`   | `compoundVariants` | node   | add current node selector to compoundVariants |
| `@dv`   | `defaultVariants`  | global | define defaultVariants                        |
| `@gb`   | `base`             | global | define base                                   |
| `@gv`   | `variants`         | global | define variants                               |
| `@gcv`  | `compoundVariants` | global | define defaultVariants                        |
| `@meta` | `meta`             | global | define metadata                               |

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
