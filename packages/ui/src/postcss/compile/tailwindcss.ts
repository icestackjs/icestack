import postcss from 'postcss'
import tailwindcss, { type Config } from 'tailwindcss'
// import deasync from 'deasync'
export function resolveTailwindcss(options: { css: string; config: Config }) {
  const { config, css } = options
  const tw = tailwindcss(config)
  // let result: postcss.Result<postcss.Document | postcss.Root>
  // let done = false
  const result = postcss([tw])
    // @tailwind base;\n
    // @ts-ignore
    .process('@tailwind components;\n@tailwind utilities;\n' + css, {
      from: undefined
    })
  // .async()
  // .then((res) => {
  //   result = res
  //   done = true
  // })
  // require('deasync').loopWhile(() => {
  //   return !done
  // })
  // while (done) {
  //   break
  // }
  return result
}

export function initConfig() {
  const config: Config = {
    content: [{ raw: '' }],
    theme: {
      extend: {}
    },
    corePlugins: {
      preflight: false
    }
  }
  return config
}
