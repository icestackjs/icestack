import postcss from 'postcss'
import * as t from '@babel/types'
import { fixturesResolve, defaultTailwindConfig, getTwCtx } from './utils'
import { createContext } from '@/core'
import { unwrapThemeFunctionArg, makeObjectExpression, babelGenerate } from '@/core/generator'
describe('generator', () => {
  let ctx: ReturnType<typeof createContext>
  let twCtx: ReturnType<typeof createContext>
  beforeEach(() => {
    ctx = createContext({
      withOptions: false
    })
    twCtx = createContext({
      tailwindcssResolved: true,
      tailwindcssConfig: defaultTailwindConfig,
      withOptions: false
    })
  })

  it('unwrapThemeFunctionArg', () => {
    expect(unwrapThemeFunctionArg('spacing.12')).toBe('spacing.12')
    expect(unwrapThemeFunctionArg('spacing[2.5]')).toBe('spacing[2.5]')
    expect(unwrapThemeFunctionArg('colors.blue.500')).toBe('colors.blue.500')
    expect(unwrapThemeFunctionArg('colors.blue.500 / 75%')).toBe('colors.blue.500 / 75%')
    expect(unwrapThemeFunctionArg("'colors.white'")).toBe('colors.white')
  })

  it('generate', () => {
    expect(ctx.generate()).toMatchSnapshot()
  })

  it('generate common.scss', async () => {
    const ctx = createContext()
    await ctx.process(fixturesResolve('common.scss'))
    expect(ctx.generate()).toMatchSnapshot()
  })

  it('generate case 0', async () => {
    await ctx.process(fixturesResolve('common.scss'))
    expect(ctx.generate()).toMatchSnapshot()
  })

  it('generate case 0 sync', () => {
    ctx.processSync(fixturesResolve('common.scss'))
    expect(ctx.generate()).toMatchSnapshot()
  })

  it('generate case 0 withOptions', async () => {
    const ctx = createContext({
      withOptions: true
    })
    await ctx.process(fixturesResolve('common.scss'))
    expect(ctx.generate()).toMatchSnapshot()
  })

  it('generate case 1', async () => {
    await ctx.process(fixturesResolve('theme.css'))
    expect(ctx.generate()).toMatchSnapshot()
  })

  it('generate case 2', async () => {
    const ctx = createContext({
      outSideLayerCss: 'base',
      withOptions: false
    })
    await ctx.process(fixturesResolve('common-outside.scss'))
    expect(ctx.generate()).toMatchSnapshot()
  })

  it('theme case 0', async () => {
    await ctx.process(fixturesResolve('theme-compose.css'))
    expect(ctx.generate()).toMatchSnapshot()
  })

  it('theme case 1', async () => {
    await ctx.process(fixturesResolve('theme-mutiple.css'))
    expect(ctx.generate()).toMatchSnapshot()
  })

  it('theme case 2', async () => {
    await ctx.process(fixturesResolve('apply-without.scss'))
    expect(ctx.generate()).toMatchSnapshot()
  })

  it('theme case 3', async () => {
    await ctx.process(fixturesResolve('theme-important.scss'))
    expect(ctx.generate()).toMatchSnapshot()
  })

  it('import case 0', async () => {
    await ctx.process(fixturesResolve('import-case.css'))
    expect(ctx.generate()).toMatchSnapshot()
  })

  it('import case 0 with tailwindcss config', async () => {
    await twCtx.process(fixturesResolve('import-case.css'))
    expect(twCtx.generate()).toMatchSnapshot()
  })

  it('import case 0 with tailwindcss config case', async () => {
    const twCtx0 = getTwCtx()
    const { css } = await twCtx0.process(fixturesResolve('import-case.css'))
    expect(twCtx0.generate()).toMatchSnapshot('generate')
    expect(css).toMatchSnapshot('css')
  })

  it('import case 0 with tailwindcss config case with content', async () => {
    const twCtx0 = getTwCtx({
      content: [
        {
          raw: 'card content-auto'
        }
      ]
    })
    const { css } = await twCtx0.process(fixturesResolve('import-case.css'))
    expect(twCtx0.generate()).toMatchSnapshot('generate')
    expect(css).toMatchSnapshot('css')
  })

  it('apply case 0', async () => {
    const twCtx = getTwCtx()
    const { css } = await twCtx.process(fixturesResolve('apply.css'))
    expect(twCtx.generate()).toMatchSnapshot('generate')
    expect(css).toMatchSnapshot('css')
  })

  it('apply case 1', async () => {
    const twCtx = getTwCtx()
    const { css } = await twCtx.process(fixturesResolve('apply.scss'))
    expect(twCtx.generate()).toMatchSnapshot('generate')
    expect(css).toMatchSnapshot('css')
  })

  it('apply case 2', async () => {
    const twCtx = getTwCtx()
    const { css } = await twCtx.process(fixturesResolve('apply-without.scss'))
    expect(twCtx.generate()).toMatchSnapshot('generate')
    expect(css).toMatchSnapshot('css')
  })

  it('interceptors css', async () => {
    const ctx = createContext({
      withOptions: false,
      interceptors: {
        css: [
          (root, ctx) => {
            ctx.append(
              'base',
              postcss.rule({
                selector: '.test',
                nodes: [
                  postcss.decl({
                    prop: 'font-size',
                    value: '99.6px'
                  })
                ]
              })
            )
          }
        ]
      }
    })
    await ctx.process(fixturesResolve('common.scss'))
    expect(ctx.generate()).toMatchSnapshot()
  })

  it('add another postcss plugin', async () => {
    const ctx = createContext({
      outSideLayerCss: 'components',
      postcssPlugins(plugins) {
        plugins.unshift({
          postcssPlugin: 'test',
          Once(root) {
            root.append(
              postcss.rule({
                selector: '.test',
                nodes: [
                  postcss.decl({
                    prop: 'font-size',
                    value: '99.6px'
                  })
                ]
              })
            )
          }
        })
      }
    })
    await ctx.process(fixturesResolve('common.scss'))
    expect(ctx.generate()).toMatchSnapshot()
  })

  it('repeat css case 0', async () => {
    await ctx.process(fixturesResolve('repeat.css'))
    expect(ctx.generate()).toMatchSnapshot()
  })

  it('repeat css case 1', async () => {
    await ctx.process(fixturesResolve('repeat.scss'))
    expect(ctx.generate()).toMatchSnapshot()
  })

  it('double-bug', async () => {
    await ctx.process(fixturesResolve('double-bug.css'))
    expect(ctx.generate()).toMatchSnapshot()
  })

  it('makeObjectExpression case 0', async () => {
    await ctx.process(fixturesResolve('common.scss'))

    expect(babelGenerate(t.objectExpression(makeObjectExpression(ctx.ctx.getNodes('base')))).code).toMatchSnapshot()
  })
})
