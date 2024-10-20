import { createContext } from '@/context'
import { omitRoot } from './utils'

describe('build', () => {
  it('build all', async () => {
    const ctx = createContext({
      dryRun: true,
    })
    await ctx.build()
    expect(omitRoot(ctx.base)).toMatchSnapshot()
  })

  it('build base with custom types', async () => {
    const ctx = createContext({
      dryRun: true,
      base: {
        themes: {
          light: {
            types: {
              primary: '#13c2c2',
            },
          },
          dark: {
            types: {
              primary: '#13a8a8',
            },
          },
        },
      },
    })
    await ctx.buildBase()
    expect(omitRoot(ctx.base)).toMatchSnapshot()
  })

  it('build base change default selector case ', async () => {
    const ctx = createContext({
      dryRun: true,
      base: {
        themes: {
          light: {
            selector: 'page',
          },
          dark: {
            selector: '.dark',
          },
        },
      },
    })
    await ctx.buildBase()
    expect(omitRoot(ctx.base)).toMatchSnapshot()
  })

  it('build nothing', async () => {
    const ctx = createContext({
      dryRun: true,
      base: {
        themes: {
          light: {
            selector: 'page',
          },
          dark: {
            selector: '.dark',
          },
        },
      },
    })
    await ctx.build({ base: false, components: false, config: false, utilities: false })
    expect(omitRoot(ctx.base)).toMatchSnapshot()
  })
})
