// @ts-nocheck
import { getCodegenOptions } from '@icestack/config'
import { schemaMap as componentsMap } from '@/components'
import { createContext } from '@/index'
import { preprocessCssInJs } from '@/postcss'

describe.skip.each(
  Object.entries(componentsMap).map((x) => {
    return {
      name: x[0],
      value: x[1]
    }
  })
)('$name options', ({ name, value }) => {
  it('snap', () => {
    const opts = getCodegenOptions()
    const xx = value?.schema({
      // options: opts,
      types: [],
      // @ts-ignore
      selector: opts.components[name]?.selector
    })
    expect({
      selector: xx.selector,
      defaults: preprocessCssInJs(xx.defaults)
    }).toMatchSnapshot()
  })

  it('raw snap', () => {
    const opts = getCodegenOptions()
    expect(
      value?.schema({
        // options: opts,
        types: [],
        // @ts-ignore
        selector: opts.components[name]?.selector
      })
    ).toMatchSnapshot()
  })
})

describe.skip('no schema', () => {
  it('should button have schema', async () => {
    const config = {
      mode: 'none',
      outdir: './my-ui',
      components: {
        button: {
          selector: '.btn',
          schema: ({ selector }) => {
            return {
              selector,
              defaults: {
                base: `
                ${selector} {
                  @apply relative overflow-hidden bg-blue-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center;
                
                  &::after {
                    content: '';
                    @apply absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 z-20 duration-1000;
                  }
                
                  &:hover::after {
                    @apply translate-x-[50%];
                  }
                }
                `
              }
            }
          }
        }
      }
    }
    // @ts-ignore
    const ctx = createContext(config)
    const res = await ctx.buildComponents()
    expect(res.button).toMatchSnapshot()
  })

  it('should button have schema case 0', async () => {
    const config = {
      mode: 'none',
      outdir: './my-ui',
      components: {
        button: {
          selector: '.btn',
          schema: ({ selector }) => {
            return {
              selector,
              defaults: {
                base: [
                  `
                ${selector} {
                  @apply relative overflow-hidden bg-blue-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center;
                
                  &::after {
                    content: '';
                    @apply absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 z-20 duration-1000;
                  }
                
                  &:hover::after {
                    @apply translate-x-[50%];
                  }
                }
                `
                ]
              }
            }
          }
        }
      }
    }
    // @ts-ignore
    const ctx = createContext(config)
    const res = await ctx.buildComponents()
    expect(res.button).toMatchSnapshot()
  })
})
