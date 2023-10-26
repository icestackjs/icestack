import path from 'node:path'
import { compileScss } from '@/sass'
import { scssDir } from '@/dirs'
import { getCodegenOptions } from '@/options'

export function resolve(filename: string) {
  return path.resolve(scssDir, 'base', filename + '.scss')
}

describe('base', () => {
  it('snap', () => {
    const result = compileScss(resolve('index'), getCodegenOptions())
    expect(result.css).toMatchSnapshot()
  })

  it('snap case 1', async () => {
    const { css } = await compileScss(
      resolve('index'),
      getCodegenOptions({
        base: {
          selector: {
            light: '.light',
            dark: '.dark'
          }
        }
      })
    )
    expect(css).toMatchSnapshot()
  })
})
