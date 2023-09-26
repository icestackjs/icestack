# css-to-tailwindcss-plugin

> transform your `css/scss` to `tailwindcss plugin`

- [css-to-tailwindcss-plugin](#css-to-tailwindcss-plugin)
  - [Install](#install)
  - [Usage](#usage)
    - [Cli](#cli)
    - [Nodejs Api](#nodejs-api)
  - [License](#license)

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
  tailwindcssConfig: ''
})

await ctx.process('path/to/your.css')

ctx.generate() // return code then you can fs.writeFile
```

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [sonofmagic](https://github.com/sonofmagic)
