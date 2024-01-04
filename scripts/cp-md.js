const path = require('node:path')
const fs = require('node:fs')

function render(target, dirPath) {
  const dirs = fs.readdirSync(dirPath)
  for (const name of dirs) {
    const dir = path.resolve(dirPath, name)
    const stat = fs.statSync(dir)
    if (stat.isDirectory()) {
      let data = fs.readFileSync(target, 'utf8')
      const templatePath = path.resolve(dir, 'T.md')
      if (fs.existsSync(templatePath)) {
        const template = fs.readFileSync(templatePath, 'utf8')
        data = data.replace('{{replace}}', template)
      } else {
        data = data.replace('{{replace}}', '')
      }

      fs.writeFileSync(path.resolve(dir, 'README.md'), data, 'utf8')

      // fs.copyFileSync(target, path.resolve(dir, 'README.md'))
      console.log(`${name} successfully!`)
    }
  }
}

function main() {
  const packagesPath = path.resolve(__dirname, '../packages')
  const presetsPath = path.resolve(__dirname, '../presets')
  const target = path.resolve(__dirname, '../packages/ui/BASE.md')
  render(target, packagesPath)
  render(target, presetsPath)
}

main()
