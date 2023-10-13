import { Declaration } from 'postcss'

export const PropResolvedMarkSymbol = Symbol('PropResolved')

export const ValueResolvedMarkSymbol = Symbol('ValueResolved')

export function addMark(decl: Declaration, mark: symbol) {
  Reflect.defineProperty(decl, mark, {
    enumerable: false,
    value: true,
    configurable: true,
    writable: true
  })
}

export function getMark(decl: Declaration, mark: symbol): boolean | undefined {
  return Reflect.get(decl, mark)
}
