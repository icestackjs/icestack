import { getCodegenOptions, createContext } from 'dist'
import { removeDefaultComponents } from '@/components'

describe('options merge', () => {
  it('merge case 0', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        xxx: {
          override: () => {
            return {
              base: {
                '.xxx': {
                  apply: 'bg-red-300 text-sm leading-4 !important',
                  css: {
                    color: 'red'
                  }
                }
              }
            }
          }
        }
      },
      dryRun: true
      // outdir
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('merge case 1', async () => {
    const options = {
      components: {
        ...removeDefaultComponents,
        button: {
          extend: ({ selector }) => {
            return {
              utils: {
                [`${selector}::after`]: {
                  css: {
                    border: 'none'
                  }
                },
                [selector]: {
                  css: {
                    'border-style': 'solid'
                  }
                }
              }
            }
          }
        }
      },
      dryRun: true
      // outdir
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })
})
