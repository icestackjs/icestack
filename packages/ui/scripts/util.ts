import postcss from 'postcss'
import tailwindcss from 'tailwindcss'

export async function getCss() {
  const { css } = await postcss([
    tailwindcss({
      content: [{ raw: '' }]
      // theme: {
      //   extend: {
      //     // inherit: 'inherit',
      //     // current: 'currentColor',
      //     // transparent: 'transparent',
      //     // black: '#000',
      //     // white: '#fff',
      //     primary: 'rgb(var(--primary) / <alpha-value>)',
      //     success: 'rgb(var(--success) / <alpha-value>)',
      //     error: 'rgb(var(--error) / <alpha-value>)',
      //     warning: 'rgb(var(--warning) / <alpha-value>)',
      //     'primary-content': 'rgb(var(--primary-color) / <alpha-value>)'
      //   }
      // },
      // corePlugins: {
      //   preflight: false
      // }
    })
    // @ts-ignore
  ]).process('@tailwind base;\n@tailwind components;\n@tailwind utilities;\n}')
}
