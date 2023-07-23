import postcss from 'postcss'
import tailwindcss from 'tailwindcss'

export async function getCss() {
  const res = await postcss([
    tailwindcss({
      content: [{ raw: '' }]
    })
    // @ts-ignore
  ]).process('@tailwind base;\n@tailwind components;\n@tailwind utilities;\n}')
  return res
}
