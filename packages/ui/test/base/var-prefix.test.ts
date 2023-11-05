import path from 'node:path'
import { createContext } from '@/context'
import { scssDir } from '@/dirs'
import { getCodegenOptions } from '@/options'

export function resolve(filename: string) {
  return path.resolve(scssDir, 'base', filename + '.scss')
}

describe('var-prefix', () => {
  it('snap case 0', () => {
    const ctx = createContext(getCodegenOptions({}))
    const { css } = ctx.compileScss(resolve('index'))
    expect(css).toMatchSnapshot()
  })

  it('snap case 1', () => {
    const ctx = createContext(
      getCodegenOptions({
        varPrefix: '--som-'
      })
    )
    const { css } = ctx.compileScss(resolve('index'))
    expect(css).toMatchSnapshot()
  })
})
