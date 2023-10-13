# postcss-custom-property-prefixer

> add prefix to your css custom-property

- [postcss-custom-property-prefixer](#postcss-custom-property-prefixer)
  - [Usage](#usage)
  - [Options](#options)
    - [ignoreValueCustomProperty](#ignorevaluecustomproperty)
    - [ignoreDecl](#ignoredecl)
    - [ignoreProp](#ignoreprop)
    - [ignoreValue](#ignorevalue)
    - [prefix](#prefix)
    - [propPrefix](#propprefix)
    - [transformProp](#transformprop)
    - [transformValue](#transformvalue)
  - [License](#license)

## Usage

```sh
<npm/yarn/pnpm> i -D postcss-custom-property-prefixer
```

Then regist this plugin into your `postcss.config.js`:

```js
module.exports = {
  plugins: {
    // ...
    'postcss-custom-property-prefixer': {
      // prefix option must be passed! 
      prefix: 'ice-'
    }
    // ...
  }
}
```

Then:

```css
.a {
  --tab-color: hsl(var(--bc) / var(--tw-text-opacity, 1));
  --tab-bg: hsl(var(--b1) / var(--tw-bg-opacity, 1));
  --tab-border-color: hsl(var(--b3) / var(--tw-bg-opacity, 1));
}
```

Will be transformed to:

```css
.a {
  --ice-tab-color: hsl(var(--ice-bc) / var(--ice-tw-text-opacity, 1));
  --ice-tab-bg: hsl(var(--ice-b1) / var(--ice-tw-bg-opacity, 1));
  --ice-tab-border-color: hsl(var(--ice-b3) / var(--ice-tw-bg-opacity, 1));
}
```

Not right? Yes! Default this plugin will transform **all** css `custom property`!

If you want to ignore some `custom properties` like `--tw-*`, you should pass some `ignore*` options, See Below!

## Options

### ignoreValueCustomProperty

plugin options:

```js
    'postcss-custom-property-prefixer': {
      prefix: 'ice-',
      ignoreValueCustomProperty(cp) {
        return cp.startsWith('--tw-')
      }
    }
```

Before:

```css
.a {
  --tab-color: hsl(var(--bc) / var(--tw-text-opacity, 1));
  --tab-bg: hsl(var(--b1) / var(--tw-bg-opacity, 1));
  --tab-border-color: hsl(var(--b3) / var(--tw-bg-opacity, 1));
}
```

After:

```css
.a {
  --ice-tab-color: hsl(var(--ice-bc) / var(--tw-text-opacity, 1));
  --ice-tab-bg: hsl(var(--ice-b1) / var(--tw-bg-opacity, 1));
  --ice-tab-border-color: hsl(var(--ice-b3) / var(--tw-bg-opacity, 1));
}
```

See! all css decl's value's custom properties which start with `--tw-` are ignored!

### ignoreDecl

This option will ignore the whole decl!

```js
    'postcss-custom-property-prefixer': {
      prefix: 'ice-',
      ignoreDecl(decl) {
        return decl.prop === '--tab-color' || decl.value.includes('hsl(var(--b1)')
      },
      ignoreValueCustomProperty(cp) {
        return cp.startsWith('--tw-')
      }
    }
```

Before:

```css
.a {
  --tab-color: hsl(var(--bc) / var(--tw-text-opacity, 1)); /* prop === --tab-color , will be ignored */
  --tab-bg: hsl(var(--b1) / var(--tw-bg-opacity, 1)); /* value.includes('hsl(var(--b1)') , will be ignored */
  --tab-border-color: hsl(var(--b3) / var(--tw-bg-opacity, 1)); /* transform */
}
```

After:

```css
.a {
  --tab-color: hsl(var(--bc) / var(--tw-text-opacity, 1));
  --tab-bg: hsl(var(--b1) / var(--tw-bg-opacity, 1));
  --ice-tab-border-color: hsl(var(--ice-b3) / var(--tw-bg-opacity, 1));
}
```

### ignoreProp

```js
    'postcss-custom-property-prefixer': {
      prefix: 'ice-',
      ignoreProp(decl) {
        return decl.prop === '--tab-color'
      },
      ignoreValueCustomProperty(cp) {
        return cp.startsWith('--tw-')
      }
    }
```

Before:

```css
.a {
  --tab-color: hsl(var(--bc) / var(--tw-text-opacity, 1)); /* only ignore the prop */
  --tab-bg: hsl(var(--b1) / var(--tw-bg-opacity, 1)); 
  --tab-border-color: hsl(var(--b3) / var(--tw-bg-opacity, 1)); 
}
```

After:

```css
.a {
  --tab-color: hsl(var(--ice-bc) / var(--tw-text-opacity, 1));
  --ice-tab-bg: hsl(var(--ice-b1) / var(--tw-bg-opacity, 1));
  --ice-tab-border-color: hsl(var(--ice-b3) / var(--tw-bg-opacity, 1));
}
```

### ignoreValue

```js
    'postcss-custom-property-prefixer': {
      prefix: 'ice-',
      ignoreValue(decl) {
        return decl.value.includes('hsl(var(--b3)')
      },
      ignoreValueCustomProperty(cp) {
        return cp.startsWith('--tw-')
      }
    }
```

Before:

```css
.a {
  --tab-color: hsl(var(--bc) / var(--tw-text-opacity, 1)); 
  --tab-bg: hsl(var(--b1) / var(--tw-bg-opacity, 1));  
  --tab-border-color: hsl(var(--b3) / var(--tw-bg-opacity, 1)); /* only ignore the value */
}
```

After:

```css
.a {
  --ice-tab-color: hsl(var(--ice-bc) / var(--tw-text-opacity, 1));
  --ice-tab-bg: hsl(var(--ice-b1) / var(--tw-bg-opacity, 1));
  --ice-tab-border-color: hsl(var(--b3) / var(--tw-bg-opacity, 1));
}
```

### prefix

Type: `String`|`PrefixFunction`, The `prefix` will be add to all `custom property`!

```ts
export type PrefixFunction = (decl: Declaration, target: 'prop' | 'value') => string
```

```js
    'postcss-custom-property-prefixer': {
      prefix: (decl,target)=>{
        if (target === 'prop' && decl.prop.startsWith('--bg-')) {
          return 'aaa-'
        }
        if (target === 'value' && decl.prop.startsWith('--text-')) {
          return 'bbb-'
        }
        return ''
      },
    }
```

Before:

```css
.a {
  --bg-red: hsl(var(--text-red-100));
  --text-red: hsl(var(--text-red-500));
}
```

After:

```css
.a {
  --aaa-bg-red: hsl(var(--text-red-100));
  --text-red: hsl(var(--bbb-text-red-500));
}
```

### propPrefix

Type: Same as `prefix`

you can pass different prefix to `prop` and `value`:

```js
    'postcss-custom-property-prefixer': {
      prefix: 'ice-',
      propPrefix: 'xx-',
      ignoreValueCustomProperty(cp) {
        return cp.startsWith('--tw-')
      }
    }
```

```css
.a {
  --tab-color: hsl(var(--bc) / var(--tw-text-opacity, 1)); 
  --tab-bg: hsl(var(--b1) / var(--tw-bg-opacity, 1));  
  --tab-border-color: hsl(var(--b3) / var(--tw-bg-opacity, 1)); 
}
```

After:

```css
.a {
  --xx-tab-color: hsl(var(--ice-bc) / var(--tw-text-opacity, 1));
  --xx-tab-bg: hsl(var(--ice-b1) / var(--tw-bg-opacity, 1));
  --xx-tab-border-color: hsl(var(--ice-b3) / var(--tw-bg-opacity, 1));
}
```

### transformProp

`Boolean`: whether transform css decl's prop, default: `true`

### transformValue

`Boolean`: whether transform css decl's value, default: `true`

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [sonofmagic](https://github.com/sonofmagic)
