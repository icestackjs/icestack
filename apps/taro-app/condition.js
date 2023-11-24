const { names } = require('@icestack/ui/components')
const fs = require('fs')
const path = require('path')
const { set, orderBy } = require('lodash')


async function main() {
  const jp = path.resolve(__dirname, './project.private.config.json')
  const j = JSON.parse(fs.readFileSync(jp, 'utf8'))
  set(j, 'condition.miniprogram.list', orderBy(names).map(x => {
    return {
      "name": x,
      "pathName": "pages/index/component",
      "query": "id=" + x,
      "launchMode": "default",
      "scene": null
    }
  }))

  fs.writeFileSync(jp, JSON.stringify(j), 'utf8')
}

main()
