const fs = require('node:fs')
const path = require('node:path')
const parser = require('postcss-selector-parser')
const postcss = require('postcss')
const serialize = require('serialize-javascript')
const components = require('../assets/js/components')
// parser().processSync()

function getSelectors(obj) {
  const sss = Object.keys(obj)
  const res = new Set()
  for (const ss of sss) {
    parser((selectors) => {
      selectors.walk((selector) => {
        if (selector.type === 'class') {
          res.add(selector.value)
        }
      })
    }).processSync(ss)
  }

  return res
}
const root = path.resolve(__dirname, '../../../')
function main() {
  const result = {}
  for (const [name, { base, styled, utils }] of Object.entries(components)) {
    const baseSet = getSelectors(base)
    result[name] = {
      base: [...baseSet],
      styled: [...getSelectors(styled)].filter((x) => {
        return !baseSet.has(x)
      }),
      utils: [...getSelectors(utils)]
    }
  }

  const p = path.resolve(__dirname, 'table.js')
  fs.writeFileSync(
    p,
    `module.exports = ` +
      serialize(result, {
        space: 2
      }),
    'utf8'
  )

  fs.copyFileSync(p, path.resolve(root, 'storybook/table.js'))
  fs.copyFileSync(p, path.resolve(root, 'website/table.js'))
  fs.copyFileSync(p, path.resolve(root, 'apps/taro-app/src/table.js'))
  fs.copyFileSync(p, path.resolve(root, 'packages/cva/src/table.js'))
  return result
}

main()
