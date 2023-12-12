import defu from 'defu'
import tableData from '@/table.js'
import { ComponentNames, CreateTailwindcssContentOptions } from '@/types'
import { addPrefix } from '@/shared'

export function getOptions(opts: CreateTailwindcssContentOptions = {}) {
  const options: CreateTailwindcssContentOptions = defu<CreateTailwindcssContentOptions, CreateTailwindcssContentOptions[]>(opts, {
    prefix: ''
  })
  return options
}

export function isComponentIncluded(componentName: string, components: CreateTailwindcssContentOptions['components']) {
  if (!components) {
    return true
  }
  if (components[componentName as ComponentNames] === false) {
    return false
  }
  return true
}

export function createTailwindcssContent(opts: CreateTailwindcssContentOptions = {}): { raw: string; extension?: string } {
  const { prefix, components } = getOptions(opts)
  return {
    raw: Object.entries(tableData)
      .reduce<string[]>((acc, [name, { base, styled, utils }]) => {
        if (isComponentIncluded(name, components)) {
          acc.push(...addPrefix(prefix, base))
          acc.push(...addPrefix(prefix, styled))
          acc.push(...addPrefix(prefix, utils))
        }
        return acc
      }, [])
      .join(' ')
  }
}

export const removeAllComponents = Object.keys(tableData).reduce<Record<string, false>>((acc, cur) => {
  acc[cur] = false
  return acc
}, {})
