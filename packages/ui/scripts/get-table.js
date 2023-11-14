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
  fs.writeFileSync(
    path.resolve(__dirname, 'table.js'),
    `module.exports = ` +
      serialize(result, {
        space: 2
      }),
    'utf8'
  )
  return result
}

main()
