import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as sass from 'sass'
import postcss from 'postcss'
import klaw from 'klaw'

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
      // console.log(relPath)
      const targetPath = path.resolve(cssDir, relPath)
      await ensureDir(path.dirname(targetPath))
      const t = targetPath.replace(/scss$/, 'css')
      await fs.writeFile(t, result.css, 'utf8')
      console.log(t)
      // result.css
    }
  }
}

main()
