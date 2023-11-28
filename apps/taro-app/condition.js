const { names } = require('@icestack/ui/components')
const fs = require('fs')
const path = require('path')
const { set, orderBy } = require('lodash')


async function main() {
  const jp = path.resolve(__dirname, './project.private.config.json')
  const j = JSON.parse(fs.readFileSync(jp, 'utf8'))
  const items = orderBy(names).map(x => {
    return {
      "name": x,
      "pathName": "pages/index/component",
      "query": "id=" + x,
      "launchMode": "default",
      "scene": null
    }
  })
  items.unshift({
    "name": "Docs",
    "pathName": "pages/index/doc",
    "query": "id=" + 'introduction',
    "launchMode": "default",
    "scene": null
  })
  set(j, 'condition.miniprogram.list', items)

  fs.writeFileSync(jp, JSON.stringify(j, null, 2), 'utf8')
}

main()
