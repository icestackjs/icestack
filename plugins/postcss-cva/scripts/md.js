// cva-generate.zh-CN.mdx
// cva-generate.en-US.mdx
const fs = require('node:fs')
const path = require('node:path')

const websiteDir = path.resolve(__dirname, '../../../website')
const readme = path.resolve(__dirname, '../README.md')
fs.copyFileSync(readme, path.resolve(websiteDir, './pages/docs/cva-generate.en-US.md'))
fs.copyFileSync(readme, path.resolve(websiteDir, './pages/docs/cva-generate.zh-CN.md'))
