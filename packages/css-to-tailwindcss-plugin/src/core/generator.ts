import * as t from '@babel/types'
import babelGenerate from '@babel/generator'
import type { Node, Rule } from 'postcss'
import type { GeneratorOptions } from '@babel/generator'
import { layerNodesKeys } from '../constants'
import type { LayerEnumType } from '../constants'
import type { BaseContext } from './base-context'
// addBase, addComponents, addUtilities, theme, addVariant, config, corePlugins, e, matchComponents, matchUtilities, matchVariant
// https://github.com/tailwindlabs/tailwindcss/blob/master/src/lib/setupContextUtils.js#L287
// resolveThemeValue
// https://github.com/tailwindlabs/tailwindcss/blob/master/src/util/transformThemeValue.js
const expandAST = ['addBase', 'addComponents', 'addUtilities', 'theme', 'addVariant', 'config', 'corePlugins', 'e', 'matchComponents', 'matchUtilities', 'matchVariant'].map(
  (x) => {
    // key : value
    return t.objectProperty(t.identifier(x), t.identifier(x))
  }
)

function expandAPI() {
  return expandAST
}

export function unwrapThemeFunctionArg(str: string) {
  if (str) {
    const start = str[0]
    const last = str.at(-1)
    if ((start === '"' && last === '"') || (start === "'" && last === "'")) {
      return str.slice(1, -1)
    }
  }
  return str
}

function makeObjectProperty(key: string, value: t.Expression | t.PatternLike) {
  return t.objectProperty(t.stringLiteral(key), value)
}

function addSuffix(value: string, important: boolean) {
  if (typeof value === 'string') {
    return value + (important ? ' !important' : '')
  }
  return value
}

function makeObjectExpression(nodes: Node[]): t.ObjectProperty[] {
  // console.log(nodes)
  // @apply
  // theme('colors.white');

  // theme: <TDefaultValue = Config['theme']>(
  //   path?: string,
  //   defaultValue?: TDefaultValue
  // ) => TDefaultValue

  // css
  // https://github.com/tailwindlabs/tailwindcss/blob/master/src/lib/evaluateTailwindFunctions.js

  // plugin
  // https://github.com/tailwindlabs/tailwindcss/blob/master/src/util/createPlugin.js
  // https://github.com/tailwindlabs/tailwindcss/blob/master/src/lib/setupContextUtils.js#L298
  // resolvePlugins
  // const rawObj = nodes.reduce<Record<string, Record<string, any>>>((acc, _cur) => {
  //   if (_cur.type === 'rule') {
  //     const cur = _cur as Rule
  //     const selector = cur.selector
  //     if (acc[selector]) {
  //       cur.nodes.reduce()
  //     } else {
  //       acc[selector] = {}
  //     }
  //   }
  //   return acc
  // }, {})

  const res = nodes.reduce<Record<string, t.ObjectProperty[]>>((acc, _cur) => {
    if (_cur.type === 'rule') {
      const cur = _cur as Rule
      const key = cur.selector
      const value = cur.nodes.reduce<Record<string, t.BinaryExpression | t.StringLiteral | t.TemplateLiteral | t.CallExpression>>((cacc, ccur) => {
        if (ccur.type === 'decl') {
          const v = ccur.value
          const important = ccur.important
          const prop = ccur.prop
          // https://tailwindcss.com/docs/adding-custom-styles#adding-component-classes
          // https://tailwindcss.com/docs/functions-and-directives#theme
          const arr = [...v.matchAll(/theme\(([^()]+?)\)/g)]
          if (arr.length > 0) {
            // if (arr.length === 1) {
            const first = arr[0]
            if (first[0] === v) {
              const ccc = t.callExpression(t.identifier('theme'), [t.stringLiteral(unwrapThemeFunctionArg(first[1]))])
              cacc[prop] = important ? t.binaryExpression('+', ccc, t.stringLiteral(' !important')) : ccc
            } else {
              let p = 0
              const quasis: t.TemplateElement[] = []
              const expressions: (t.Expression | t.TSType)[] = []
              // const astP = t.templateLiteral([t.templateElement({ raw: 'calc(100vh - ' })], [t.callExpression(t.identifier('theme'), [t.stringLiteral('spacing.12')])])
              for (let i = 0; i < arr.length; i++) {
                const hit = arr[i]
                if (typeof hit.index === 'number') {
                  const raw = v.slice(p, hit.index)
                  p = hit.index + hit[0].length
                  // const scope = v.slice(hit.index, p)
                  quasis.push(t.templateElement({ raw }))
                  expressions.push(t.callExpression(t.identifier('theme'), [t.stringLiteral(unwrapThemeFunctionArg(hit[1]))]))
                  if (i === arr.length - 1) {
                    quasis.push(t.templateElement({ raw: addSuffix(v.slice(p), important) }))
                  }
                }
              }
              cacc[prop] = t.templateLiteral(quasis, expressions)
            }
          } else {
            cacc[prop] = t.stringLiteral(addSuffix(v, important))
          }
        }
        return cacc //
      }, {})

      // merge the same selector
      if (acc[key]) {
        acc[key].push(
          ...Object.entries(value).map(([prop, value]) => {
            return makeObjectProperty(prop, value)
          })
        )
      } else {
        acc[key] = Object.entries(value).map(([prop, value]) => {
          return makeObjectProperty(prop, value)
        })
      }
    }

    return acc
  }, {})

  return Object.entries(res).map(([key, value]) => {
    return t.objectProperty(
      t.stringLiteral(key),
      t.objectExpression(
        Object.values(
          value.reduce<Record<string, t.ObjectProperty>>((acc, cur) => {
            if (cur.key.type === 'StringLiteral') {
              acc[cur.key.value] = cur
            }
            return acc
          }, {})
        )
      )
    )
  })
}

