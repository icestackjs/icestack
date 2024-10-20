const path = require('node:path')

const componentsDir = path.resolve(__dirname, '../pages/components')
const demosDir = path.resolve(__dirname, '../components/demo')

const unocssVueDir = path.resolve(__dirname, '../../examples/unocss-sample-app/src/components')

function resolveComponent(...args) {
  return path.resolve(componentsDir, ...args)
}

function resolveDemo(...args) {
  return path.resolve(demosDir, ...args)
}

function resolveUnocssVueDir(...args) {
  return path.resolve(unocssVueDir, ...args)
}

module.exports = {
  componentsDir,
  demosDir,
  unocssVueDir,
  resolveComponent,
  resolveDemo,
  resolveUnocssVueDir,
}
