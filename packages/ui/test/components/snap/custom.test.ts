import path from 'node:path'
import fs from 'node:fs'
import { createContext } from '@/context'
import { getCodegenOptions } from '@/options'
import { removeDefaultComponents } from '@/components'
import { transformCss2Js } from '@/postcss'
import { stages } from '@/constants'

describe('cutsom', () => {
  it('custom component case 0', async () => {
    const outdir = path.resolve(__dirname, './outdir')
    const options = getCodegenOptions({
      postcss: {
        prefix: 'ice-'
      },

      components: {
        ...removeDefaultComponents,
        subtitle: {
          extend: `.subtitle {
            @apply text-gray-600 text-sm pt-5 pb-4;
          }`
        }
      },
      outdir
    })
    const ctx = createContext(options)
    expect(ctx.presets.subtitle).toBeTruthy()
    // @ts-ignore
    expect('undefined' in ctx.presets.subtitle.defaults.base).toBeFalsy()
    const { css } = ctx.compileScss(`components.subtitle.defaults.utils`)
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
    await ctx.buildComponents()
    expect(fs.existsSync(path.resolve(outdir, 'js/components/subtitle/utils.cjs'))).toBe(true)
  })

  it('custom component case 1', async () => {
    // const outdir = path.resolve(__dirname, './outdir')
    const options = getCodegenOptions({
      postcss: {
        prefix: 'ice-'
      },
      components: {
        ...removeDefaultComponents,
        subtitle: {
          extend: `.subtitle {
            @apply text-gray-600 text-sm pt-5 pb-4;
          }`
        },
        tips: {
          postcss: {
            prefix: {
              prefix: 'som-'
            }
          },

          extend: `.tips {
            @apply text-gray-500 text-xs pt-3 pb-2;
          }`
        }
      },
      dryRun: true
      // outdir
    })
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('custom component case 2', async () => {
    // const outdir = path.resolve(__dirname, './outdir')
    const options = getCodegenOptions({
      postcss: {
        prefix: 'ice-'
      },

      components: {
        ...removeDefaultComponents,
        checkbox: {
          postcss: {
            prefix: {
              ignore: ['.wx-checkbox-input']
            }
          },

          schema: ({ selector, types }) => {
            return {
              selector,
              defaults: {
                base: `.checkbox .wx-checkbox-input {
                  width: 34rpx;
                  height: 34rpx;
                  border-radius: 50%;
                }
                /*checkbox选中后样式  */
                .checkbox .wx-checkbox-input.wx-checkbox-input-checked {
                  background: #0394f0;
                  border-color: #0394f0;
                }
                /*checkbox选中后图标样式  */
                .checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
                  width: 20rpx;
                  height: 20rpx;
                  line-height: 20rpx;
                  text-align: center;
                  font-size: 22rpx;
                  color: #fff;
                  background: transparent;
                  transform: translate(-50%, -50%) scale(1);
                  -webkit-transform: translate(-50%, -50%) scale(1);
                }
                `
              }
            }
          }
        }
      },
      dryRun: true
      // outdir
    })
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('custom component case 3', async () => {
    // const outdir = path.resolve(__dirname, './outdir')
    const options = getCodegenOptions({
      components: {
        ...removeDefaultComponents,
        xxx: {
          extend: {
            utils: `
            .xxx{
              @apply bg-red-300 text-sm;
              color: red;
            }
            `
          }
        }
      },
      dryRun: true
      // outdir
    })
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('custom component case 4 !important', async () => {
    // const outdir = path.resolve(__dirname, './outdir')
    const options = getCodegenOptions({
      components: {
        ...removeDefaultComponents,
        xxx: {
          extend: {
            utils: `
            .xxx{
              @apply bg-red-300 text-sm;
              @apply leading-4 #{!important};
              color: red;
            }
            `
          }
        }
      },
      dryRun: true
      // outdir
    })
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('custom component case 5 !important', async () => {
    // const outdir = path.resolve(__dirname, './outdir')
    const options = getCodegenOptions({
      components: {
        ...removeDefaultComponents,
        xxx: {
          extend: {
            utils: `
            .xxx{
              @apply bg-red-300 text-sm leading-4 #{!important};
              color: red !important;
            }
            `
          }
        }
      },
      dryRun: true
      // outdir
    })
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('custom component case 6', async () => {
    // const outdir = path.resolve(__dirname, './outdir')
    const options = getCodegenOptions({
      components: {
        ...removeDefaultComponents,
        xxx: {
          override: {
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
      },
      dryRun: true
      // outdir
    })
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('custom component case 7', async () => {
    // const outdir = path.resolve(__dirname, './outdir')
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
})

describe('custom components', () => {
  const ctx = createContext({
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

  for (const stage of stages) {
    it('custom component ' + stage, () => {
      const { css } = ctx.compileScss(`components.${'custom'}.defaults.${stage}`)
      expect(css).toMatchSnapshot()
    })
  }
})
