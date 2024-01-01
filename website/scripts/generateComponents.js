const fs = require('node:fs/promises')
const fss = require('node:fs')
const path = require('node:path')
const prettier = require('prettier')
// const jb = require('js-beautify')
const { upperFirst, kebabCase } = require('lodash')

// const dedent = require('dedent')
// const { getDefaultBase, defaultSelectorMap } = require('@icestack/ui/defaults')
// const { schemaMap } = require('@icestack/ui/components')
const { createContext } = require('@icestack/ui')
const i18n = require('../i18n')
const { resolveComponent, resolveDemo } = require('./dirs')
const { createT, groupedComponents } = require('./i18n')
const { JSONStringify } = require('./utils')
// const defaultBase = getDefaultBase()
// const types = Object.keys(defaultBase.themes.light.types)

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
  const ctx = createContext({
    dryRun: true,
    log: false
  })
  const map = await ctx.buildComponents()
  const CssSchemaNames = ['base', 'styled', 'utils']
  for (const local of i18n.locales) {
    const t = createT(local)
    // const overview = []
    for (const [groupName, componentNames] of groupedComponents) {
      // overview.push('\n' + groupName)
      for (const componentName of componentNames) {
        // if (schemaMap[componentName] === undefined) {
        //   console.error(`componentName: ${componentName} has no schema!`)
        //   continue
        // }
        const hit = map[componentName]
        // overview.push(`- [${componentName}](./${componentName})`)
        // const p = schemaMap[componentName].schema({
        //   selector: defaultSelectorMap[componentName]?.selector,
        //   types
        // })
        const demoPath = resolveDemo(componentName, 'index.mdx')
        const flag = fss.existsSync(demoPath)
        if (!flag) {
          try {
            fss.mkdirSync(path.dirname(demoPath))
          } catch {}

          fss.writeFileSync(demoPath, `import CodeRender from '../../CodeRender'\n`, 'utf8')
        }
        // `## ${t('Playground')}

        // [${t('Go to Storybook')}](https://story.ui.icebreaker.top/?path=/docs/${kebabCase(groupName)}-${componentName}--docs)`
        const cssSchemaString = hit
          ? (
              await Promise.all(
                CssSchemaNames.map(async (x) => {
                  const css = await prettier.format(hit[x].css, {
                    parser: 'css',
                    tabWidth: 2,
                    htmlWhitespaceSensitivity: 'ignore',
                    printWidth: 100
                  })
                  return `
### ${upperFirst(x)}

<div className="collapse">
<input type="checkbox" /> 
<div class="collapse-title px-0">
<span class="btn">Click to Show ${upperFirst(x)} Schema</span>
</div>
<div class="collapse-content"> 

\`\`\`css
${css}
\`\`\`

</div>
</div>

`
                })
              )
            ).join('\n')
          : ''
        // format(serialize(p))
        await fs.writeFile(
          resolveComponent(`${componentName}.${local}.mdx`),
          `
import CssTable from '../../components/CssTable'
${flag ? `import Demo from '../../components/demo/${componentName}/index.mdx'` : ''}

## ${t('Class Table')}
  
<CssTable name="${componentName}" />
  
${
  flag
    ? `## ${t('Demo')}
  
<Demo></Demo>`
    : ''
}
  
## ${t('Css Schema')}

${cssSchemaString}

`
        )
      }
    }
    await fs.writeFile(resolveComponent(`_meta.${local}.json`), JSONStringify(generateMetaJson({ local })))
    await fs.writeFile(resolveComponent(`overview.${local}.mdx`), generateOverview({ local }).join('\n'))
  }
}

main()
