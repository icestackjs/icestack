import tableData from '@/table.js'

export function createTailwindcssContent(): { raw: string; extension?: string } {
  return {
    raw: Object.entries(tableData)
      .reduce<string[]>((acc, [, { base, styled, utils }]) => {
        acc.push(...base)
        acc.push(...styled)
        acc.push(...utils)
        return acc
      }, [])
      .join(' ')
  }
}