function getVarName(layer: LayerEnumType) {
  return `_${layer}Css`
}

const pluginNameMap: Record<LayerEnumType, string> = {
  base: 'addBase',
  components: 'addComponents',
  utilities: 'addUtilities'
}

function getFnName(key: LayerEnumType) {
  return pluginNameMap[key]
}

function getLegacyStatement(key: LayerEnumType, ctx: BaseContext) {
  return t.expressionStatement(t.callExpression(t.identifier(getFnName(key)), [t.objectExpression(makeObjectExpression(ctx.getNodes(key)))]))
}

const returnSelfArrowFnAst = t.arrowFunctionExpression([t.identifier('x')], t.identifier('x'))

const declReturnSelfArrowFnName = 'returnSelfNoop'

const declReturnSelfArrowFnAst = t.variableDeclaration('const', [t.variableDeclarator(t.identifier(declReturnSelfArrowFnName), returnSelfArrowFnAst)])

export function createGenerator() {
  // note equal 'plugin'
  const callFnId = '_plugin'
  const pluginName = 'css2TwPlugin'
  const withOptionsParamsId = '_options'
  const traverseMethodName = 'withOptionsWalkCSSRuleObject'
  const requireStatement = t.variableDeclaration('const', [
    t.variableDeclarator(t.identifier(callFnId), t.callExpression(t.identifier('require'), [t.stringLiteral('tailwindcss/plugin')]))
  ])
  const exportsStatement = t.expressionStatement(t.assignmentExpression('=', t.memberExpression(t.identifier('module'), t.identifier('exports')), t.identifier(pluginName)))

  function getLatestStatement(key: LayerEnumType, ctx: BaseContext) {
    const varName = getVarName(key)
    const fnName = getFnName(key)
    return [
      t.variableDeclaration('const', [
        t.variableDeclarator(
          t.identifier(varName),
          t.callExpression(t.identifier(traverseMethodName), [t.objectExpression(makeObjectExpression(ctx.getNodes(key))), t.stringLiteral(key)])
        )
      ]),
      t.expressionStatement(t.callExpression(t.identifier(fnName), [t.identifier(varName)]))
    ]
  }
  function generate(ctx: BaseContext, opt?: GeneratorOptions) {
    function getPluginBody() {
      const statements = ctx.options?.withOptions
        ? layerNodesKeys.flatMap((layer) => {
            return getLatestStatement(layer, ctx)
          })
        : layerNodesKeys.map((layer) => {
            return getLegacyStatement(layer, ctx)
          })

      const innerPluginAst = t.functionExpression(
        null,
        [t.objectPattern(expandAPI())],

        t.blockStatement(statements)
      )
      if (ctx.options?.withOptions) {
        return t.callExpression(t.memberExpression(t.identifier(callFnId), t.identifier('withOptions')), [
          t.functionExpression(
            null,
            [t.assignmentPattern(t.identifier(withOptionsParamsId), t.objectExpression([]))],
            t.blockStatement([
              // const { withOptionsWalkCSSRuleObject = (x)=>x } = _options
              t.variableDeclaration('const', [
                t.variableDeclarator(
                  t.objectPattern([
                    t.objectProperty(t.identifier(traverseMethodName), t.assignmentPattern(t.identifier(traverseMethodName), t.identifier(declReturnSelfArrowFnName)))
                  ]),
                  t.identifier(withOptionsParamsId)
                )
              ]),
              t.returnStatement(innerPluginAst)
            ])
          ),
          t.functionExpression(null, [t.identifier(withOptionsParamsId)], t.blockStatement([t.returnStatement(t.objectExpression([]))]))
        ])
      }
      return t.callExpression(t.identifier(callFnId), [innerPluginAst])
    }

    const ast = t.file(
      t.program([requireStatement, declReturnSelfArrowFnAst, t.variableDeclaration('const', [t.variableDeclarator(t.identifier(pluginName), getPluginBody())]), exportsStatement])
    )
    const res = babelGenerate(ast, opt)
    return res.code
  }
  return {
    generate
  }
}
