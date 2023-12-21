const fs = require('node:fs/promises')
const path = require('node:path')
// const jb = require('js-beautify')
const { upperFirst, kebabCase } = require('lodash')
const dedent = require('dedent')
const { getDefaultBase, defaultSelectorMap } = require('@icestack/ui/defaults')
const { schemaMap } = require('@icestack/ui/components')
const i18n = require('../i18n')
const { createT, groupedComponents } = require('./i18n')
const componentsDir = path.resolve(__dirname, '../pages/components')
const { JSONStringify } = require('./utils')
const defaultBase = getDefaultBase()
const types = Object.keys(defaultBase.themes.light.types)

function resolve(...args) {
  return path.resolve(componentsDir, ...args)
}

function generateMetaJson(options) {
  const { local } = options
  const t = createT(local)
  const isZh = local === 'zh-CN'
  return groupedComponents.reduce(
    (acc, [groupName, componentNames]) => {
      if (componentNames.length > 0) {
        const key = `-- ${groupName}`

        acc[key] = {
          type: 'separator',
          title: t(groupName)
        }
        // acc[key].display = 'hidden'
        for (const componentName of componentNames) {
          acc[componentName] = isZh ? upperFirst(componentName) + ' ' + t(componentName) : upperFirst(componentName)
        }
      }

      return acc
    },
    {
      overview: t('overview')
    }
  )
}

function generateOverview(options) {
  const { local } = options
  const t = createT(local)
  const isZh = local === 'zh-CN'
  return groupedComponents.reduce((acc, [groupName, componentNames]) => {
    if (componentNames.length > 0) {
      acc.push('\n' + t(groupName))

      for (const componentName of componentNames) {
        acc.push(`- [${isZh ? upperFirst(componentName) + ' ' + t(componentName) : upperFirst(componentName)}](./${componentName})`)
      }
    }

    return acc
  }, [])
}

async function main() {
  for (const local of i18n.locales) {
    const t = createT(local)
    // const overview = []
    for (const [groupName, componentNames] of groupedComponents) {
      // overview.push('\n' + groupName)
      for (const componentName of componentNames) {
        if (schemaMap[componentName] === undefined) {
          console.error(`componentName: ${componentName} has no schema!`)
          continue
        }
        // overview.push(`- [${componentName}](./${componentName})`)
        const p = schemaMap[componentName].schema({
          selector: defaultSelectorMap[componentName]?.selector,
          types
        })
        const codeString = JSONStringify(p) // format(serialize(p))
        await fs.writeFile(
          resolve(`${componentName}.${local}.mdx`),
          dedent`
  import CssTable from '../../components/CssTable'
  
  ## ${t('Class Table')}
  
  <CssTable name="${componentName}" />
  
  ## ${t('Demo and Playground')}
  
  [${t('Go to Storybook')}](https://story.ui.icebreaker.top/?path=/docs/${kebabCase(groupName)}-${componentName}--docs)
  
  ## ${t('Css Schema')}
  
  \`\`\`json
  ${codeString}
  \`\`\`
        `
        )
      }
    }
    await fs.writeFile(resolve(`_meta.${local}.json`), JSONStringify(generateMetaJson({ local })))
    await fs.writeFile(resolve(`overview.${local}.mdx`), generateOverview({ local }).join('\n'))
  }
}

main()
