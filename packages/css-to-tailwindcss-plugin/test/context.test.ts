import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { rule, decl } from 'postcss'
import { fixturesResolve, defaultTailwindConfig } from './utils'
import { createContext, IContext } from '@/core'
describe('context', () => {
  let ctx: IContext
  beforeEach(() => {
    ctx = createContext()
  })
  it('getPlugins length', async () => {
    let plugins = await ctx.getPlugins()
    expect(plugins.length).toBe(2)
    plugins = await ctx.getPlugins()
    expect(plugins.length).toBe(2)
  })

  it('getNodes', () => {
    expect(ctx.getNodes('base').length).toBe(0)
    expect(ctx.getNodes('components').length).toBe(0)
    expect(ctx.getNodes('utilities').length).toBe(0)
    ctx.append(
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
    expect(ctx.getNodes('base').length).toBe(1)
  })

  it('process common.css', async () => {
    await ctx.process(fixturesResolve('common.css'))
    expect(ctx.getNodes('base').length).toBe(2)
    expect(ctx.getNodes('components').length).toBe(1)
    expect(ctx.getNodes('utilities').length).toBe(1)
  })

  it('process common.scss', async () => {
    await ctx.process(fixturesResolve('common.scss'))
    expect(ctx.getNodes('base').length).toBe(2)
    expect(ctx.getNodes('components').length).toBe(1)
    expect(ctx.getNodes('utilities').length).toBe(1)
  })

  it('process common-import.scss', async () => {
    await ctx.process(fixturesResolve('common-import.scss'))
    expect(ctx.getNodes('base').length).toBe(2)
    expect(ctx.getNodes('components').length).toBe(1)
    expect(ctx.getNodes('utilities').length).toBe(1)
  })
})
