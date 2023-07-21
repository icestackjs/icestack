import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as sass from 'sass'
import postcss from 'postcss'
import postcssJs from 'postcss-js'
import klaw from 'klaw'
import tailwindcss from 'tailwindcss'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function ensureDir(p: string) {
  try {
    await fs.access(p)
  } catch {
    await fs.mkdir(p, {
      recursive: true
    })
  }
}

async function main() {
  const assetsDir = path.resolve(__dirname, '../assets')
  const scssDir = path.resolve(assetsDir, 'scss')
  const jsDir = path.resolve(assetsDir, 'js')
  const cssDir = path.resolve(assetsDir, 'css')
  await ensureDir(jsDir)
  await ensureDir(cssDir)
  for await (const file of klaw(scssDir)) {
    if (file.stats.isFile() && /\.scss$/.test(file.path)) {
      const result = sass.compile(file.path)
      // console.log(result)
      const relPath = path.relative(scssDir, file.path)
      const cssPath = path.resolve(cssDir, relPath)
      await ensureDir(path.dirname(cssPath))
      await fs.writeFile(cssPath.replace(/scss$/, 'css'), result.css, 'utf8')

      const jsPath = path.resolve(jsDir, relPath)
      await ensureDir(path.dirname(jsPath))
      const { css } = await postcss([
        tailwindcss({
          content: [{ raw: '' }],
          theme: {
            extend: {
              // inherit: 'inherit',
              // current: 'currentColor',
              // transparent: 'transparent',
              // black: '#000',
              // white: '#fff',
              primary: 'rgb(var(--primary) / <alpha-value>)',
              success: 'rgb(var(--success) / <alpha-value>)',
              error: 'rgb(var(--error) / <alpha-value>)',
              warning: 'rgb(var(--warning) / <alpha-value>)',
              'primary-content': 'rgb(var(--primary-color) / <alpha-value>)'
            }
          },
          corePlugins: {
            preflight: false
          }
        })
        // @tailwind base;\n
        // @ts-ignore
      ]).process('@tailwind components;\n@tailwind utilities;\n' + result.css)
      const root = postcss.parse(css)

      const data = 'module.exports = ' + JSON.stringify(postcssJs.objectify(root), null, 2)
      await fs.writeFile(jsPath.replace(/scss$/, 'js'), data, 'utf8')
      // console.log(t)
      // result.css
    }
  }
}

main()
