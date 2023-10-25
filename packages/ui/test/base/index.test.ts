import path from 'node:path'
import { compileScss } from '@/sass'
import { scssDir } from '@/dirs'
import { getBuildOptions } from '@/options'

export function resolve(filename: string) {
  return path.resolve(scssDir, 'base', filename + '.scss')
}

describe('base', () => {
  it('snap', async () => {
    const css = await compileScss(resolve('index'), {
      outSideLayerCss: 'base',
      filename: 'xx',
      options: getBuildOptions()
    })
    expect(css).toMatchSnapshot()
  })

  it('snap case 1', async () => {
    const css = await compileScss(resolve('index'), {
      outSideLayerCss: 'base',
      filename: 'xx',
      options: getBuildOptions({
        base: {
          selector: {
            light: '.light',
            dark: '.dark'
          }
        }
      })
    })
    expect(css).toMatchSnapshot()
  })
})
