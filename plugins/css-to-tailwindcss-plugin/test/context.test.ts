import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { rule, decl } from 'postcss'
import { fixturesResolve, defaultTailwindConfig } from './utils'
import { createContext, IContext } from '@/core'
import { BaseContext } from '@/core/base-context'
describe('context', () => {
  let ctx: IContext
  let baseCtx: BaseContext
  beforeEach(() => {
    baseCtx = new BaseContext()
    ctx = createContext()
  })
  it('getPlugins length', async () => {
    let plugins = await ctx.getPlugins()
    expect(plugins.length).toBe(3)
    plugins = await ctx.getPlugins()
    expect(plugins.length).toBe(3)

    plugins = ctx.getPluginsSync()
    expect(plugins.length).toBe(3)
  })

  it('getNodes', () => {
    expect(baseCtx.getNodes('base').length).toBe(0)
    expect(baseCtx.getNodes('components').length).toBe(0)
    expect(baseCtx.getNodes('utilities').length).toBe(0)
    baseCtx.append(
      'base',
      rule({
        selector: '.a',
        nodes: [
          decl({
            prop: 'color',
            value: 'red'
          })
        ]
      })
    )
    expect(baseCtx.getNodes('base').length).toBe(1)
    // @ts-ignore
    expect(baseCtx.getNodes('xxx').length).toBe(0)

    baseCtx.append(
      // @ts-ignore
      'xxx',
      [
        rule({
          selector: '.a',
          nodes: [
            decl({
              prop: 'color',
              value: 'red'
            })
          ]
        }),
        rule({
          selector: '.b',
          nodes: [
            decl({
              prop: 'color',
              value: 'red'
            })
          ]
        })
      ]
    )
    // @ts-ignore
    expect(baseCtx.getNodes('xxx').length).toBe(2)
  })

  it('process common.css', async () => {
    await ctx.process(fixturesResolve('common.css'))
    expect(ctx.ctx.getNodes('base').length).toBe(2)
    expect(ctx.ctx.getNodes('components').length).toBe(1)
    expect(ctx.ctx.getNodes('utilities').length).toBe(1)
  })

  it('process common.css sync', () => {
    const res = ctx.processSync(fixturesResolve('common.css'))
    // expect(res.css).toBeDefined()
    expect(ctx.ctx.getNodes('base').length).toBe(2)
    expect(ctx.ctx.getNodes('components').length).toBe(1)
    expect(ctx.ctx.getNodes('utilities').length).toBe(1)
  })

  it('process common.scss', async () => {
    await ctx.process(fixturesResolve('common.scss'))
    expect(ctx.ctx.getNodes('base').length).toBe(2)
    expect(ctx.ctx.getNodes('components').length).toBe(1)
    expect(ctx.ctx.getNodes('utilities').length).toBe(1)
  })

  it('process common.scss sync', () => {
    const res = ctx.processSync(fixturesResolve('common.scss'))
    // expect(res.css).toBeDefined()
    expect(ctx.ctx.getNodes('base').length).toBe(2)
    expect(ctx.ctx.getNodes('components').length).toBe(1)
    expect(ctx.ctx.getNodes('utilities').length).toBe(1)
  })

  it('process common-import.scss', async () => {
    await ctx.process(fixturesResolve('common-import.scss'))
    expect(ctx.ctx.getNodes('base').length).toBe(2)
    expect(ctx.ctx.getNodes('components').length).toBe(1)
    expect(ctx.ctx.getNodes('utilities').length).toBe(1)
  })
})
