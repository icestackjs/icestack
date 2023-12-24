const path = require('node:path')

const componentsDir = path.resolve(__dirname, '../pages/components')
const demosDir = path.resolve(__dirname, '../components/demo')

function resolveComponent(...args) {
  return path.resolve(componentsDir, ...args)
}

function resolveDemo(...args) {
  return path.resolve(demosDir, ...args)
}

module.exports = {
  componentsDir,
  demosDir,
  resolveComponent,
  resolveDemo
}
