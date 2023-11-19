// import { without } from 'lodash'

import path from 'node:path'
import fs from 'node:fs'
import { createContext } from '@/context'
import { getCodegenOptions } from '@/options'
import { componentsNames } from '@/components'
import { stages } from '@/constants'
import { transformCss2Js } from '@/index'

// const baseDir = path.resolve(scssDir, 'components')

// const coms = (await fg(path.resolve(baseDir, '**/*.scss'))).map((x) => {
//   return {
//     name: path.relative(baseDir, x),
//     filename: x
//   }
// })
describe.each(componentsNames.map((x) => ({ name: x })))('$name', ({ name: componentName }) => {
  const ctx = createContext(getCodegenOptions())
  for (const stage of stages) {
    it(stage, () => {
      const { css } = ctx.compileScss(`components.${componentName}.defaults.${stage}`)
      expect(css).toMatchSnapshot()
    })
  }
})

describe('custom components', () => {
  const ctx = createContext(
    getCodegenOptions({
      components: {
        custom: {
          extra: {
            '.custom': {
              css: {
                color: 'red'
              },
              apply: ['bg-blue-500']
            }
          },
          selector: '.custom'
        }
      }
    })
  )
  for (const stage of stages) {
    it('custom component ' + stage, () => {
      const { css } = ctx.compileScss(`components.${'custom'}.defaults.${stage}`)
      expect(css).toMatchSnapshot()
    })
  }
})

describe('bug fixed', () => {
  it('button prefix base', () => {
    const ctx = createContext(
      getCodegenOptions({
        prefix: 'ice-'
      })
    )
    const { css } = ctx.compileScss(`components.button.defaults.base`)
    expect(css).toMatchSnapshot()
  })

  it('button prefix styled', () => {
    const ctx = createContext(
      getCodegenOptions({
        prefix: 'ice-'
      })
    )
    const { css } = ctx.compileScss(`components.button.defaults.styled`)
    expect(css).toMatchSnapshot()
  })

  it('button prefix utils', () => {
    const ctx = createContext(
      getCodegenOptions({
        prefix: 'ice-'
      })
    )
    const { css } = ctx.compileScss(`components.button.defaults.utils`)
    expect(css).toMatchSnapshot()
  })

  it('custom component case 0', async () => {
    const outdir = path.resolve(__dirname, './outdir')
    const options = getCodegenOptions({
      prefix: 'ice-',
      components: {
        ...componentsNames.reduce<Record<string, boolean>>((acc, cur) => {
          acc[cur] = false
          return acc
        }, {}),
        subtitle: {
          extra: transformCss2Js(`.subtitle {
            @apply text-gray-600 text-sm pt-5 pb-4;
          }`)
        }
      },
      outdir
    })
    const ctx = createContext(options)
    expect(ctx.presets.subtitle).toBeTruthy()
    // @ts-ignore
    expect('undefined' in ctx.presets.subtitle.defaults.base).toBeFalsy()
    const { css } = ctx.compileScss(`components.subtitle.defaults.utils`)
    expect(css).toMatchSnapshot()
    await ctx.buildComponents()
    expect(fs.existsSync(path.resolve(outdir, 'js/components/subtitle/utils.js'))).toBe(true)
  })
})

describe('form bug', () => {
  it('form prefix base', () => {
    const ctx = createContext(
      getCodegenOptions({
        prefix: 'ice-'
      })
    )
    const { css } = ctx.compileScss(`components.form.defaults.base`)
    expect(css).toMatchSnapshot()
  })

  it('form prefix styled', () => {
    const ctx = createContext(
      getCodegenOptions({
        prefix: 'ice-'
      })
    )
    const { css } = ctx.compileScss(`components.form.defaults.styled`)
    expect(css).toMatchSnapshot()
  })

  it('form prefix utils', () => {
    const ctx = createContext(
      getCodegenOptions({
        prefix: 'ice-'
      })
    )
    const { css } = ctx.compileScss(`components.form.defaults.utils`)
    expect(css).toMatchSnapshot()
  })
})
