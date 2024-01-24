import path from 'node:path'
import ci from 'ci-info'
import { createContext } from '@/index'
describe.skipIf(ci.isCI)('build', () => {
  it('build all', async () => {
    const ctx = createContext({
      dryRun: true
    })
    const res = await ctx.build()
    expect(res).toMatchSnapshot()
    expect(ctx.cva).toMatchSnapshot()
    // console.log(ctx.base)
  })

  it('build base', async () => {
    const ctx = createContext({
      dryRun: true
    })
    const base = await ctx.buildBase()
    expect(base).toMatchSnapshot()
  })

  it('build base with custom types', async () => {
    const ctx = createContext({
      dryRun: true,
      base: {
        themes: {
          light: {
            types: {
              primary: '#13c2c2'
            }
          },
          dark: {
            types: {
              primary: '#13a8a8'
            }
          }
        }
      }
    })
    const base = await ctx.buildBase()
    expect(base).toMatchSnapshot()
  })

  it('build base change default selector case ', async () => {
    const ctx = createContext({
      dryRun: true,
      base: {
        themes: {
          light: {
            selector: 'page'
          },
          dark: {
            selector: '.dark'
          }
        }
      }
    })
    await ctx.buildBase()
    expect(ctx.base.index.resolvedCss).toMatchSnapshot('index')
    expect(ctx.base.legacy.resolvedCss).toMatchSnapshot('legacy')
  })

  it('build nothing', async () => {
    const ctx = createContext({
      dryRun: true,
      base: {
        themes: {
          light: {
            selector: 'page'
          },
          dark: {
            selector: '.dark'
          }
        }
      }
    })
    const base = await ctx.build({ base: false, components: false, config: false, utilities: false })
    expect(base).toMatchSnapshot()
  })

  it('hash map init buildBase', async () => {
    let ctx = createContext(path.resolve(__dirname, './configs/icestack.config.cjs'))

    await ctx.buildBase()
    expect(ctx.hashLru.dump()).toMatchSnapshot()
    await ctx.buildBase()
    expect(ctx.hashLru.dump()).toMatchSnapshot()
    ctx = createContext(path.resolve(__dirname, './configs/icestack.config.cjs'))
    expect(ctx.hashLru.dump()).toMatchSnapshot()
    await ctx.buildBase()
  })

  it('hash map init buildUtilities', async () => {
    const ctx = createContext(path.resolve(__dirname, './configs/a.config.cjs'))

    // expect(ctx.lru.dump()).toMatchSnapshot()
    await ctx.buildUtilities()
    // expect(ctx.hashMap).toMatchSnapshot()
    await ctx.buildUtilities()
    expect(ctx.hashLru.dump()).toMatchSnapshot()
  })

  it('hash map init buildComponents', async () => {
    let ctx = createContext(path.resolve(__dirname, './configs/buildComponents.cjs'))
    const x = ctx.configHash
    // expect(ctx.lru.dump()).toMatchSnapshot()
    await ctx.buildComponents()
    // expect(ctx.hashMap).toMatchSnapshot()
    await ctx.buildComponents()
    ctx = createContext(path.resolve(__dirname, './configs/buildComponents0.cjs'))
    expect(x).toBe(ctx.configHash)
    await ctx.buildComponents()
    expect(ctx.hashLru.dump()).toMatchSnapshot()
  })

  it('hash map init buildComponents 2', async () => {
    let ctx = createContext(path.resolve(__dirname, './configs/buildComponents.cjs'))
    const x = ctx.configHash
    // expect(ctx.lru.dump()).toMatchSnapshot()
    await ctx.buildComponents()
    // expect(ctx.hashMap).toMatchSnapshot()
    await ctx.buildComponents()
    ctx = createContext(path.resolve(__dirname, './configs/buildComponents.cjs'))
    expect(x).toBe(ctx.configHash)
    await ctx.buildComponents()
    expect(ctx.hashLru.dump()).toMatchSnapshot()
  })

  it('hash map init buildComponents diff', async () => {
    let ctx = createContext(path.resolve(__dirname, './configs/buildComponents.cjs'))
    const x = ctx.configHash
    // expect(ctx.lru.dump()).toMatchSnapshot()
    await ctx.buildComponents()
    ctx = createContext(path.resolve(__dirname, './configs/buildComponents1.cjs'))

    await ctx.buildComponents()
    expect(x).not.toBe(ctx.configHash)
    expect(ctx.hashLru.dump()).toMatchSnapshot()
  })
})
