import * as t from '@babel/types'
import _babelGenerate from '@babel/generator'
import { stages } from '@icestack/shared/constants'
// https://github.com/babel/babel/issues/15269
function _interopDefaultCompat(e: any) {
  return e && typeof e === 'object' && 'default' in e ? e.default : e
}
export const babelGenerate = _interopDefaultCompat(_babelGenerate) as typeof _babelGenerate

export function generateIndexCode(basenames: string[], type: 'components' | 'utilities' = 'components') {
  if (type === 'components') {
    const props = Object.entries(
      basenames.reduce<Record<string, t.ObjectProperty[]>>((acc, name) => {
        for (const stage of stages) {
          const node = t.objectProperty(t.stringLiteral(stage), t.callExpression(t.identifier('require'), [t.stringLiteral(`./${name}/${stage}.cjs`)]))
          if (acc[name]) {
            acc[name].push(node)
          } else {
            acc[name] = [node]
          }
        }
        return acc
      }, {})
    ).map(([key, props]) => {
      return t.objectProperty(t.stringLiteral(key), t.objectExpression(props))
    })

    const ast = t.file(
      t.program([t.expressionStatement(t.assignmentExpression('=', t.memberExpression(t.identifier('module'), t.identifier('exports')), t.objectExpression(props)))])
    )

    return babelGenerate(ast).code
  } else {
    const props = basenames.map((basename) => {
      return t.objectProperty(t.stringLiteral(basename), t.callExpression(t.identifier('require'), [t.stringLiteral(`./${basename}.cjs`)]))
    })

    const ast = t.file(
      t.program([t.expressionStatement(t.assignmentExpression('=', t.memberExpression(t.identifier('module'), t.identifier('exports')), t.objectExpression(props)))])
    )

    return babelGenerate(ast).code
  }
}

export function generateCva({ format }: { format: 'js' | 'ts' }) {}
