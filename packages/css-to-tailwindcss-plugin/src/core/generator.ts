import * as t from '@babel/types'
import babelGenerate from '@babel/generator'
// addBase, addComponents, addUtilities, theme, addVariant, config, corePlugins, e, matchComponents, matchUtilities, matchVariant

function expandAPI() {
  return ['addBase', 'addComponents', 'addUtilities', 'theme', 'addVariant', 'config', 'corePlugins', 'e', 'matchComponents', 'matchUtilities', 'matchVariant'].map((x) => {
    return t.objectProperty(t.identifier(x), t.identifier(x))
  })
}

function makeObjectExpression() {
  return [
    // h1: {
    //   fontSize: theme('fontSize.2xl')
    // },
    t.objectProperty(
      t.identifier('h1'),
      t.objectExpression(
        // add css objectProperty here
        [
          t.objectProperty(
            t.identifier('fontSize'),
            // value
            // use theme('fontSize.2xl')
            t.callExpression(t.identifier('theme'), [t.stringLiteral('fontSize.2xl')])
          )
        ]
      )
    ),
    // '.content-auto': {
    //   contentVisibility: 'auto'
    // }
    // 可能都用字符串比较好
    t.objectProperty(
      t.stringLiteral('.content-auto'),
      t.objectExpression(
        // add css objectProperty here
        [
          t.objectProperty(
            t.identifier('contentVisibility'),
            // value
            t.stringLiteral('auto')
          )
        ]
      )
    )
  ]
}

export function createGenerator() {
  // note equal 'plugin'
  const pluginName = 'css2TwPlugin'
  const requireStatement = t.variableDeclaration('const', [t.variableDeclarator(t.identifier('plugin'))])

  const exportsStatement = t.expressionStatement(t.assignmentExpression('=', t.memberExpression(t.identifier('module'), t.identifier('exports')), t.identifier(pluginName)))
  return function generate() {
    const ast = t.file(
      t.program([
        requireStatement,
        t.variableDeclaration('const', [
          t.variableDeclarator(
            t.identifier(pluginName),
            t.callExpression(t.identifier('plugin'), [
              t.functionExpression(
                null,
                [t.objectPattern(expandAPI())],

                t.blockStatement([
                  // addBase
                  t.expressionStatement(t.callExpression(t.identifier('addBase'), [t.objectExpression([])])),
                  // addComponents
                  t.expressionStatement(t.callExpression(t.identifier('addComponents'), [t.objectExpression([])])),
                  // addUtilities
                  t.expressionStatement(t.callExpression(t.identifier('addUtilities'), [t.objectExpression([])]))
                ])
              )
            ])
          )
        ]),
        exportsStatement
      ])
    )
    const res = babelGenerate(ast)
    return res.code
  }
}
