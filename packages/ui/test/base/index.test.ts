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
          themes: {
            light: {
              selector: '.light'
            },
            dark: {
              selector: '.dark'
            }
          }
        }
      })
    )
    expect(css).toMatchSnapshot()
  })

  it('add new theme case 0', async () => {
    const { css } = await compileScss(
      resolve('index'),
      getCodegenOptions({
        base: {
          themes: {
            light: {
              selector: '.light'
            },
            dark: {
              selector: '.dark'
            },
            fuck: {
              selector: '.fuck'
            },
            shit: {
              selector: '.shit'
            }
          },
          extraVars: {
            fuck: {
              a: '#123456'
            },
            shit: {
              b: '#654321'
            }
          }
        }
      })
    )
    expect(css).toMatchSnapshot()
  })
})
