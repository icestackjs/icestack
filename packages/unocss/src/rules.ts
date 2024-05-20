import postcss from 'postcss'
import { type CssInJs, parse } from 'postcss-js'
import { mergeRClone } from '@icestack/shared'
import parser from 'postcss-selector-parser'
import { groupBy, requireLib } from './utils'

const replacePrefix = (css: string) => css.replaceAll('--tw-', '--un-')

const processor = postcss([
  {
    postcssPlugin: 'internal',
    Declaration(decl) {
      decl.prop = replacePrefix(decl.prop)
      decl.value = decl.value.replace(/rgba?\((.*?)\/(.*)\)/, (m, p1, p2) => {
        return replacePrefix(`rgba(${p1.trim()},${p2.trim()})`)
      })
    },
  },
])

const process = (object: CssInJs) => processor.process(object, { parser: parse })

const defaultParser = parser()

export function getRules(loadDirectory: string, keyframes: string[] = []) {
  const components = requireLib('js/components/index.cjs', loadDirectory) as Record<
    string,
    {
      base: Record<string, object>
      styled: Record<string, object>
      utils: Record<string, object>
    }
  >

  const utilities = requireLib('js/utilities/index.cjs', loadDirectory) as Record<string, Record<string, object>>
  const rules: [string, string][] = []

  function expand(nodes: postcss.Root[] | postcss.ChildNode[]) {
    if (Array.isArray(nodes)) {
      for (const r of nodes) {
        if (r.type === 'atrule') {
          if (r.name === 'keyframes') {
            keyframes.push(r.toString())
            continue
          }
          if (Array.isArray(r.nodes)) {
            for (const rr of r.nodes) {
              if (rr.type === 'rule') {
                const ast = defaultParser.astSync(rr.selector)
                const set = new Set<string>()
                ast.walkClasses((rule) => {
                  if (!set.has(rule.value)) {
                    set.add(rule.value)
                    rules.push([rule.value, r.toString()])
                  }
                })
              }
            }
          }
        }
        else if (r.type === 'rule') {
          const ast = defaultParser.astSync(r.selector)
          const set = new Set<string>()
          ast.walkClasses((rule) => {
            if (!set.has(rule.value)) {
              set.add(rule.value)
              rules.push([rule.value, r.toString()])
            }
          })
        }
      }
    }
  }

  for (const { base, styled, utils } of Object.values(components)) {
    const nodes = process(mergeRClone(base, styled, utils)).root.nodes
    expand(nodes)
  }
  for (const util of Object.values(utilities)) {
    const nodes = process(util).root.nodes
    expand(nodes)
  }

  const res = groupBy(
    rules,
    ([key]) => {
      return key
    },
    (x) => {
      return x[1]
    },
  )
  const rrr = Object.entries(res).map(([key, css]) => {
    return [key, css.join('\n')]
  })

  return rrr
}
