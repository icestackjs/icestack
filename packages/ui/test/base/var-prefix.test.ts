import path from 'node:path'
import { compileScss } from '@/sass'
import { scssDir } from '@/dirs'
import { getCodegenOptions } from '@/options'

export function resolve(filename: string) {
  return path.resolve(scssDir, 'base', filename + '.scss')
}

describe('var-prefix', () => {
  it('snap case 0', async () => {
    const css = await compileScss(resolve('index'), getCodegenOptions({}))
    expect(css).toMatchSnapshot()
  })

  it('snap case 1', async () => {
    const css = await compileScss(
      resolve('index'),
      getCodegenOptions({
        varPrefix: '--som-'
      })
    )
    expect(css).toMatchSnapshot()
  })
})
