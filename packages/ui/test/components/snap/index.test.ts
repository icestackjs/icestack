import path from 'node:path'
import fs from 'node:fs'
import { createContext } from '@/context'
import { getCodegenOptions } from '@/options'
import { names as componentsNames, removeDefaultComponents, transformCss2Js } from '@/components'
import { stages } from '@/constants'

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
      expect(ctx.preprocessCss(css).css).toMatchSnapshot()
    })
  }
})

describe('custom components', () => {
  const ctx = createContext(
    getCodegenOptions({
      dryRun: true,
      components: {
        custom: {
          extend: {
            utils: {
              '.custom': {
                css: {
                  color: 'red'
                },
                apply: ['bg-blue-500']
              }
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
    const ctx = createContext({
      dryRun: true,
      postcss: {
        prefix: 'ice-'
      }
    })
    const { css } = ctx.compileScss(`components.button.defaults.base`)
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
  })

  it('button prefix styled', () => {
    const ctx = createContext({
      dryRun: true,
      postcss: {
        prefix: 'ice-'
      }
    })
    const { css } = ctx.compileScss(`components.button.defaults.styled`)
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
  })

  it('button prefix utils', () => {
    const ctx = createContext({
      dryRun: true,
      postcss: {
        prefix: 'ice-'
      }
    })
    const { css } = ctx.compileScss(`components.button.defaults.utils`)
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
  })
})

describe('form bug', () => {
  it('form prefix base', () => {
    const ctx = createContext({
      dryRun: true,
      postcss: {
        prefix: 'ice-'
      }
    })
    const { css } = ctx.compileScss(`components.form.defaults.base`)
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
  })

  it('form prefix styled', () => {
    const ctx = createContext({
      dryRun: true,
      postcss: {
        prefix: 'ice-'
      }
    })
    const { css } = ctx.compileScss(`components.form.defaults.styled`)
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
  })

  it('form prefix utils', () => {
    const ctx = createContext({
      dryRun: true,
      postcss: {
        prefix: 'ice-'
      }
    })
    const { css } = ctx.compileScss(`components.form.defaults.utils`)
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
  })
})
