const path = require('node:path')
const fs = require('node:fs')

function main() {
  const p = path.resolve(__dirname, '../packages')
  const target = path.resolve(__dirname, '../packages/ui/README.md')
  const dirs = fs.readdirSync(p)
  for (const name of dirs) {
    const dir = path.resolve(p, name)
    const stat = fs.statSync(dir)
    if (stat.isDirectory() && name !== 'ui') {
      fs.copyFileSync(target, path.resolve(dir, 'README.md'))
      console.log(`${name} successfully!`)
    }
  }
}

main()
