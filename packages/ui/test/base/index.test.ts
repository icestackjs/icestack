import { transformCss2Js } from '@icestack/shared'
import { createContext, IContext } from '@/context'
import { getCodegenOptions } from '@/options'
import { sharedExtraColors } from '@/defaults'
import { calcBase } from '@/base'

describe('base', () => {
  let ctx: IContext
  beforeEach(() => {
    ctx = createContext(getCodegenOptions())
  })
  it('snap', () => {
    const { css } = ctx.compileScss('base.index')
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
  })

  it('snap case 1', async () => {
    const opts = getCodegenOptions({
      base: {
        themes: {
          light: {
            selector: '.light'
          },
          dark: {
            selector: '.dark'
          }
        }
      }
    })
    const ctx = createContext(opts)

    const { css } = await ctx.compileScss('base.index')
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
    expect(calcBase(opts)).toMatchSnapshot('calcBase')
  })

  it('add new theme case 0', async () => {
    const opts = getCodegenOptions({
      base: {
        themes: {
          light: {
            selector: '.light'
          },
          dark: {
            selector: '.dark'
          },
          fuck: {
            selector: '.fuck',
            extraVars: {
              a: '#123456'
            }
          },
          shit: {
            selector: '.shit',
            extraVars: {
              b: '#654321'
            }
          }
        }
      }
    })
    const ctx = createContext(opts)
    const { css } = await ctx.compileScss('base.index')
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
    expect(calcBase(opts)).toMatchSnapshot('calcBase')
  })

  it('add new theme case 1', async () => {
    const opts = getCodegenOptions({
      base: {
        themes: {
          light: {
            selector: '.light'
          },
          dark: {
            selector: '.dark'
          },
          fuck: {
            selector: '.fuck',
            extraVars: {
              a: '#123456'
            },
            extraCss: [
              {
                // @ts-ignore
                'backgroud-color': 'red'
              }
            ]
          },
          shit: {
            selector: '.shit',
            extraVars: {
              b: '#654321'
            },
            // @ts-ignore
            extraCss: {
              'backgroud-color': 'yellow'
            }
          }
        }
      }
    })
    const ctx = createContext(opts)
    const { css } = await ctx.compileScss('base.index')
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
    expect(calcBase(opts)).toMatchSnapshot('calcBase')
  })

  it('add extra css options', async () => {
    const opts = getCodegenOptions({
      mode: 'raw',
      base: {
        extraCss: transformCss2Js(`:root,
          [data-theme] {
            background-color: theme(colors.base-100);
            color: theme(colors.base-content);
          }
          
          @supports not (color: oklch(0 0 0)) {
            :root {
              color-scheme: light;
              --fallback-p: #491eff;
              --fallback-pc: #d4dbff;
              --fallback-s: #ff41c7;
              --fallback-sc: #fff9fc;
              --fallback-a: #00cfbd;
              --fallback-ac: #00100d;
              --fallback-n: #2b3440;
              --fallback-nc: #d7dde4;
              --fallback-b1: #ffffff;
              --fallback-b2: #e5e6e6;
              --fallback-b3: #e5e6e6;
              --fallback-bc: #1f2937;
              --fallback-in: #00b3f0;
              --fallback-inc: #000000;
              --fallback-su: #00ca92;
              --fallback-suc: #000000;
              --fallback-wa: #ffc22d;
              --fallback-wac: #000000;
              --fallback-er: #ff6f70;
              --fallback-erc: #000000;
            }
            @media (prefers-color-scheme: dark) {
              :root {
                color-scheme: dark;
                --fallback-p: #7582ff;
                --fallback-pc: #050617;
                --fallback-s: #ff71cf;
                --fallback-sc: #190211;
                --fallback-a: #00c7b5;
                --fallback-ac: #000e0c;
                --fallback-n: #2a323c;
                --fallback-nc: #a6adbb;
                --fallback-b1: #1d232a;
                --fallback-b2: #191e24;
                --fallback-b3: #15191e;
                --fallback-bc: #a6adbb;
                --fallback-in: #00b3f0;
                --fallback-inc: #000000;
                --fallback-su: #00ca92;
                --fallback-suc: #000000;
                --fallback-wa: #ffc22d;
                --fallback-wac: #000000;
                --fallback-er: #ff6f70;
                --fallback-erc: #000000;
              }
            }
          }
          `)
      }
    })
    const ctx = createContext(opts)
    const { css } = await ctx.compileScss('base.index')
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
    expect(calcBase(opts)).toMatchSnapshot('calcBase')
  })

  it('add extra css options case 0', async () => {
    const opts = getCodegenOptions({
      base: {
        extraCss: [
          transformCss2Js(`:root,
        [data-theme] {
          background-color: theme(colors.base-100);
          color: theme(colors.base-content);
        }
        
        @supports not (color: oklch(0 0 0)) {
          :root {
            color-scheme: light;
            --fallback-p: #491eff;
            --fallback-pc: #d4dbff;
            --fallback-s: #ff41c7;
            --fallback-sc: #fff9fc;
            --fallback-a: #00cfbd;
            --fallback-ac: #00100d;
            --fallback-n: #2b3440;
            --fallback-nc: #d7dde4;
            --fallback-b1: #ffffff;
            --fallback-b2: #e5e6e6;
            --fallback-b3: #e5e6e6;
            --fallback-bc: #1f2937;
            --fallback-in: #00b3f0;
            --fallback-inc: #000000;
            --fallback-su: #00ca92;
            --fallback-suc: #000000;
            --fallback-wa: #ffc22d;
            --fallback-wac: #000000;
            --fallback-er: #ff6f70;
            --fallback-erc: #000000;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              color-scheme: dark;
              --fallback-p: #7582ff;
              --fallback-pc: #050617;
              --fallback-s: #ff71cf;
              --fallback-sc: #190211;
              --fallback-a: #00c7b5;
              --fallback-ac: #000e0c;
              --fallback-n: #2a323c;
              --fallback-nc: #a6adbb;
              --fallback-b1: #1d232a;
              --fallback-b2: #191e24;
              --fallback-b3: #15191e;
              --fallback-bc: #a6adbb;
              --fallback-in: #00b3f0;
              --fallback-inc: #000000;
              --fallback-su: #00ca92;
              --fallback-suc: #000000;
              --fallback-wa: #ffc22d;
              --fallback-wac: #000000;
              --fallback-er: #ff6f70;
              --fallback-erc: #000000;
            }
          }
        }
        `)
        ]
      }
    })
    const ctx = createContext(opts)
    const { css } = await ctx.compileScss('base.index')
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
    expect(calcBase(opts)).toMatchSnapshot('calcBase')
  })

  it('add custom theme case 0', async () => {
    const opts = getCodegenOptions({
      base: {
        themes: {
          cupcake: {
            selector: '.cupcake',
            types: {
              primary: '#65c3c8',
              secondary: '#ef9fbc',
              accent: '#eeaf3a',
              neutral: '#291334'
              // success: '#addfad'
            },
            extraColors: {
              ...sharedExtraColors.light,
              'base-100': '#faf7f5',
              'base-200': '#efeae6',
              'base-300': '#e7e2df',
              'base-content': '#291334'
            }
          }
        }
      }
    })
    const ctx = createContext(opts)
    const { css } = await ctx.compileScss('base.index')
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
    expect(calcBase(opts)).toMatchSnapshot('calcBase')
  })

  it('add custom theme case without selecor 0', async () => {
    const opts = getCodegenOptions({
      base: {
        themes: {
          cupcake: {
            types: {
              primary: '#65c3c8',
              secondary: '#ef9fbc',
              accent: '#eeaf3a',
              neutral: '#291334'
              // success: '#addfad'
            },
            extraColors: {
              ...sharedExtraColors.light,
              'base-100': '#faf7f5',
              'base-200': '#efeae6',
              'base-300': '#e7e2df',
              'base-content': '#291334'
            }
          }
        }
      }
    })
    const ctx = createContext(opts)
    const { css } = await ctx.compileScss('base.index')
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
    expect(calcBase(opts)).toMatchSnapshot('calcBase')
  })
})
