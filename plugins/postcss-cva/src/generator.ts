import _babelGenerate from '@babel/generator'
import * as t from '@babel/types'
import { defu } from '@icestack/shared'
// import type { VariantProps } from '@icestack/cva'
// https://github.com/babel/babel/issues/15269
function _interopDefaultCompat(e: any) {
  return e && typeof e === 'object' && 'default' in e ? e.default : e
}
export const babelGenerate = _interopDefaultCompat(_babelGenerate) as typeof _babelGenerate

function makeVariants(variants: Record<string, Record<string, string[]>>) {
  const properties = Object.entries(variants).map(([key, value]) => {
    return t.objectProperty(
      t.stringLiteral(key),
      t.objectExpression(
        Object.entries(value).map(([k, v]) => {
          return t.objectProperty(t.stringLiteral(k), t.arrayExpression(v.map(s => t.stringLiteral(s))))
        }),
      ),
    )
  })
  return t.objectExpression(properties)
}

function makeCompoundVariants(compoundVariants: Record<string, string | string[]>[]) {
  return t.arrayExpression(
    compoundVariants.map((x) => {
      const entries = Object.entries(x)
      return t.objectExpression(
        entries.map(([k, v]) => {
          if (!Array.isArray(v)) {
            v = [v]
          }
          return t.objectProperty(
            t.stringLiteral(k),
            t.arrayExpression(
              v.map((x) => {
                return t.stringLiteral(x)
              }),
            ),
          )
        }),
      )
    }),
  )
}

function makeDefaultVariants(defaultVariants: Record<string, string>) {
  return t.objectExpression(
    Object.entries(defaultVariants).map(([key, value]) => {
      return t.objectProperty(t.stringLiteral(key), t.stringLiteral(value))
    }),
  )
}

export function generateCva(options: {
  format?: 'js' | 'ts'
  importFrom?: string
  exports?: Partial<{
    base: boolean
    variants: boolean
    compoundVariants: boolean
    defaultVariants: boolean
  }>
  base: string[]
  variants: Record<string, Record<string, string[]>>
  compoundVariants: Record<string, string | string[]>[]
  defaultVariants: Record<string, string>
}) {
  const baseIdentifier = 'base'
  const variantsIdentifier = 'variants'
  const compoundVariantsIdentifier = 'compoundVariants'
  const defaultVariantsIdentifier = 'defaultVariants'
  const { base, compoundVariants, defaultVariants, format, importFrom, variants, exports } = defu(options, {
    format: 'ts',
    importFrom: 'class-variance-authority',
    base: [],
    variants: {},
    compoundVariants: [],
    defaultVariants: {},
    exports: {
      base: true,
      variants: true,
      compoundVariants: true,
      defaultVariants: true,
    },
  })
  const isTs = format === 'ts'
  const cvaFnName = 'index'
  const body: t.Statement[] = []

  // import
  const specifiers: t.ImportSpecifier[] = [t.importSpecifier(t.identifier('cva'), t.identifier('cva'))]
  if (isTs) {
    const variantPropsNode = t.importSpecifier(t.identifier('VariantProps'), t.identifier('VariantProps'))
    variantPropsNode.importKind = 'type'
    specifiers.push(variantPropsNode)
  }
  // import { cva, type VariantProps } from 'class-variance-authority'
  body.push(t.importDeclaration(specifiers, t.stringLiteral(importFrom)))
  // cva function

  const baseStringArrayExpression = t.arrayExpression(base.map(x => t.stringLiteral(x)))
  const variantsObjectExpression = makeVariants(variants)
  const compoundVariantsArrayExpression = makeCompoundVariants(compoundVariants)
  const defaultVariantsObjectExpression = makeDefaultVariants(defaultVariants)
  if (exports.base) {
    body.push(t.exportNamedDeclaration(t.variableDeclaration('const', [t.variableDeclarator(t.identifier(baseIdentifier), baseStringArrayExpression)])))
  }

  if (exports.variants) {
    body.push(t.exportNamedDeclaration(t.variableDeclaration('const', [t.variableDeclarator(t.identifier(variantsIdentifier), variantsObjectExpression)])))
  }

  if (exports.compoundVariants) {
    body.push(t.exportNamedDeclaration(t.variableDeclaration('const', [t.variableDeclarator(t.identifier(compoundVariantsIdentifier), compoundVariantsArrayExpression)])))
  }

  if (exports.defaultVariants) {
    body.push(t.exportNamedDeclaration(t.variableDeclaration('const', [t.variableDeclarator(t.identifier(defaultVariantsIdentifier), defaultVariantsObjectExpression)])))
  }

  function getConfigParams() {
    const result: t.ObjectProperty[] = []
    result.push(exports.variants ? t.objectProperty(t.identifier('variants'), t.identifier('variants')) : t.objectProperty(t.identifier('variants'), variantsObjectExpression))
    if (exports.compoundVariants) {
      const node = t.objectProperty(t.identifier('compoundVariants'), t.identifier('compoundVariants'))
      isTs && t.addComment(node, 'leading', ' @ts-ignore', true)
      result.push(node)
    }
    else {
      result.push(t.objectProperty(t.identifier('compoundVariants'), compoundVariantsArrayExpression))
    }
    if (exports.defaultVariants) {
      const node = t.objectProperty(t.identifier('defaultVariants'), t.identifier('defaultVariants'))
      isTs && t.addComment(node, 'leading', ' @ts-ignore', true)
      result.push(node)
    }
    else {
      result.push(t.objectProperty(t.identifier('defaultVariants'), defaultVariantsObjectExpression))
    }

    return result
  }
  // cva function
  body.push(
    t.variableDeclaration('const', [
      t.variableDeclarator(
        t.identifier(cvaFnName),
        t.callExpression(t.identifier('cva'), [
          // cva CallExpression args
          exports.base ? t.identifier(baseIdentifier) : baseStringArrayExpression,
          t.objectExpression(getConfigParams()),
        ]),
      ),
    ]),
  )
  // cva props
  // export type Props = VariantProps<typeof index>
  if (isTs) {
    body.push(
      t.exportNamedDeclaration(
        t.typeAlias(
          t.identifier('Props'),
          null,
          t.genericTypeAnnotation(t.identifier('VariantProps'), t.typeParameterInstantiation([t.typeofTypeAnnotation(t.genericTypeAnnotation(t.identifier(cvaFnName)))])),
        ),
      ),
    )
  }
  // export default index
  body.push(t.exportDefaultDeclaration(t.identifier(cvaFnName)))
  const ast = t.file(t.program(body))
  return babelGenerate(ast)
}
