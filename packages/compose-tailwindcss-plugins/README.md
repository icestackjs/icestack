# compose-tailwindcss-plugins

> compose your tailwindcss plugins into one!

- [compose-tailwindcss-plugins](#compose-tailwindcss-plugins)
  - [Install](#install)
  - [Usage](#usage)
  - [License](#license)

## Install

```bash
<npm/yarn/pnpm> i -D compose-tailwindcss-plugins
```

## Usage

```js
const { composePlugins } = require('compose-tailwindcss-plugins') 

const myComposedPlugin = composePlugins(plugin0,plugin1,[plugin2,plugin3])

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  plugins: [
    myComposedPlugin // or myComposedPlugin(opt)
  ]
}
```

it works like:

```diff
const { composePlugins } = require('compose-tailwindcss-plugins') 

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  plugins: [
-    require('@tailwindcss/typography'),
-    require('@tailwindcss/forms'),
-    require('@tailwindcss/aspect-ratio'),
-    require('@tailwindcss/container-queries'),
+    composePlugins([
+      require('@tailwindcss/typography'),
+      require('@tailwindcss/forms'),
+      require('@tailwindcss/aspect-ratio'),
+      require('@tailwindcss/container-queries'),
+    ])
  ]
}
```

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [sonofmagic](https://github.com/sonofmagic)
