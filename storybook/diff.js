const fs = require('node:fs')
const path = require('node:path')
const klaw = require('klaw-sync')
const { lowerFirst, without } = require('lodash')
const { group } = require('./group.js')

function getMap(base) {
  switch (base) {
    case 'DataEntry': {
      return 'Data Entry'
    }
    case 'DataDisplay': {
      return 'Data Display'
    }
    default: {
      return base
    }
  }
}

function main() {
  const componentsPath = path.resolve(__dirname, './stories/components')
  const dirs = klaw(componentsPath, {
    nodir: true,
  })
  for (const { path: p, stats } of dirs) {
    if (stats.isFile() && /stories\.ts$/.test(p)) {
      const arr = path.relative(componentsPath, p).split(path.sep)
      const base = arr[0].replace(/^\d\./, '')
      const componentName = arr[1].replace(/\.stories\.ts$/, '')
      // const base = path.basename(p)
      // console.log(base, componentName)
      const hit = group[getMap(base)]
      if (Array.isArray(hit)) {
        const idx = hit.indexOf(lowerFirst(componentName))
        if (idx > -1) {
          hit.splice(idx, 1)
        }
      }
      //
      // console.log()
    }
    // const pp = path.relative(componentsPath, p)
  }
  console.log(group)
}

main()
