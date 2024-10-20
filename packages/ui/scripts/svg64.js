const { readFileSync, writeFileSync } = require('node:fs')
const { resolve, basename } = require('node:path')

const klaw = require('klaw-sync')
const { svg64 } = require('svg64')

const arr = klaw(resolve(__dirname, 'svg'))

const res = {
  loading: {},
}
const keys = {
  loading: [],
}

for (const { path } of arr) {
  const svg = readFileSync(path, 'utf8')
  const filename = basename(path, '.svg')
  const result = svg64(svg)
  res.loading[filename] = result
  keys.loading.push(filename)
}

writeFileSync(
  resolve(__dirname, '../src/components/assets/svg.json'),
  JSON.stringify(res, null, 2),
  //   `module.exports = {
  //   loading: ${JSON.stringify(res.loading, null, 2)}
  // }`
)

writeFileSync(
  resolve(__dirname, 'keys.json'),
  JSON.stringify(keys, null, 2),
  //   `module.exports = {
  //   loading: ${JSON.stringify(res.loading, null, 2)}
  // }`
)
