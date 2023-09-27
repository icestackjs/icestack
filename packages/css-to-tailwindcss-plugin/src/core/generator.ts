import * as t from '@babel/types'
import babelGenerate from '@babel/generator'
import type { Node, Rule } from 'postcss'
import type { GeneratorOptions } from '@babel/generator'
import { IContext } from './context'
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

  const res = nodes.reduce<Record<string, t.ObjectProperty[]>>((acc, _cur) => {
    if (_cur.type === 'rule') {
      const cur = _cur as Rule
      const key = cur.selector
      const value = cur.nodes.reduce<t.ObjectProperty[]>((cacc, ccur) => {
        if (ccur.type === 'decl') {
          const v = ccur.value
          // https://tailwindcss.com/docs/adding-custom-styles#adding-component-classes
          // https://tailwindcss.com/docs/functions-and-directives#theme
          const arr = [...v.matchAll(/theme\(([^()]+?)\)/g)]
          if (arr.length > 0) {
            // if (arr.length === 1) {
            const first = arr[0]
            if (first[0] === v) {
              cacc.push(makeObjectProperty(ccur.prop, t.callExpression(t.identifier('theme'), [t.stringLiteral(unwrapThemeFunctionArg(first[1]))])))
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
                    quasis.push(t.templateElement({ raw: v.slice(p) }))
                  }
                }
              }

              cacc.push(makeObjectProperty(ccur.prop, t.templateLiteral(quasis, expressions)))
            }
          } else {
            cacc.push(makeObjectProperty(ccur.prop, t.stringLiteral(v)))
          }
        }
        return cacc //
      }, [])

      // merge the same selector
      if (acc[key]) {
        acc[key].push(...value)
      } else {
        acc[key] = value
      }
    }

    return acc
  }, {})

  return Object.entries(res).map(([key, value]) => {
    return t.objectProperty(t.stringLiteral(key), t.objectExpression(value))
  })
}

export function createGenerator() {
  // note equal 'plugin'
  const callFnId = '_plugin'
  const pluginName = 'css2TwPlugin'
  const withOptionsParamsId = '_options'
  const requireStatement = t.variableDeclaration('const', [
    t.variableDeclarator(t.identifier(callFnId), t.callExpression(t.identifier('require'), [t.stringLiteral('tailwindcss/plugin')]))
  ])
  const exportsStatement = t.expressionStatement(t.assignmentExpression('=', t.memberExpression(t.identifier('module'), t.identifier('exports')), t.identifier(pluginName)))
  function generate(ctx: IContext, opt?: GeneratorOptions) {
    function getPluginBody() {
      const innerPluginAst = t.functionExpression(
        null,
        [t.objectPattern(expandAPI())],

        t.blockStatement([
          // addBase
          t.expressionStatement(t.callExpression(t.identifier('addBase'), [t.objectExpression(makeObjectExpression(ctx.getNodes('base')))])),
          // addComponents
          t.expressionStatement(t.callExpression(t.identifier('addComponents'), [t.objectExpression(makeObjectExpression(ctx.getNodes('components')))])),
          // addUtilities
          t.expressionStatement(t.callExpression(t.identifier('addUtilities'), [t.objectExpression(makeObjectExpression(ctx.getNodes('utilities')))]))
        ])
      )
      if (ctx.options.withOptions) {
        return t.callExpression(t.memberExpression(t.identifier(callFnId), t.identifier('withOptions')), [
          t.functionExpression(null, [t.identifier(withOptionsParamsId)], t.blockStatement([t.returnStatement(innerPluginAst)])),
          t.functionExpression(null, [t.identifier(withOptionsParamsId)], t.blockStatement([t.returnStatement(t.objectExpression([]))]))
        ])
      }
      return t.callExpression(t.identifier(callFnId), [innerPluginAst])
    }

    const ast = t.file(t.program([requireStatement, t.variableDeclaration('const', [t.variableDeclarator(t.identifier(pluginName), getPluginBody())]), exportsStatement]))
    const res = babelGenerate(ast, opt)
    return res.code
  }
  return {
    generate
  }
}
