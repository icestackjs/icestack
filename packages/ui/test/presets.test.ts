import { getCodegenOptions } from '@/options'
import { miniprogramPreset } from '@/presets'
import { createContext } from '@/context'
import { defuCodegenOptions } from '@/utils'
describe('presets', () => {
  it('miniprogramPreset', () => {
    const opt = getCodegenOptions({
      presets: [miniprogramPreset()]
    })
    expect(opt).toMatchSnapshot()
  })

  it('miniprogramPreset buildComponents', async () => {
    const ctx = createContext({
      dryRun: true,
      presets: [miniprogramPreset()]
    })
    const res = await ctx.buildComponents()
    expect(res).toMatchSnapshot()
  })

  it('miniprogramPreset checkbox css', async () => {
    const ctx = createContext({
      dryRun: true,
      presets: [miniprogramPreset()]
    })
    const res = await ctx.buildComponents()
    expect(res.checkbox).toMatchSnapshot()
  })

  it('disabled checkbox css', async () => {
    const ctx = createContext({
      dryRun: true,
      components: {
        checkbox: {
          disabled: true
        }
      }
    })
    const res = await ctx.buildComponents()
    expect(res.checkbox).toBeUndefined()
  })

  it('miniprogramPreset checkbox css with prefix', async () => {
    const ctx = createContext({
      dryRun: true,
      presets: [miniprogramPreset()],
      components: {
        checkbox: {
          prefix: {
            prefix: 'som-'
          }
        }
      }
    })
    const res = await ctx.buildComponents()
    expect(res.checkbox).toMatchSnapshot()
  })

  it('miniprogramPreset radio css with prefix', async () => {
    const ctx = createContext({
      dryRun: true,
      presets: [miniprogramPreset()],
      components: {
        checkbox: {
          prefix: {
            prefix: 'som-'
          }
        }
      }
    })
    const res = await ctx.buildComponents()
    expect(res.radio).toMatchSnapshot()
  })

  it('presets merge case 0', () => {
    const opt = getCodegenOptions({
      presets: [miniprogramPreset()]
    })
    expect(opt).toMatchSnapshot()
  })

  it('presets merge case 1', () => {
    const opt = getCodegenOptions({
      presets: [miniprogramPreset()],
      components: {
        checkbox: {
          prefix: {
            prefix: 'som-'
          }
        }
      }
    })
    expect(opt).toMatchSnapshot()
  })

  it('defuCodegenOptions case 0', () => {
    const opt = defuCodegenOptions(
      {
        prefix: 'ice-'
      },
      {
        prefix: {
          prefix: 'som-',
          ignore: ['.wx']
        }
      }
    )
    expect(opt).toMatchSnapshot()
  })

  it('defuCodegenOptions case 1', () => {
    const opt = defuCodegenOptions(
      {
        prefix: {
          prefix: 'ice-',
          ignore: ['.aa']
        }
      },
      {
        prefix: {
          prefix: 'som-',
          ignore: ['.wx']
        }
      }
    )
    expect(opt).toMatchSnapshot()
  })

  it('defuCodegenOptions case 2', () => {
    const opt = defuCodegenOptions(
      {
        prefix: {
          prefix: 'ice-',
          ignore: ['.aa']
        }
      },
      {
        prefix: 'som-'
      }
    )
    expect(opt).toMatchSnapshot()
  })
})
